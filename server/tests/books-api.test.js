import * as booksApi from '../src/books-api';

test('returns a properly encoded Books API query', () => {
  const fakeBooksQuery = '#$&+,/:;=?@';
  const apiKey = 'fakeKey';

  const actualEncodedQuery = booksApi.getEncodedQueryUrl(fakeBooksQuery, apiKey);

  const expectedEncodedQuery =
    'https://www.googleapis.com/books/v1/volumes?q=%23%24%26%2B%2C%2F%3A%3B%3D%3F%40&fields=items(volumeInfo(authors%2CimageLinks%2Fthumbnail%2CinfoLink%2Cpublisher%2Ctitle))&key=fakeKey'

  expect(actualEncodedQuery).toEqual(expectedEncodedQuery);
});