const mongoose = require("mongoose");

//schema
const articleSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.ObjectId,
    },
    article_id: {
        type: String,
    },
    title: {
        type: String,
    },
    link: {
        type: String,
    },
    keywords: {
        type: Array,
    },
    creator: {
        type: Array,
    },
    video_url: {
        type: String,
    },
    description: {
        type: String,
    },
    content: {
        type: String,
    },
    pubDate: {
        type: String,
    },
    image_url: {
        type: String,
    },
    source_id: {
        type: String,
    },
    source_url: {
        type: String,
    },
    source_icon: {
        type: String,
    },
    source_priority: {
        type: String,
    },
    country: {
        type: Array,
    },
    category: {
        type: String,
    },
    language: {
        type: String,
    },
    type: {
        type: String,
    },
    video_paths: {
        type: Array,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Article", articleSchema);