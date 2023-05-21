const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');
const auth = require("../middleware/auth");

router.get('/', auth, todoController.getAllTodos);
router.post('/', auth, todoController.createTodo);
router.put('/:id', auth, todoController.updateTodo);
router.delete('/:id', auth, todoController.deleteTodo);
// delete all todos
router.delete('/delete/all', auth, todoController.deleteAllTodos);

module.exports = router;
