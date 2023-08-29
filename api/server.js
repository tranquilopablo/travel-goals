const express = require('express');
const placesRoutes = require('./routes/places-routes');
const usersRoutes = require('./routes/users-routes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
// app.use(bodyParser.json());
const PORT = 5000;

// Middleware
app.use(express.json());
// Parses incoming requests with JSON payloads

app.use('/uploads/images', express.static(path.join('uploads', 'images')));

// Preventing CORS errors, possibly change into another middleware -const cors = require('cors'), app.use(cors());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  next();
});

// Routes
app.use('/api/places', placesRoutes);
app.use('/api/users', usersRoutes);

// in case there is no such route as above
app.use((req, res, next) => {
  const error = new Error('Nie można znaleźć tego przekierowania');
  error.code = 404;
  throw error;
});

app.use((error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, (err) => {
      console.log(err);
    });
  }

  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || 'Wystąpił nieznany bląd!' });
});

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@pawel.vs6xb.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log('Backend is runningg');
      console.log('Connected to MongoDB');
    });
  })
  .catch((error) => {
    console.log(error);
  });
