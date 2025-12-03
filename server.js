const express = require('express');
const cors = require('cors');
const data = require('./data/data.js');

const app = express();
app.use(cors());

let currentIndex = 0;

app.get('/item', (req, res) => {
  res.json({
    index: currentIndex,
    item: data[currentIndex],
    total: data.length
  });
});

app.get('/item/next', (req, res) => {
  currentIndex = (currentIndex + 1) % data.length;
  res.json({
    index: currentIndex,
    item: data[currentIndex],
    total: data.length
  });
});

app.get('/item/prev', (req, res) => {
  currentIndex = (currentIndex - 1 + data.length) % data.length;
  res.json({
    index: currentIndex,
    item: data[currentIndex],
    total: data.length
  });
});

app.get('/item/:id', (req, res) => {
  const id = parseInt(req.params.id);
  if (id >= 0 && id < data.length) {
    currentIndex = id;
    res.json({
      index: currentIndex,
      item: data[currentIndex],
      total: data.length
    });
  } else {
    res.status(404).json({ error: "Item not found" });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
