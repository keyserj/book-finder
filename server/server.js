import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import config from './config-variables/config';
import queryForVolumes from './src/books-api';

const clientPath = path.resolve(__dirname, '../../client');

const app = express();
app.use(bodyParser.json());
app.use(express.static(clientPath));

app.get('/', (request, response) => {
  response.sendFile(path.resolve(clientPath, 'index.html'));
});

app.post('/books', (request, response) => {
  const { booksQuery } = request.body;
  const { startIndex } = request.body;
  queryForVolumes(booksQuery, config.apiKey, startIndex)
    .then((apiResponse) => {
      if (apiResponse.error) {
        response.status(apiResponse.error.code);
      }
      response.json(apiResponse);
    })
    .catch((error) => {
      response.status(500);
      response.json({
        error: {
          code: 500,
          message: error.message,
        },
      });
    });
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`app is listening on port ${port}`));
