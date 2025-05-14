import { useState } from 'react';
import AdvancedSearch from "../../components/AdvanceSearch/AdvancedSearch";
import AnimeCard from "../../components/AnimeCard/AnimeCard";
import './TrendingPage.css'; 

function TrendingPage() {
    const [selectedGenres, setSelectedGenres] = useState([]);

    return (
        <div className="trending-layout">
            <div className="anime-card-section">
                <AnimeCard 
                    type="trending" 
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

export default TrendingPage;
