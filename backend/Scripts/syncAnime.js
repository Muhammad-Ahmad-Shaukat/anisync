import fetch from "node-fetch";
import Anime from "../models/animeSchema.js";
import Episode from "../models/Episode.js";
import SyncLog from "../models/SyncLog.js";

const CATEGORY_ENDPOINTS = {
  top: "https://api.jikan.moe/v4/top/anime?limit=25",
  trending: "https://api.jikan.moe/v4/anime?order_by=popularity&sort=desc&limit=25",
  new: "https://api.jikan.moe/v4/seasons/now?limit=25",
  airing: "https://api.jikan.moe/v4/anime?status=airing&order_by=score&sort=desc&limit=25",
};
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

const normalizeStatus = (status) => {
  if (!status) return "Unknown";
  const s = status.toLowerCase();
  if (s.includes("airing")) return "Currently Airing";
  if (s.includes("finished")) return "Finished Airing";
  if (s.includes("not yet")) return "Upcoming";
  return status;
};

const syncEpisodesForAnime = async (anime) => {
  try {
    const existingCount = await Episode.countDocuments({ animeId: anime._id });
    if (existingCount > 0) {
      console.log(`⏩ Episodes already exist for: ${anime.anime_name}`);
      return;
    }

    console.log(`Syncing episodes for: ${anime.anime_name}`);
    let page = 1;
    let hasNextPage = true;
    let totalEpisodesFetched = 0;

    while (hasNextPage) {
      const url = `https://api.jikan.moe/v4/anime/${anime.animeid}/episodes?page=${page}`;
      const json = await fetchWithRetry(url);
      const episodes = json.data || [];

      if (episodes.length > 0) {
        for (const ep of episodes) {
          await Episode.create({
            animeId: anime._id,
            episode_number: ep.mal_id,
            episode_title: ep.title || `Episode ${ep.mal_id}`,
            video_src: "https://anisyncweb.s3.eu-north-1.amazonaws.com/commingsoonvideo.mp4",
            episode_pic_src: ep.images?.jpg?.image_url || anime.image,
          });
          totalEpisodesFetched++;
        }
      }

      hasNextPage = json.pagination?.has_next_page;
      page += 1;
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    if (totalEpisodesFetched === 0) {
      console.log(`⚠️ No episodes found for: ${anime.anime_name}. Adding dummy episode.`);
      await Episode.create({
        animeId: anime._id,
        episode_number: 0,
        episode_title: "Unknown",
        video_src: "https://anisyncweb.s3.eu-north-1.amazonaws.com/commingsoonvideo.mp4",
        episode_pic_src: anime.image,
      });
    }

    console.log(`✅ Episodes synced for: ${anime.anime_name}`);
  } catch (error) {
    console.error(`❌ Error syncing episodes for ${anime.anime_name}:`, error.message);
  }
};


export const syncAnime = async () => {
  try {
    const log = await SyncLog.findOne({ source: "jikan_cache" });
    const hoursSinceLastSync = log ? (Date.now() - log.lastSyncedAt.getTime()) / (1000 * 60 * 60) : Infinity;

    if (hoursSinceLastSync < 12) {
      console.log("⏸️ Skipping sync (last updated recently)");
      return;
    }

    console.log("🚀 Syncing Anime Categories...");

    for (const [category, url] of Object.entries(CATEGORY_ENDPOINTS)) {
      try {
        const json = await fetchWithRetry(url);
        const data = json.data || [];

        for (const item of data) {
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
            status: normalizeStatus(item.status),
            season: item.season ?? "Unknown",
            source: item.source ?? "Unknown",
            characters: [],
          };

          let anime = await Anime.findOne({ animeid: animeData.animeid });

          if (anime) {
            const updatedCategories = Array.from(new Set([...(anime.categories || []), category]));
            const updatedGenres = Array.from(new Set([...(anime.genres || []), ...animeData.genres]));

            await Anime.updateOne(
              { animeid: animeData.animeid },
              {
                ...animeData,
                genres: updatedGenres,
                categories: updatedCategories,
              }
            );

            anime = await Anime.findOne({ animeid: animeData.animeid });
          } else {
            anime = await Anime.create({ ...animeData, categories: [category] });
          }

          await syncEpisodesForAnime(anime);
        }
      } catch (error) {
        console.error(`⚠️ Failed syncing category "${category}":`, error.message);
      }
    }

    await SyncLog.findOneAndUpdate(
      { source: "jikan_cache" },
      { lastSyncedAt: new Date() },
      { upsert: true }
    );

    console.log("🎉 Anime and Episode sync complete.");
  } catch (error) {
    console.error("❌ Sync failed:", error.message);
  }
};
