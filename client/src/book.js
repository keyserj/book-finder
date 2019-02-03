// @ts-nocheck
export class Book {

  /**
   * @param {string} title 
   * @param {string[]} authors 
   * @param {string} publisher 
   * @param {string} coverUrl 
   * @param {string} detailsUrl 
   */
  constructor(title, authors, publisher, coverUrl, detailsUrl) {
    this.title = title;
    this.authors = authors ? authors.join(', ') : undefined;
    this.publisher = publisher;
    this.coverUrl = coverUrl;
    this.detailsUrl = detailsUrl;
  }

}

/**
 * @param {Response} apiResponseJson 
 */
export function parseBooksFromResponse(apiResponseJson) {

  const books = [];

  if (apiResponseJson && apiResponseJson.items) {
    const volumes = apiResponseJson.items;
    for (let i = 0; i < volumes.length; i++) {
      const book = parseBookFromVolume(volumes[i]);
      books.push(book);
    }
  }

  return books;
}

export function parseBookFromVolume(volume) {
  let thumbnail = undefined;
  if (volume.volumeInfo.imageLinks) {
    thumbnail = volume.volumeInfo.imageLinks.thumbnail;
  }

  const book = new Book(
    volume.volumeInfo.title,
    volume.volumeInfo.authors,
    volume.volumeInfo.publisher,
    thumbnail,
    volume.volumeInfo.infoLink
  );

  return book;
}