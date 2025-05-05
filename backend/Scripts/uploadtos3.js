import { PutObjectCommand, ListObjectsV2Command, DeleteObjectsCommand } from "@aws-sdk/client-s3";
import connectS3 from "../config/aws_s3.js";

const s3 = connectS3();

const uploadtoS3 = async (req, res) => {
    const { name } = req.body;
    const file = req.file;

    if (!name || !file || !file.buffer) {
        return res.status(400).json({ error: "Username and valid file are required" });
    }

    try {
        const fileExtension = file.originalname.split('.').pop();
        const key = `UserPics/${name}.${fileExtension}`;
        const listParams = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Prefix: key, 
        };
        const listResult = await s3.send(new ListObjectsV2Command(listParams));

        if (listResult.Contents && listResult.Contents.length > 0) {
             const deleteParams = {
                Bucket: process.env.AWS_BUCKET_NAME,
                Delete: {
                    Objects: listResult.Contents.map(({ Key }) => ({ Key })),
                },
            };
            await s3.send(new DeleteObjectsCommand(deleteParams));
        }
        const uploadParams = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: key, 
            Body: file.buffer,
            ContentType: file.mimetype,
        };

        const fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileKey}`;
    existingUser.profilePic = fileUrl;
    } catch (error) {
        console.error("Error in upload process:", error);
        res.status(500).json({ error: "Failed to update profile picture" });
    }
};

export default uploadtoS3;