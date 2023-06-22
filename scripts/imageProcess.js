//https://github.com/image-js/image-js
const { Image } = require("image-js");

async function imgProcess() {
  let image = await Image.load(__dirname + "/profile.jpg");
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
