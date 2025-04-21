import { S3Client } from "@aws-sdk/client-s3";

const connectS3 = () => {
  try {
    const s3 = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });

    console.log("AWS S3 v3 Client Configured with region:", process.env.AWS_REGION);
    return s3;
  } catch (error) {
    console.error("AWS S3 Configuration Error:", error.message);
    process.exit(1);
  }
};

export default connectS3;
