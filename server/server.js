const express = require('express');
const app = express();
const path = require('path');

const clientPath = path.resolve(__dirname, '../client');

app.use(express.static(clientPath));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(clientPath, 'index.html'));
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log('i hear you'));