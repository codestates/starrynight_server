const express = require('express');
const app = express();
const port = process.env.NODE_PORT || 8000;
const cors = require('cors');

// middleware
app.use(cors());
app.use(express.json());

// router
const userRouter = require('./routes/users');
const photoRouter = require('./routes/photos');

app.use('/', photoRouter);
app.use('/user', userRouter);

app.listen(port, () => {
  console.log(`Starry Night 🌃 http://localhost:${port}`);
})