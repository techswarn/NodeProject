const{ PutObjectCommand, S3} = require("@aws-sdk/client-s3");


const s3Client = new S3({
    endpoint: "https://backendapp.fra1.digitaloceanspaces.com/",
    region: "fra1",
    credentials: {
      accessKeyId: process.env.SPACES_KEY,
      secretAccessKey: process.env.SPACES_SECRET
    }
});

// // Specifies a path within your Space and the file to upload.
const bucketParams = {
  Bucket: "backendapp",
  Key: "readini.js",
};

// Uploads the specified file to the chosen path.
const run = async () => {
  try {
    const data = await s3Client.send(new PutObjectCommand(bucketParams));
    console.log(
      "Successfully uploaded object: " +
        bucketParams.Bucket +
        "/" +
        bucketParams.Key
    );
    return data;
  } catch (err) {
    console.log("Error", err);
  }
};

run();