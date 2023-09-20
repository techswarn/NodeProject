//https://github.com/image-js/image-js
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const { Image } = require("image-js");
console.log(__dirname);
async function imgProcess() {
  let image = await Image.load(process.env.FILE_PATH);
  let grey;
  try {
    grey = image.resize({ width: 200 });
    console.log("Image resized successfully");
    grey.save("./media/profilenew.jpg");
    return true;
  } catch (err) {
    console.log(`Error while resizing image` + err);
  }
  // resize the image, forcing a width of 200 pixels. The height is computed automatically to preserve the aspect ratio.
}

exports.imgProcess = imgProcess;
