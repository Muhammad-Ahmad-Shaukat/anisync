import fetch from 'node-fetch'
export const fetchAnime = async (req, res) => {
    const { type = "top", genre, limit = 5 } = req.query;
  
    let baseUrl = "https://api.jikan.moe/v4/";
    let url = "";
    const params = new URLSearchParams();
  
    try {
      if (type === "top") {
        url = `${baseUrl}top/anime`;
        params.append("limit", limit);
      } else if (type === "trending") {
        url = `${baseUrl}anime`;
        params.append("order_by", "popularity");
        params.append("sort", "desc");
        params.append("limit", limit);
      } else {
        url = `${baseUrl}anime`;
        if (genre) {
          params.append("genres", genre);
        }
        params.append("limit", limit);
      }
  
      const fullUrl = `${url}?${params.toString()}`;
  
      const response = await fetch(fullUrl);
      const data = await response.json();
  
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
  