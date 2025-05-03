import React, { useEffect, useState } from "react";
import AnimeCard from "./AnimeCard";
import AnimeCardSkeleton from "./AnimeCardSkeleton";

const ParentComponent = ({ limit, categoryId }) => {
  const [animeData, setAnimeData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `http://localhost:5000/api/auth/findanime?id=${categoryId}&limit=${limit}`
        );
        const data = await res.json();
        console.log("Fetched Data:", data); // Check the data
        setAnimeData(data.result || []); // Access the 'result' property
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [categoryId, limit]);

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {loading
        ? Array.from({ length: limit }, (_, i) => <AnimeCardSkeleton key={i} />)
        : Array.isArray(animeData) && animeData.length > 0
        ? animeData.map((anime) => <AnimeCard key={anime.animeid} anime={anime} />)
        : <p>No anime data found or failed to load.</p>}
    </div>
  );
};

export default ParentComponent;
