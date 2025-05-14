import { useState } from 'react';
import AdvancedSearch from "../../components/AdvanceSearch/AdvancedSearch";
import AnimeCard from "../../components/AnimeCard/AnimeCard";
import './TopAiringPage.css'; 

function TopAiringPage() {
    const [selectedGenres, setSelectedGenres] = useState([]);

    return (
        <div className="top-airing-layout">
            <div className="anime-card-section">
                <AnimeCard 
                    type="top" 
                    limit={30}
                    genres={selectedGenres}
                />
            </div>
            <div className="filter-section">
                <AdvancedSearch 
                    selectedGenres={selectedGenres}
                    setSelectedGenres={setSelectedGenres}
                />
            </div>
        </div>
    );
}

export default TopAiringPage;
