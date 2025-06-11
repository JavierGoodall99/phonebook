const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

app.get('/test', (req, res) => {
  res.json({ 
    message: 'Test endpoint is working' 
  });
});

app.get('/contacts', (req, res) => {
  res.json({
    status: 'success',
    results: 0,
    data: { contacts: [] }
  });
});

app.listen(PORT, () => {
  console.log(`Test server is running on port ${PORT}`);
});
