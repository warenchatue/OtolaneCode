const express = require('express');
const TodoService = require('../services/todoService');

const router = express.Router();

router.get('/todos', async (req, res) => {
  try {
    const todos = await TodoService.getAllTodos();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

router.post('/todos', async (req, res) => {
  const { title, description } = req.body;

  try {
    const savedTodo = await TodoService.createTodo(title, description);
    res.json(savedTodo);
  } catch (error) {
    res.status(400).json({ error: 'Bad request' });
  }
});

router.put('/todos/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;
  const updateFields = {};

  if (title) updateFields.title = title;
  if (description) updateFields.description = description;
  if (completed !== undefined) updateFields.completed = completed;

  try {
    const updatedTodo = await TodoService.updateTodo(id, updateFields);

    if (!updatedTodo) {
      res.status(404).json({ error: 'Todo not found' });
      return;
    }

    res.json(updatedTodo);
  } catch (error) {
    res.status(400).json({ error: 'Bad request' });
  }
});

router.delete('/todos/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTodo = await TodoService.deleteTodo(id);

    if (!deletedTodo) {
      res.status(404).json({ error: 'Todo not found' });
      return;
    }

    res.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Bad request' });
  }
});



module.exports = router;
