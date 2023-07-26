const express = require('express');

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json()); // Parses incoming requests with JSON payloads

// Sample data - Replace this with your actual data storage mechanism (e.g., database)
let todos = [
  { id: 1, text: 'Buy groceries' },
  { id: 2, text: 'Walk the dog' },
];

// Routes
app.get('/api/todos', (req, res) => {
  res.json(todos);
});

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
