const express = require('express');

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json()); // Parses incoming requests with JSON payloads


// Preventing CORS errors
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
// app.use('/api/places', placesRoutes);
// app.use('/api/users', usersRoutes);

app.post('/api/todos', (req, res) => {
  const newTodo = req.body;
  todos.push(newTodo);
  res.json(newTodo);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log('Backend is runningg');
});
