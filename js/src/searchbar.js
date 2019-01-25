import { Book } from './book';

/**
 * @param {JQuery<HTMLElement>} bookCardTemplate 
 * @param {Book[]} books 
 */
export function insertBookCards(bookCardTemplate, books) {
  let elementToInsertAfter = bookCardTemplate;

  for (let i = 0; i < books.length; i++) {
    const bookCard = createBookCard(bookCardTemplate, books[i]);
    bookCard.insertAfter(elementToInsertAfter);
    elementToInsertAfter = bookCard;
  }
}

/**
 * @param {JQuery<HTMLElement>} bookCardTemplate 
 * @param {Book} book 
 */
export function createBookCard(bookCardTemplate, book) {
  const bookCardCopy = bookCardTemplate.clone();

  bookCardCopy.removeClass('d-none');
  bookCardCopy.find('h4').text(book.title);
  bookCardCopy.find('h5').text(book.author);
  bookCardCopy.find('h6').text(book.publisher);
  bookCardCopy.find('img').attr('src', book.coverUrl);
  bookCardCopy.attr('href', book.detailsUrl);

  return bookCardCopy;
}