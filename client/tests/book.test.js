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

test('parses volume with empty volumeInfo into book', () => {
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