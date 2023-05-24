const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  cloudinaryId: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  userName: {
    type: String,
    required: true,
  },
  businessId: {
    type: String,
    required: true,
  },
  business: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
  },
  hairType: {
    type: String,
    required:true, 
  },
  
});

module.exports = mongoose.model("Post", PostSchema);
