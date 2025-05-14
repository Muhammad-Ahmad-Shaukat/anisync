import fetch from "node-fetch";
import Anime from "../models/animeSchema.js";
import Episode from "../models/Episode.js";
import connectDB from "../config/db.js";
connectDB();

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
  let episodeCount = 0;

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
      episodeCount++;
    }

    hasNextPage = json.pagination?.has_next_page;
    page += 1;
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  console.log(`Synced ${episodeCount} episodes for anime: ${animeDoc.anime_name} (${animeid})`);
};

export const addAnimeById = async (animeid) => {
  if (!animeid) throw new Error("animeid is required");

  let anime = await Anime.findOne({ animeid });

  if (anime) {
    console.log(`ℹAnime already exists in DB: ${anime.anime_name} (${animeid})`);
    const existingEpisodes = await Episode.countDocuments({ animeId: anime._id });
    if (existingEpisodes === 0) {
      console.log(`📥 No episodes found. Syncing episodes for ${anime.anime_name}...`);
      await syncEpisodesForAnimeId(anime, animeid);
    } else {
      console.log(`Episodes already exist for ${anime.anime_name} (${existingEpisodes} episodes)`);
    }
    return "Anime and episodes already exist or synced";
  }

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
  console.log(`🎉 Added new anime to DB: ${anime.anime_name} (${animeid})`);

  await syncEpisodesForAnimeId(anime, animeid);

  return "Anime and episodes added successfully";
};