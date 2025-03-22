import React, { useState, useEffect } from "react";
import AnimeCard from "./Animecard";

const Anime = () => {
    const [anime, setAnime] = useState(null);
    let n = "onepiece";

    const getAnime = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/auth/findanime", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: n }),
            });

            const data = await response.json();

            if (!response.ok) {
                alert(data.message || "Failed to fetch anime");
                throw new Error(data.message || "Failed to fetch anime");
            }

            setAnime(data.anime);
        } catch (error) {
            console.error("Error fetching anime:", error);
        }
    };

    useEffect(() => {
        getAnime();
    }, []);

    return (
        <div>
            <h1>Anime</h1>
            {anime ? <AnimeCard img={anime.img} name={anime.name} rating={anime.rating} /> : <p>Loading...</p>}
        </div>
    );
};

export default Anime;
