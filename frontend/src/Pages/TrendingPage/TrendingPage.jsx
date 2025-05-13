import { useState } from 'react';
import AdvancedSearch from "../../components/AdvanceSearch/AdvancedSearch";
import AnimeCard from "../../components/AnimeCard/AnimeCard";
import './TrendingPage.css'; // Create this CSS file

function TrendingPage() {
    const [selectedGenres, setSelectedGenres] = useState([]);

    return (
        <div className="trending-layout">
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

export default TrendingPage;
