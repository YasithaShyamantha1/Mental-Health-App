import express, { Request, Response } from 'express';
import { Todo } from '../models/Todo';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();

// Get all todos for a user
router.get('/', authMiddleware, async (req: Request, res: Response) => {
  try {
    const todos = await Todo.findByUserId(req.user!.userId);
    res.json(todos);
  } catch (error) {
    console.error('Get todos error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a new todo
router.post('/', authMiddleware, async (req: Request, res: Response) => {
  try {
    const { text } = req.body;
    const todo = await Todo.create({
      user_id: req.user!.userId,
      text,
      completed: false,
    });
    res.status(201).json(todo);
  } catch (error) {
    console.error('Create todo error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a todo
router.put('/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    const { text, completed } = req.body;
    const todo = await Todo.update(
      parseInt(req.params.id),
      req.user!.userId,
      { text, completed }
    );
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.json(todo);
  } catch (error) {
    console.error('Update todo error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a todo
router.delete('/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    const success = await Todo.delete(
      parseInt(req.params.id),
      req.user!.userId
    );
    if (!success) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.json({ message: 'Todo deleted' });
  } catch (error) {
    console.error('Delete todo error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router; 