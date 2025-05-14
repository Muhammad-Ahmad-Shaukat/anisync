import { useState } from 'react';
import AdvancedSearch from "../../components/AdvanceSearch/AdvancedSearch";
import AnimeCard from "../../components/AnimeCard/AnimeCard";
import './NewlyRelease.css'

function NewlyReleasePage() {
    const [selectedGenres, setSelectedGenres] = useState([]);

   return (
        <div className="new-layout">
            <div className="anime-card-section">
                <AnimeCard 
                    type="new" 
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

export default NewlyReleasePage;
