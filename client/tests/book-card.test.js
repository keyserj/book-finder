import $ from 'jquery';
import * as bookCard from '../src/book-card';
import Book from '../src/book';

const templateHTML =
  `
<a href="" target="_blank" class="card book-card align-items-center d-none">
  <img class="rounded" src="" alt="No Image Found">
  <div class="card-body">
    <h4 class="card-title"></h4>
    <h5></h5>
    <h6></h6>
  </div>
</a>
`;
const jqueryTemplateHTML = $(templateHTML);


test('creates visible book card from book card template', () => {

  const book = new Book('', [''], '', '', '');

  const expectedHTML =
    `
<a href="" target="_blank" class="card book-card align-items-center">
  <img class="rounded" src="" alt="No Image Found">
  <div class="card-body">
    <h4 class="card-title"></h4>
    <h5></h5>
    <h6></h6>
  </div>
</a>
    `;
  const jqueryExpectedHTML = $(expectedHTML);

  expect(bookCard.createBookCard(jqueryTemplateHTML, book))
    .toEqual(jqueryExpectedHTML);

});

test('creates book card using book properties', () => {

  const title = 'Harry Potter and the Chamber of Secrets';
  const authors = ['Author Person', 'Person Also really long'];
  const publisher = 'Publisher Company, Incorporated, Yes';
  const imageUrl = 'http://books.google.com/books/content?id=wDVV6y-8YHEC&printsec=frontcover&img=1&zoom=1&source=gbs_api';
  const detailsUrl = 'https://www.google.com';
  const book = new Book(title, authors, publisher, imageUrl, detailsUrl);

  const expectedAuthors = 'Author Person, Person Also really long';
  const expectedHTML =
    `
<a href="${detailsUrl}" target="_blank" class="card book-card align-items-center">
  <img class="rounded" src="${imageUrl}" alt="No Image Found">
  <div class="card-body">
    <h4 class="card-title">${title}</h4>
    <h5>${expectedAuthors}</h5>
    <h6>${publisher}</h6>
  </div>
</a>
    `;
  const jqueryExpectedHTML = $(expectedHTML);

  expect(bookCard.createBookCard(jqueryTemplateHTML, book))
    .toEqual(jqueryExpectedHTML);

})