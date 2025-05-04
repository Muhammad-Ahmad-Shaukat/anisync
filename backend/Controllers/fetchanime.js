import fetch from 'node-fetch';

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

export const fetchAnime = async (req, res) => {
  const { type = "top", genre, limit = 5 } = req.query;
  const baseUrl = "https://api.jikan.moe/v4/";
  const params = new URLSearchParams();
  let url = "";

  try {
    switch (type) {
      case "top":
        url = `${baseUrl}top/anime`;
        params.append("limit", limit);
        break;

      case "top_airing":
        url = `${baseUrl}anime`;
        params.append("status", "airing");
        params.append("order_by", "score");
        params.append("sort", "desc");
        params.append("limit", limit);
        break;

      case "trending":
        url = `${baseUrl}anime`;
        params.append("order_by", "popularity");
        params.append("sort", "desc");
        params.append("limit", limit);
        break;

      case "genre":
        url = `${baseUrl}anime`;
        if (genre) {
          params.append("genres", genre);
        }
        params.append("limit", limit);
        break;

      default:
        return res.status(400).json({ error: "Invalid type parameter" });
    }

    const fullUrl = `${url}?${params.toString()}`;
    const data = await fetchWithRetry(fullUrl);

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
    console.error("Failed to fetch anime:", error.message);
    res.status(500).json({ error: "Failed to fetch anime" });
  }
};
