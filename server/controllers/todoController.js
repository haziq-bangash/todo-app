const Todo = require('../models/Todo');

// Get all todos
exports.getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
    // console.log(todos)
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Create a new todo
exports.createTodo = async (req, res) => {
  try {
    const { task } = req.body;
    const todo = new Todo({
      task,
    });
    await todo.save();
    res.status(201).json(todo);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Server error' + error });
  }
};

// Update a todo
exports.updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { task, completed, completed_time } = req.body;
    // console.log(req.body)
    const todo = await Todo.findByIdAndUpdate(
      id,
      { task, completed, completed_time },
      { new: true }
    );
    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete a todo
exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    await Todo.findByIdAndDelete(id);
    res.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete all todos
exports.deleteAllTodos = async (req, res) => {
    try {
        await Todo.deleteMany();
        res.json({ message: 'All todos deleted successfully', status: 200 });
    } catch (error) {
        res.status(500).json({ message: 'Server error', status: 500 });
    }
};

