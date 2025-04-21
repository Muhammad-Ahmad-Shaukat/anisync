import fetch from "node-fetch";

export const getTopAnime = async (req, res) => {
  try {
    const response = await fetch("https://api.jikan.moe/v4/top/anime?limit=5");
    const data = await response.json();

    const animeList = data.data.map((anime) => ({
      id: anime.mal_id,
      title: {
        english: anime.title_english,
        romaji: anime.title,
      },
      description: anime.synopsis,
      bannerImage: anime.trailer?.images?.maximum_image_url || anime.images?.jpg?.large_image_url,
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
