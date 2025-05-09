import AnimeCard from "../../components/AnimeCard/AnimeCard";

function TrendingPage(){

    return <>
    
        <AnimeCard type="trending" limit={30}/>
    
    </>

}

export default TrendingPage;