const express = require('express');
const session = require('express-session');
const app = express();
const port = process.env.PORT || 8000;
const cors = require('cors');

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(session({
  secret: 'GOGo',
  resave: false,
  saveUninitialized: true
}))

// router
const userRouter = require('./routes/users');
const photoRouter = require('./routes/photos');

app.use('/', photoRouter);
app.use('/user', userRouter);

app.listen(port, () => {
  console.log(`Starry Night 🌃 http://localhost:${port}`);
})