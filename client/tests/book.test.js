import { parseBooksFromResponse, Book } from "../src/book";

test('parses one volume into book', () => {
  const apiResponseJson =
  {
    items: [
      {
        volumeInfo: {
          title: "Harry Potter and the Cursed Child – Parts One and Two (Special Rehearsal Edition)",
          authors: [
            "J.K. Rowling",
            "John Tiffany",
            "Jack Thorne"
          ],
          publisher: "Pottermore Publishing",
          imageLinks: {
            thumbnail: "http://books.google.com/books/content?id=tcSMCwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
          },
          infoLink: "http://books.google.com/books?id=tcSMCwAAQBAJ&dq=harry+potter&hl=&source=gbs_api"
        }
      }
    ]
  };

  const actualBooks = parseBooksFromResponse(apiResponseJson);

  const expectedBooks = [
    new Book(
      apiResponseJson.items[0].volumeInfo.title,
      apiResponseJson.items[0].volumeInfo.authors,
      apiResponseJson.items[0].volumeInfo.publisher,
      apiResponseJson.items[0].volumeInfo.imageLinks.thumbnail,
      apiResponseJson.items[0].volumeInfo.infoLink,
    ),
  ]

  expect(actualBooks).toStrictEqual(expectedBooks);
});

test('parses multiple volumes into books', () => {
  const apiResponseJson =
  {
    items: [
      {
        volumeInfo: {
          title: "Harry Potter and the Cursed Child – Parts One and Two (Special Rehearsal Edition)",
          authors: [
            "J.K. Rowling",
            "John Tiffany",
            "Jack Thorne"
          ],
          publisher: "Pottermore Publishing",
          imageLinks: {
            thumbnail: "http://books.google.com/books/content?id=tcSMCwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
          },
          infoLink: "http://books.google.com/books?id=tcSMCwAAQBAJ&dq=harry+potter&hl=&source=gbs_api"
        }
      },
      {
        volumeInfo: {
          title: "title1",
          authors: [
            "author1",
          ],
          publisher: "publisher1",
          imageLinks: {
            thumbnail: "thumbnail1"
          },
          infoLink: "infoLink1"
        }
      }
    ]
  };

  const actualBooks = parseBooksFromResponse(apiResponseJson);

  const expectedBooks = [
    new Book(
      apiResponseJson.items[0].volumeInfo.title,
      apiResponseJson.items[0].volumeInfo.authors,
      apiResponseJson.items[0].volumeInfo.publisher,
      apiResponseJson.items[0].volumeInfo.imageLinks.thumbnail,
      apiResponseJson.items[0].volumeInfo.infoLink,
    ),
    new Book(
      apiResponseJson.items[1].volumeInfo.title,
      apiResponseJson.items[1].volumeInfo.authors,
      apiResponseJson.items[1].volumeInfo.publisher,
      apiResponseJson.items[1].volumeInfo.imageLinks.thumbnail,
      apiResponseJson.items[1].volumeInfo.infoLink,
    )
  ]

  expect(actualBooks).toStrictEqual(expectedBooks);
});

test('parses no volumes into no books', () => {
  const apiResponseJson = { items: [] };

  const actualBooks = parseBooksFromResponse(apiResponseJson);

  const expectedBooks = [];

  expect(actualBooks).toStrictEqual(expectedBooks);
});

test('parses null volumes into no books', () => {
  const actualBooks = parseBooksFromResponse(null);

  const expectedBooks = [];

  expect(actualBooks).toStrictEqual(expectedBooks);
});

test('parses empty json into no books', () => {
  const actualBooks = parseBooksFromResponse({});

  const expectedBooks = [];

  expect(actualBooks).toStrictEqual(expectedBooks);
})

test('parses volume with empty volumeInfo into empty book', () => {
  const apiResponseJson = {
    items: [
      {
        volumeInfo: {

        }
      }
    ]
  }

  const actualBooks = parseBooksFromResponse(apiResponseJson);

  const expectedBooks = [
    new Book(
      undefined,
      undefined,
      undefined,
      undefined,
      undefined)
  ];

  expect(actualBooks).toStrictEqual(expectedBooks);
});

test('initializes empty Book with null values', () => {
  const book = new Book(null, null, null, null, null);

  expect(book.title).toBe(null);
  expect(book.authors).toBe(null);
  expect(book.publisher).toBe(null);
  expect(book.coverUrl).toBe(null);
  expect(book.detailsUrl).toBe(null);
});

test('initializes Book with concatenated authors', () => {
  const author1 = 'Jimmy';
  const author2 = 'Sarah';
  const book = new Book(null, [author1, author2], null, null, null);

  expect(book.authors).toBe(`${author1}, ${author2}`);
});

test('initializes Book with regular values', () => {
  const title = 'Harry Potter and the Chamber of Secrets';
  const author1 = 'Author Person';
  const authors = [author1];
  const publisher = 'Publisher Company, Incorporated, Yes';
  const imageUrl = 'http://books.google.com/books/content?id=wDVV6y-8YHEC&printsec=frontcover&img=1&zoom=1&source=gbs_api';
  const detailsUrl = 'https://www.google.com';
  const book = new Book(title, authors, publisher, imageUrl, detailsUrl);

  expect(book.title).toBe(title);
  expect(book.authors).toBe(author1);
  expect(book.publisher).toBe(publisher);
  expect(book.coverUrl).toBe(imageUrl);
  expect(book.detailsUrl).toBe(detailsUrl);
});