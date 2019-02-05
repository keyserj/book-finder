import { queryForVolumes } from '../src/books-api';
import nock from 'nock'

const anyJson = { someProp: 'test' };

test('returns json response from Books API', async () => {
  nock('https://www.googleapis.com/books/v1')
    .get('/volumes')
    .query(true)
    .reply(200, anyJson);

  const response = await queryForVolumes('any query here', 'any key too');

  expect(response).toStrictEqual(anyJson);
});

test('uses properly parameterized Url to query Books API', async () => {
  const booksQueryWithUnencodedChars = '#$&+,/:;=?@';
  const apiKey = 'fakeKey';
  nock('https://www.googleapis.com/books/v1')
    .get('/volumes')
    .query(
      {
        q: booksQueryWithUnencodedChars,
        fields: 'items(volumeInfo(authors,imageLinks/thumbnail,infoLink,publisher,title))',
        key: apiKey
      })
    .reply(200, anyJson);

  const response = await queryForVolumes(booksQueryWithUnencodedChars, apiKey);

  expect(response).toStrictEqual(anyJson);
});

test('query with bad parameters safely returns an error response', async () => {
  const expectedResponse = {
    error: {
      errors: [
        {
          domain: "global",
          reason: "requried",
          message: "Required parameter: q",
          locationType: "parameter",
          location: "q"
        }
      ],
      code: 400,
      message: "Required parameter: q"
    }
  };

  nock('https://www.googleapis.com/books/v1')
    .get('/volumes')
    .query(true)
    .reply(400, expectedResponse);

  const actualResponse = await queryForVolumes(null, null);

  expect(actualResponse).toStrictEqual(expectedResponse);
});

test('query throws timeout exception after 5s wait', async () => {
  jest.useFakeTimers();
  nock('https://www.googleapis.com/books/v1')
    .get('/volumes')
    .query(true)
    .delay(5000)
    .reply(200, anyJson);

  expect.assertions(1);

  const promise = queryForVolumes("any", "any")
    .catch(e => expect(e).toBeInstanceOf(Error));
  jest.runAllTimers();
  return promise;
});

test('query does not throw timeout exception after 4.999s wait', async () => {
  jest.useFakeTimers();
  nock('https://www.googleapis.com/books/v1')
    .get('/volumes')
    .query(true)
    .delay(4999)
    .reply(200, anyJson);

  expect.assertions(0);

  const promise = queryForVolumes("any", "any")
    .catch(e => expect(e).toBeInstanceOf(Error));
  jest.runAllTimers();
  return promise;
});

test('query with http request error throws exception', async () => {
  nock('https://www.googleapis.com/books/v1')
    .get('/volumes')
    .query(true)
    .replyWithError('request error');

  expect.assertions(1);

  return queryForVolumes("any", "any")
    .catch(e => expect(e).toBeInstanceOf(Error));
});