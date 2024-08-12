const express = require('express');
const router = express.Router();
const db = require('../db/connection');

// Get all flashcards
router.get('/', (req, res) => {
  db.query('SELECT * FROM flashcards', (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Database query error' });
    } else {
      res.json(results);
    }
  });
});

// Add a new flashcard
router.post('/', (req, res) => {
  const { question, answer } = req.body;
  db.query('INSERT INTO flashcards (question, answer) VALUES (?, ?)', [question, answer], (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Database insert error' });
    } else {
      res.status(201).json({ id: results.insertId, question, answer });
    }
  });
});

// Update a flashcard
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { question, answer } = req.body;
  db.query('UPDATE flashcards SET question = ?, answer = ? WHERE id = ?', [question, answer, id], (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Database update error' });
    } else {
      res.json({ id, question, answer });
    }
  });
});

// Delete a flashcard
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM flashcards WHERE id = ?', [id], (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Database delete error' });
    } else {
      res.json({ message: 'Flashcard deleted successfully' });
    }
  });
});

module.exports = router;
