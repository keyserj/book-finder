// @ts-nocheck
import Book from '../../client/src/book';
import fetch from 'node-fetch';

/**
 * @param {string} booksQuery 
 */
export async function getBooks(booksQuery, apiKey) {
  const requestUrl = getEncodedRequestUrl(booksQuery, apiKey);
  const response = await fetch(requestUrl);
  const responseJson = await response.json();

  const books = parseBooksFromResponse(responseJson);
  return books;
}

/**
 * @param {string} booksQuery 
 * @param {string} apiKey 
 */
export function getEncodedRequestUrl(booksQuery, apiKey) {
  const baseUrl = 'https://www.googleapis.com/books/v1';

  const unencodedFields =
    'items(' +
    'volumeInfo(' +
    'authors,imageLinks/thumbnail,infoLink,publisher,title))'

  const encodedFields = encodeURIComponent(unencodedFields);
  const encodedBooksQuery = encodeURIComponent(booksQuery);

  const requestUrl = `${baseUrl}/volumes?q=${encodedBooksQuery}` +
    `&fields=${encodedFields}` +
    `&key=${apiKey}`;

  return requestUrl;
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