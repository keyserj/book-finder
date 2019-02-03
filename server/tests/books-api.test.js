import { getVolumes } from '../src/books-api';
import nock from 'nock'

test('returns json response from Books API', async () => {
  const anyJson = { someProperty: 7 };
  nock('https://www.googleapis.com/books/v1')
    .get('/volumes')
    .query(true)
    .reply(200, anyJson);

  const volumes = await getVolumes('any query here', 'any key too');

  expect(volumes).toStrictEqual(anyJson);
});

test('uses properly parameterized Url to query Books API', async () => {
  const fakeBooksQuery = '#$&+,/:;=?@';
  const apiKey = 'fakeKey';
  const anyJson = { someProp: 'test' };
  nock('https://www.googleapis.com/books/v1')
    .get('/volumes')
    .query(
      {
        q: fakeBooksQuery,
        fields: 'items(volumeInfo(authors,imageLinks/thumbnail,infoLink,publisher,title))',
        key: apiKey
      })
    .reply(200, anyJson);

  const volumes = await getVolumes(fakeBooksQuery, apiKey);

  expect(volumes).toStrictEqual(anyJson);
});