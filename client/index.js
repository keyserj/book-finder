import insertBookCards from './src/book-card';
import { insertPageItems, getClickedPageNumber, getFirstResultNumber } from './src/pagination';
import { parseBooksFromResponse } from './src/book';

$('.search-icon').click(() => performSearch());

$('.search-input').keypress((e) => {
  if (e.which === 13) {
    performSearch();
  }
});

$('body').on('click', '.page-item a', function updatePage(e) {
  e.preventDefault();
  const clickedPageNumberText = $(this).text();
  const selectedPageNumberText = $('.page-item.selected').text();
  const clickedPageNumber = getClickedPageNumber(clickedPageNumberText, selectedPageNumberText);
  const firstResultNumber = getFirstResultNumber(clickedPageNumber);
  performSearch(firstResultNumber);
});

function performSearch(firstResultNumber = 1) {
  $('.book-card:not(.d-none)').remove();
  $('.page-item:not(.d-none)').remove();
  $('.results-message').addClass('d-none');

  const booksQuery = $('.search-input').val().toString();
  if (!booksQuery.trim()) {
    displayResultsDescription(booksQuery, 0, 0, 0);
    return;
  }

  const fetchParams = {
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ booksQuery, startIndex: firstResultNumber - 1 }),
    method: 'POST',
  };

  displayLoadingIcon(true);

  fetchWithTimeout('/books', fetchParams, 5000)
    .then(response => response.json())
    .then(validateJsonResponse)
    .catch(displayError)
    .then(jsonResponse => updatePageWithResults(jsonResponse, booksQuery, firstResultNumber))
    .catch(console.log)
    .then(() => displayLoadingIcon(false));
}

/**
 * @param {Object} jsonResponse
 * @param {string} booksQuery
 * @param {number} firstResultNumber
 */
function updatePageWithResults(jsonResponse, booksQuery, firstResultNumber) {
  const bookCardTemplate = $('.book-card.d-none');
  const books = parseBooksFromResponse(jsonResponse);
  insertBookCards(bookCardTemplate, books);

  const lastResultNumber = firstResultNumber + books.length - 1;
  const totalResults = jsonResponse.totalItems;
  displayResultsDescription(
    booksQuery,
    totalResults === 0 ? 0 : firstResultNumber,
    lastResultNumber,
    totalResults,
  );

  const pageItemTemplate = $('.page-item.d-none');
  insertPageItems(pageItemTemplate, firstResultNumber, lastResultNumber, totalResults);
}

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
      `HTTP Error ${jsonResponse.error.code} `
      + `(${jsonResponse.error.message})`,
    );
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
}

/**
 * @param {string} booksQuery
 * @param {number} firstResultNumber
 * @param {number} lastResultNumber
 * @param {number} totalResults
 */
function displayResultsDescription(
  booksQuery,
  firstResultNumber,
  lastResultNumber,
  totalResults,
) {
  $('.results-message')
    .text(
      `Displaying results ${firstResultNumber}-${lastResultNumber}`
      + ` of ${totalResults} for "${booksQuery}"`,
    )
    .removeClass('d-none');
}

/**
 * @param {string} url
 * @param {any} options
 * @param {number} timeout
 */
function fetchWithTimeout(url, options, timeout) {
  return Promise.race([
    fetch(url, options),
    new Promise((_, reject) => setTimeout(() => reject(new Error('Request timed out')), timeout)),
  ]);
}
