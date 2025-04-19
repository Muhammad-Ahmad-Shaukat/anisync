


export const videoStreamer = (req,res){
    const {videoname} = req.body;
    const videoPath = 'https://anisyncweb.s3.eu-north-1.amazonaws.com/' + videoname;
    
}