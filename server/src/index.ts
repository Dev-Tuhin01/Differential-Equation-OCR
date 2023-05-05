import express from "express"; // const express = require("express");
import multer from "multer"; // const multer = require("multer");
import path from "path"; //const path = require("path");

const app = express();
const port = 8000;

// Set up multer to handle file uploads
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "public/images");
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

// Set up routes
app.get("/", (req, res) => {
  res.send("working");
});

app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  res.send({ filename: req.file.filename });
});

// Start server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
