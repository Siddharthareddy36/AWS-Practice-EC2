const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let notes = [];

// Home route
app.get("/", (req, res) => {
  res.send("Backend running boss 🚀");
});

// GET notes
app.get("/notes", (req, res) => {
  res.status(200).json(notes);
});

// POST note
app.post("/notes", (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Text is required" });
  }

  const note = {
    id: Date.now(),
    text,
  };

  notes.push(note);

  res.status(201).json(note);
});

// DELETE note
app.delete("/notes/:id", (req, res) => {
  const id = Number(req.params.id);

  const exists = notes.find((n) => n.id === id);

  if (!exists) {
    return res.status(404).json({ error: "Note not found" });
  }

  notes = notes.filter((n) => n.id !== id);

  res.status(200).json({ message: "Deleted successfully" });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});