require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

/* ---------------- MongoDB Connection ---------------- */

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

/* ---------------- File Schema ---------------- */

const fileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["file", "folder"],
    required: true,
  },
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "File",
    default: null,
  },
  content: {
    type: String,
    default: "",
  },
});

const File = mongoose.model("File", fileSchema);

/* ---------------- Root API ---------------- */

app.get("/", (req, res) => {
  res.send("File Explorer API is running");
});

/* ---------------- Get Files by Parent ---------------- */

app.get("/api/files", async (req, res) => {
  try {
    let { parentId } = req.query;

    // convert string "null" to actual null
    if (!parentId || parentId === "null") {
      parentId = null;
    }

    const files = await File.find({ parentId });

    res.json(files);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ---------------- Seed Database ---------------- */

app.get("/api/seed", async (req, res) => {
  try {
    await File.deleteMany({});

    const root = await File.create({
      name: "root",
      type: "folder",
      parentId: null,
    });

    const folderA = await File.create({
      name: "FolderA",
      type: "folder",
      parentId: root._id,
    });

    const folderB = await File.create({
      name: "FolderB",
      type: "folder",
      parentId: root._id,
    });

    await File.create({
      name: "File1.txt",
      type: "file",
      parentId: root._id,
      content: "This is the content of File1.txt in root folder."
    });

    await File.create({
      name: "File2.txt",
      type: "file",
      parentId: folderA._id,
      content: "This is the content of File2.txt in FolderA."
    });

    await File.create({
      name: "File3.txt",
      type: "file",
      parentId: folderB._id,
      content: "This is the content of File3.txt in FolderB."
    });

    res.json({ message: "Database seeded successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
/* ---------------- Get File Content ---------------- */

app.get("/api/file/:id", async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file || file.type !== "file") {
      return res.status(404).json({ error: "File not found" });
    }
    res.json({ content: file.content });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ---------------- Start Server ---------------- */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});