import { useState } from 'react';
import AdvancedSearch from "../../components/AdvanceSearch/AdvancedSearch";
import AnimeCard from "../../components/AnimeCard/AnimeCard";


function NewlyReleasePage() {
    const [selectedGenres, setSelectedGenres] = useState([]);

    return (
        <>
            <AdvancedSearch 
                selectedGenres={selectedGenres}
                setSelectedGenres={setSelectedGenres}
            />
            <AnimeCard 
                type="new" 
                limit={30}
                genres={selectedGenres} // Pass selected genres to AnimeCard
            />
        </>
    );
}

export default NewlyReleasePage;