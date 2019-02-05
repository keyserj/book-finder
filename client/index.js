import { insertBookCards } from './src/book-card';
import { parseBooksFromResponse } from './src/book';

$('.search-icon').click(performSearch);

$('.search-input').keypress(e => {
  if (e.which === 13) {
    performSearch();
  }
});

function performSearch() {
  $('.book-card:not(.d-none)').remove();
  $('.results-message').addClass('d-none');

  const booksQuery = $('.search-input').val();
  const fetchParams = {
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ booksQuery }),
    method: 'POST'
  };

  displayLoadingIcon(true);
  const bookCardTemplate = $('.book-card.d-none');

  fetchWithTimeout('/books', fetchParams, 5000)
    .then(response => response.json())
    .then(validateJsonResponse)
    .catch(displayError)
    .then(parseBooksFromResponse)
    .then(books => insertBookCards(bookCardTemplate, books))
    .catch(console.log)
    .then(() => displayLoadingIcon(false));
};

/**
 * @param {Boolean} makeVisible 
 */
function displayLoadingIcon(makeVisible) {
  if (makeVisible) {
    $('.lds-ellipsis').removeClass('d-none');
  } else {
    $('.lds-ellipsis').addClass('d-none');
  }
}

/**
 * @param {Object} jsonResponse 
 */
function validateJsonResponse(jsonResponse) {
  if (jsonResponse.error) {
    throw new Error(
      `HTTP Error ${jsonResponse.error.code} ` +
      `(${jsonResponse.error.message})`);
  } else {
    return jsonResponse;
  }
}

/**
 * @param {Error} error 
 */
function displayError(error) {
  $('.results-message')
    .text(`Problem with search: ${error.message}`)
    .removeClass('d-none');
  throw error;
};

/**
 * @param {string} url 
 * @param {any} options 
 * @param {number} timeout 
 */
function fetchWithTimeout(url, options, timeout) {
  return Promise.race([
    fetch(url, options),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Request timed out')), timeout)
    )
  ])
}