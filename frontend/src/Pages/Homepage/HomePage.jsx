import AnimeCard from "../../components/AnimeCard/AnimeCard";
import AnimeList from "../../components/AnimeList/AnimeList";

function HomePage(){

    

    return<>
    
        <AnimeList/>
        <AnimeCard anime={anime}/>
    
    </>
}

export default HomePage;