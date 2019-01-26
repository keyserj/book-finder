'use strict';
import { Book } from "./book";
import { insertBookCards } from "./searchbar";

$('.search-icon').click(() => {
  const bookCardTemplate = $('.book-card.d-none');
  const books = [
    new Book(
      'Harry Potter and the Chamber of Secrets',
      'Author Person Person, Also really long',
      'Publisher Company, Incorporated, Yes',
      'http://books.google.com/books/content?id=wDVV6y-8YHEC&printsec=frontcover&img=1&zoom=1&source=gbs_api',
      'https://www.google.com')
  ];

  insertBookCards(bookCardTemplate, books);
});