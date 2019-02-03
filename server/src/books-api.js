import fetch from 'node-fetch';

/**
 * @param {string} booksQuery 
 */
export async function getBooks(booksQuery, apiKey) {
  const requestUrl = getEncodedRequestUrl(booksQuery, apiKey);
  const response = await fetch(requestUrl);
  return response.json();
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