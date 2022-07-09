// https://www.digitalocean.com/community/tutorials/how-to-upload-a-file-to-object-storage-with-node-js

const aws =  require("aws-sdk");
const fs = require('fs');
const multer = require('multer');
const multerS3 = require('multer-s3');

const spacesEndpoint = new aws.Endpoint('fra1.digitaloceanspaces.com')
const s3 = new aws.S3({
  endpoint: spacesEndpoint
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "backendapp",
    acl: 'public-read',
    key: function (request, file, cb) {
      console.log(file);
      cb(null, file.originalname);
    }
  })
}).array('upload', 1);

// const s3Client = new S3({
//     endpoint: "https://backendapp.fra1.digitaloceanspaces.com/",
//     region: "fra1",
//     credentials: {
//       accessKeyId: process.env.SPACES_KEY,
//       secretAccessKey: process.env.SPACES_SECRET
//     }
// });

// console.log(s3Client)

// // // Specifies a path within your Space and the file to upload.
// const bucketParams = {
//   Bucket: "backendapp",
//   Key: "readini.js",
//   Body: "Hello world!",
// };

// // Uploads the specified file to the chosen path.
// const run = async () => {
//   try {
//     const data = await s3Client.send(new PutObjectCommand(bucketParams));
//     console.log(
//       "Successfully uploaded object: " +
//         bucketParams.Bucket +
//         "/" +
//         bucketParams.Key
//     );
//     return data;
//   } catch (err) {
//     console.log("Error", err);
//   }
// };

// run();

