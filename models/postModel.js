const { default: mongoose } = require("mongoose");

const postSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'Please provide name of the image']
    },
    photo: {
        id:{
          type: String,
          // required: false
        },
        secure_url:{
          type: String,
          // required: false
        }
    },
})

const Post = mongoose.model('Post', postSchema);

module.exports = Tour;