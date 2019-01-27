import * as booksApi from '../src/books-api';
import Book from '../../client/js/src/book';

test('returns a properly encoded Books API query', () => {
  const fakeBooksQuery = '#$&+,/:;=?@';
  const apiKey = 'fakeKey';

  const actualEncodedRequestUrl = booksApi.getEncodedRequestUrl(fakeBooksQuery, apiKey);

  const expectedEncodedRequestUrl =
    'https://www.googleapis.com/books/v1/volumes?q=%23%24%26%2B%2C%2F%3A%3B%3D%3F%40&fields=items(volumeInfo(authors%2CimageLinks%2Fthumbnail%2CinfoLink%2Cpublisher%2Ctitle))&key=fakeKey'

  expect(actualEncodedRequestUrl).toEqual(expectedEncodedRequestUrl);
});

test('parses volumes from API into books', () => {
  const responseJson = JSON.parse(
    `{
  "items":[  
      {  
         "volumeInfo":{  
            "title":"Harry Potter and the Cursed Child – Parts One and Two (Special Rehearsal Edition)",
            "authors":[  
               "J.K. Rowling",
               "John Tiffany",
               "Jack Thorne"
            ],
            "publisher":"Pottermore Publishing",
            "imageLinks":{  
               "thumbnail":"http://books.google.com/books/content?id=tcSMCwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
            },
            "infoLink":"http://books.google.com/books?id=tcSMCwAAQBAJ&dq=harry+potter&hl=&source=gbs_api"
         }
      }
    ]
}`);

  const actualBooks = booksApi.parseBooksFromResponse(responseJson);

  const expectedBooks = [
    new Book(
      "Harry Potter and the Cursed Child – Parts One and Two (Special Rehearsal Edition)",
      ["J.K. Rowling", "John Tiffany", "Jack Thorne"],
      "Pottermore Publishing",
      "http://books.google.com/books/content?id=tcSMCwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
      "http://books.google.com/books?id=tcSMCwAAQBAJ&dq=harry+potter&hl=&source=gbs_api"
    )
  ]

  expect(actualBooks).toStrictEqual(expectedBooks);
});

test('parsing no volumes from API results in no books', () => {
  const responseJson = JSON.parse('{ "items":[] }');

  const actualBooks = booksApi.parseBooksFromResponse(responseJson);

  const expectedBooks = [];

  expect(actualBooks).toStrictEqual(expectedBooks);
});

test('parses book from volume with all fields', () => {
  const title = "title1";
  const authors = ["author1", "author2"];
  const publisher = "publisher1";
  const thumbnail = "thumbnail1";
  const infoLink = "infoLink1";

  const volume = {
    volumeInfo: {
      title,
      authors,
      publisher,
      imageLinks: {
        thumbnail,
      },
      infoLink
    }
  };

  const actualBook = booksApi.parseBookFromVolume(volume);

  const expectedBook = new Book(title, authors, publisher, thumbnail, infoLink);

  expect(actualBook).toStrictEqual(expectedBook);
});

test('parses book from volume with no imageLink', () => {
  const title = "title1";
  const authors = ["author1", "author2"];
  const publisher = "publisher1";
  const infoLink = "infoLink1";

  const volume = {
    volumeInfo: {
      title,
      authors,
      publisher,
      infoLink
    }
  };

  const actualBook = booksApi.parseBookFromVolume(volume);

  const expectedBook = new Book(title, authors, publisher, undefined, infoLink);

  expect(actualBook).toStrictEqual(expectedBook);
});