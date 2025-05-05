/* eslint-disable no-unused-vars */

import ViewDetails from "../../components/AnimeViewDetails/ViewDetails";

function AnimeDetails(){

    const dummyDetails = {
        title: "Me & Roboco Movie",
        posterUrl: "https://a.storyblok.com/f/178900/707x1000/01e670dace/me-roboco_the_movie_main_key_art.jpg/m/filters:quality(95)format(webp)",
        rating: "PG-13",
        format: "HD",
        type: "Movie",
        duration: "Unknown",
        aired: "Apr 18, 2025",
        premiered: "Spring 2025",
        genres: ["Comedy", "Parody", "Sci-Fi", "Shounen"],
        studios: ["Gallop"],
        producers: ["Shochiku"]
      };
    
      const handleClose = () => {
        console.log("Close button clicked");
      };

    return<>
    
       <ViewDetails details={dummyDetails} onClose={handleClose} />

    </>
}

export default AnimeDetails;