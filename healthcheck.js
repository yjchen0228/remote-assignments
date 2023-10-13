const express = require('express');
const app = express();
const PORT = 3003;

app.get('/healthcheck', (req, res) => {
  res.status(200).send('OK');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
