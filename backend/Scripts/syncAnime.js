// ✅ syncAnime.js
import fetch from "node-fetch";
import Anime from "../models/animeSchema.js";
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
      console.error(`Fetch attempt ${i + 1} failed:`, err);
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

export const syncAnime = async () => {
  const log = await SyncLog.findOne({ source: "jikan_cache" });
  const hoursSinceLastSync = log ? (Date.now() - log.lastSyncedAt.getTime()) / (1000 * 60 * 60) : Infinity;

  if (hoursSinceLastSync < 12) {
    console.log("⏩ Skipping sync (last updated recently)");
    return;
  }

  console.log("🔄 Syncing Anime Categories...");

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

        const existing = await Anime.findOne({ animeid: animeData.animeid });

        if (existing) {
          const updatedCategories = Array.from(new Set([...(existing.categories || []), category]));
          const updatedGenres = Array.from(new Set([...(existing.genres || []), ...animeData.genres]));

          await Anime.updateOne(
            { animeid: animeData.animeid },
            {
              ...animeData,
              genres: updatedGenres,
              categories: updatedCategories,
            }
          );
        } else {
          await Anime.create({ ...animeData, categories: [category] });
        }
      }
    } catch (error) {
      console.error(`❌ Failed syncing category "${category}":`, error.message);
    }
  }

  await SyncLog.findOneAndUpdate(
    { source: "jikan_cache" },
    { lastSyncedAt: new Date() },
    { upsert: true }
  );

  console.log("✅ Anime sync complete.");
};