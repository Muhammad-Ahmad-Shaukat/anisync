import fetch from "node-fetch";
import Anime from "../models/animeSchema.js";
import Episode from "../models/Episode.js";

const fetchWithRetry = async (url, retries = 3, delay = 1000) => {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Network response was not ok");
      return await response.json();
    } catch (err) {
      console.error(`Fetch attempt ${i + 1} failed:`, err.message);
      if (i === retries - 1) throw new Error("All fetch attempts failed");
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
};

const syncEpisodesForAnimeId = async (animeDoc, animeid) => {
  let hasNextPage = true;
  let page = 1;

  while (hasNextPage) {
    const url = `https://api.jikan.moe/v4/anime/${animeid}/episodes?page=${page}`;
    const json = await fetchWithRetry(url);
    const episodes = json.data || [];

    for (const ep of episodes) {
      await Episode.create({
        animeId: animeDoc._id,
        episode_number: ep.mal_id,
        episode_title: ep.title || `Episode ${ep.mal_id}`,
        video_src: "https://anisyncweb.s3.eu-north-1.amazonaws.com/commingsoonvideo.webm",
        episode_pic_src: ep.images?.jpg?.image_url || animeDoc.image,
      });
    }

    hasNextPage = json.pagination?.has_next_page;
    page += 1;
    await new Promise(resolve => setTimeout(resolve, 500)); // Respect rate limits
  }
};

export const addanime = async (req, res) => {
  const { animeid } = req.body;
  if (!animeid) {
    return res.status(400).json({ message: "animeid is required" });
  }

  try {
    let anime = await Anime.findOne({ animeid });

    if (anime) {
      const existingEpisodes = await Episode.countDocuments({ animeId: anime._id });
      if (existingEpisodes > 0) {
        return res.status(200).json({ message: "Anime and episodes already exist" });
      } else {
        await syncEpisodesForAnimeId(anime, animeid);
        return res.status(200).json({ message: "Episodes synced for existing anime" });
      }
    } else {
      const url = `https://api.jikan.moe/v4/anime/${animeid}`;
      const json = await fetchWithRetry(url);
      const item = json.data;

      const animeData = {
        animeid: item.mal_id,
        anime_name: item.title_english || item.title || "Unknown Title",
        genres: item.genres.map(g => g.name),
        rating: item.score ?? 0,
        episodes: item.episodes ?? 0,
        popularity: item.popularity ?? 0,
        image: item.images?.jpg?.large_image_url || "",
        description: item.synopsis ?? "",
        trailer: item.trailer?.images?.maximum_image_url || item.trailer?.url || "",
        status: item.status ?? "Unknown",
        season: item.season ?? "Unknown",
        source: item.source ?? "Unknown",
        characters: [],
        categories: [],
      };

      anime = await Anime.create(animeData);
      await syncEpisodesForAnimeId(anime, animeid);

      return res.status(201).json({ message: "Anime and episodes added successfully" });
    }
  } catch (error) {
    console.error("Error adding anime:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
