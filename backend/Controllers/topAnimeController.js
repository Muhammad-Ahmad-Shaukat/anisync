import fetch from "node-fetch";

// Retry logic function
const fetchWithRetry = async (url, retries = 3, delay = 1000) => {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Network response was not ok");
      return await response.json();
    } catch (err) {
      console.error(`Fetch attempt ${i + 1} failed:`, err);
      if (i === retries - 1) throw new Error("All fetch attempts failed");
      await new Promise((resolve) => setTimeout(resolve, delay)); // wait before retrying
    }
  }
};

export const getTopAnime = async (req, res) => {
  try {
    const url = "https://api.jikan.moe/v4/top/anime?limit=5";
    
    // Using retry logic to fetch top anime
    const data = await fetchWithRetry(url);

    const animeList = data.data.map((anime) => ({
      id: anime.mal_id,
      title: {
        english: anime.title_english,
        romaji: anime.title,
      },
      description: anime.synopsis,
      bannerImage:
        anime.trailer?.images?.maximum_image_url || anime.images?.jpg?.large_image_url,
      coverImage: {
        large: anime.images?.jpg?.large_image_url,
      },
    }));

    res.json(animeList);
  } catch (error) {
    console.error("Failed to fetch top anime:", error);
    res.status(500).json({ error: "Failed to fetch top anime" });
  }
};
