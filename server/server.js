import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import config from './config-variables/config';
import * as booksApi from './src/books-api';

const clientPath = path.resolve(__dirname, '../../client');

const app = express();
app.use(bodyParser.json());
app.use(express.static(clientPath));

app.get('/', (request, response) => {
  response.sendFile(path.resolve(clientPath, 'index.html'));
});

app.post('/books', (request, response) => {
  const booksQuery = request.body.booksQuery;
  booksApi.getBooks(booksQuery, config.apiKey)
    .then(books => response.json(books));
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`app is listening on port ${port}`));