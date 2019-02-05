import { Book } from './book';

/**
 * @param {JQuery<HTMLElement>} bookCardTemplate 
 * @param {Book[]} books 
 */
export function insertBookCards(bookCardTemplate, books) {
  if (!bookCardTemplate || !bookCardTemplate.length) {
    throw new Error('Empty bookCardTemplate cannot be used to create book cards');
  }

  if (!books) {
    return;
  }

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
function createBookCard(bookCardTemplate, book) {
  const bookCardCopy = bookCardTemplate.clone();

  bookCardCopy.removeClass('d-none');
  bookCardCopy.find('h4').text(book.title);
  bookCardCopy.find('h5').text(book.authors);
  bookCardCopy.find('h6').text(book.publisher);
  bookCardCopy.find('img').attr('src', book.coverUrl);
  bookCardCopy.attr('href', book.detailsUrl);

  return bookCardCopy;
}