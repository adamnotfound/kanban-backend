const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Define your API routes here
app.use('/api/tasks', require('./routes/tasks'));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});