import fetch from 'node-fetch';

/**
 * @param {string} booksQuery
 * @param {string} apiKey
 * @param {number} [startIndex]
 * @throws timeout or http request error
 */
export default async function queryForVolumes(booksQuery, apiKey, startIndex = 0) {
  const requestUrl = getEncodedRequestUrl(booksQuery, apiKey, startIndex);
  const response = await fetchWithTimeout(requestUrl, {}, 5000);
  return response.json();
}

/**
 * @param {string} booksQuery
 * @param {string} apiKey
 * @param {number} startIndex
 */
function getEncodedRequestUrl(booksQuery, apiKey, startIndex) {
  const baseUrl = 'https://www.googleapis.com/books/v1';

  const unencodedFields = 'totalItems,'
    + 'items('
    + 'volumeInfo('
    + 'authors,imageLinks/thumbnail,infoLink,publisher,title))';

  const encodedFields = encodeURIComponent(unencodedFields);
  const encodedBooksQuery = encodeURIComponent(booksQuery);

  const requestUrl = `${baseUrl}/volumes?q=${encodedBooksQuery}`
    + `&fields=${encodedFields}`
    + `&startIndex=${startIndex}`
    + `&key=${apiKey}`;

  return requestUrl;
}

/**
 * @param {string} url
 * @param {any} options
 * @param {number} timeout
 */
function fetchWithTimeout(url, options, timeout = 5000) {
  return Promise.race([
    fetch(url, options),
    new Promise((_, reject) => setTimeout(() => reject(new Error('Request timed out')), timeout)),
  ]);
}
