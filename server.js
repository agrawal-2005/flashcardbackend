const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({
  origin: 'https://flashcard-fc.netlify.app'
}));

// Example API endpoint
app.get('/api/flashcards', (req, res) => {
  // Initially, no data to return
  res.json([]);
});

app.listen(5001, () => {
  console.log('Server listening on port 5001');
});
