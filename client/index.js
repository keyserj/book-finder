import Book from "./src/book";
import { insertBookCards } from "./src/searchbar";

$('.search-icon').click(() => {
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
});