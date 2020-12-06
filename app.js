const express = require('express');
const session = require('express-session');
const app = express();
const port = process.env.PORT || 8000;
const cors = require('cors');
const cookieParser = require('cookie-parser');

// middleware
app.use(cors({
  origin: true,
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  credentials: true,
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'Authorization',
	  'Access-Control-Allow-Origin',
    'Access-Control-Request-Headers',
    'Access-Control-Allow-Headers',
    'x-custom-header',
    'Content-Range',
  ],
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// router
const userRouter = require('./routes/users');
const photoRouter = require('./routes/photos');

app.use('/', photoRouter);
app.use('/user', userRouter);

app.listen(port, () => {
  console.log(`Starry Night 🌃 http://localhost:${port}`);
})
