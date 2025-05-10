import { useState } from 'react';
import AdvancedSearch from "../../components/AdvanceSearch/AdvancedSearch";
import AnimeCard from "../../components/AnimeCard/AnimeCard";


function TopAiringPage() {
    const [selectedGenres, setSelectedGenres] = useState([]);

    return (
        <>
            <AdvancedSearch 
                selectedGenres={selectedGenres}
                setSelectedGenres={setSelectedGenres}
            />
            <AnimeCard 
                type="top" 
                limit={30}
                genres={selectedGenres} // Pass selected genres to AnimeCard
            />
        </>
    );
}

export default TopAiringPage;