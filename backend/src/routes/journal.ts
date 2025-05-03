import express from 'express';
import { JournalEntry } from '../models/JournalEntry';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();

// Get all journal entries for a user
router.get('/', authMiddleware, async (req: any, res) => {
  try {
    const entries = await JournalEntry.findByUserId(req.user.userId);
    res.json(entries);
  } catch (error) {
    console.error('Get entries error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a new journal entry
router.post('/', authMiddleware, async (req: any, res) => {
  try {
    const { mood, text } = req.body;
    const entry = await JournalEntry.create({
      user_id: req.user.userId,
      mood,
      text,
    });
    res.status(201).json(entry);
  } catch (error) {
    console.error('Create entry error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a journal entry
router.put('/:id', authMiddleware, async (req: any, res) => {
  try {
    const { mood, text } = req.body;
    const entry = await JournalEntry.update(
      parseInt(req.params.id),
      req.user.userId,
      { mood, text }
    );
    if (!entry) {
      return res.status(404).json({ message: 'Entry not found' });
    }
    res.json(entry);
  } catch (error) {
    console.error('Update entry error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a journal entry
router.delete('/:id', authMiddleware, async (req: any, res) => {
  try {
    const success = await JournalEntry.delete(
      parseInt(req.params.id),
      req.user.userId
    );
    if (!success) {
      return res.status(404).json({ message: 'Entry not found' });
    }
    res.json({ message: 'Entry deleted' });
  } catch (error) {
    console.error('Delete entry error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router; 