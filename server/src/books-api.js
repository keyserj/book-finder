import fetch from 'node-fetch';

/**
 * @param {string} booksQuery 
 * @throws timeout or http request error
 */
export async function queryForVolumes(booksQuery, apiKey) {
  const requestUrl = getEncodedRequestUrl(booksQuery, apiKey);
  const response = await fetchWithTimeout(requestUrl, {}, 5000);
  return response.json();
}

/**
 * @param {string} booksQuery 
 * @param {string} apiKey 
 */
function getEncodedRequestUrl(booksQuery, apiKey) {
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
 * @param {string} url 
 * @param {any} options 
 * @param {number} timeout 
 */
function fetchWithTimeout(url, options, timeout = 5000) {
  return Promise.race([
    fetch(url, options),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Request timed out')), timeout)
    )
  ])
}