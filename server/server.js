import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import records from "./routes/record.js";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/record", records);

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

app.get('/api/data', async (req, res) => {
  try {
    const data = await articleSchema.find();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
}); 