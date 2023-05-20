const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const todoRoutes = require('./routes/todoRoutes');

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());


mongoose.connect('mongodb://127.0.0.1:27017/todoapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB', error);
  });

app.use('/api/todos', todoRoutes);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
