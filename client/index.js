import Book from "./src/book";
import { insertBookCards } from "./src/book-card";

$('.search-icon').click(performSearch);

$('.search-input').keypress(e => {
  if (e.which === 13) {
    performSearch();
  }
});

function performSearch() {
  $('.book-card:not(.d-none)').remove();

  const booksQuery = $('.search-input').val();
  const fetchParams = {
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ booksQuery }),
    method: 'POST'
  };

  const bookCardTemplate = $('.book-card.d-none');
  fetch('/books', fetchParams)
    .then(response => response.json())
    .then(json => insertBookCards(bookCardTemplate, json));
};