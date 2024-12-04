import express from "express";
import mongoose from "mongoose";
import cors from "cors";

// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');

const app = express();
const port = 5000;

// Connect to MongoDB (replace with your MongoDB connection string)
mongoose.connect('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error', err));

// Middleware
app.use(cors());
app.use(express.json());

// Define the Post schema
const postSchema = new mongoose.Schema({
  title: String,
  content: String
});

const Post = mongoose.model('Post', postSchema);

// API endpoints
app.get('/api/posts', async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
});

app.post('/api/posts', async (req, res) => {
  const { title, content } = req.body;
  const newPost = new Post({ title, content });
  await newPost.save();
  res.json(newPost);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});