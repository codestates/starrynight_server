const express = require('express');
const app = express();
const port = process.env.NODE_PORT || 8000;
const cors = require('cors');

// middleware
app.use(cors());
app.use(express.json());

// router

app.get('/', (req, res) => {
  res.status(200).send('연결이 아주 잘 되었습니다! :)');
});

app.listen(port, () => {
  console.log(`Starry Night 🌃 http://localhost:${port}`);
})