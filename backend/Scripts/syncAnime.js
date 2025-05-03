import fetch from "node-fetch";
import Anime from "../models/animeSchema.js";
import SyncLog from "../models/SyncLog.js";

const CATEGORY_ENDPOINTS = {
  top: "https://api.jikan.moe/v4/top/anime?limit=25",
  trending: "https://api.jikan.moe/v4/anime?order_by=popularity&sort=desc&limit=25",
  new_releases: "https://api.jikan.moe/v4/seasons/now?limit=25",
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
    const res = await fetch(url);
    const json = await res.json();

    for (const item of json.data) {
      const animeData = {
        animeid: item.mal_id,
        anime_name: item.title,
        genres: item.genres.map(g => g.name),
        rating: item.score ?? 0,
        episodes: item.episodes ?? 0,
        popularity: item.popularity ?? 0,
        image: item.images.jpg.image_url,
        description: item.synopsis ?? "",
        trailer: item.trailer?.url || "",
        status: item.status ?? "Unknown",
        season: item.season ?? "Unknown",
        source: item.source ?? "Unknown",
        characters: [],
      };

      const existing = await Anime.findOne({ animeid: item.mal_id });

      if (existing) {
        const updatedCategories = Array.from(new Set([...(existing.categories || []), category]));
        await Anime.updateOne(
          { animeid: item.mal_id },
          { ...animeData, categories: updatedCategories }
        );
      } else {
        await Anime.create({ ...animeData, categories: [category] });
      }
    }
  }

  await SyncLog.findOneAndUpdate(
    { source: "jikan_cache" },
    { lastSyncedAt: new Date() },
    { upsert: true }
  );

  console.log("✅ Anime sync complete.");
};
