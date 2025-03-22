import Anime from "../models/animeSchema";

export const findAnime = async (req , res) => {
    try{
        const {name, id} = req.body;
        let existingAnime = null;
        if(!name && !id){
            return res.status(400).json({message: "Name or ID required"});
        }
        if(name)
        {
            existingAnime = await Anime.findOne({name});
        }else if(id)
        {
            existingAnime = await Anime.findOne({id});
        }

        if(existingAnime)
        {
            return res.status(200).json({message: "Anime found" , anime: existingAnime});
        }        
        else
        {
            return res.status(400).json({message: "Anime not found"});
        }
    }catch(error){
        console.error("Anime Error:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};