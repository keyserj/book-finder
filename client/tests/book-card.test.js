import $ from 'jquery';
import { insertBookCards } from '../src/book-card';
import { Book } from '../src/book';

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

test('inserts visible book card after book card template', () => {
  const books = [new Book('', [''], '', '', '')];

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

  insertBookCards(jqueryTemplateHTML, books);

  const jqueryActualHTML = jqueryTemplateHTML.next();
  expect(jqueryActualHTML).toEqual(jqueryExpectedHTML);
})

test('inserts book card using book properties', () => {

  const title = 'Harry Potter and the Chamber of Secrets';
  const authors = ['Author Person', 'Person Also really long'];
  const publisher = 'Publisher Company, Incorporated, Yes';
  const imageUrl = 'http://books.google.com/books/content?id=wDVV6y-8YHEC&printsec=frontcover&img=1&zoom=1&source=gbs_api';
  const detailsUrl = 'https://www.google.com';
  const books = [new Book(title, authors, publisher, imageUrl, detailsUrl)];

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

  insertBookCards(jqueryTemplateHTML, books);

  const jqueryActualHTML = jqueryTemplateHTML.next();
  expect(jqueryActualHTML).toEqual(jqueryExpectedHTML);
})

test('inserts multiple book cards after book card template', () => {
  const books = [
    new Book(
      'Harry Potter and the Chamber of Secrets',
      ['Author Person', 'Person Also really long'],
      'Publisher Company, Incorporated, Yes',
      'http://books.google.com/books/content?id=wDVV6y-8YHEC&printsec=frontcover&img=1&zoom=1&source=gbs_api',
      'https://www.google.com'),
    new Book(
      'title1',
      ['author1', 'Person Also really long'],
      'publisher1',
      'url1',
      'url2')
  ];

  const expectedFirstHTML =
    `
<a href="${books[0].detailsUrl}" target="_blank" class="card book-card align-items-center">
  <img class="rounded" src="${books[0].coverUrl}" alt="No Image Found">
  <div class="card-body">
    <h4 class="card-title">${books[0].title}</h4>
    <h5>${books[0].authors}</h5>
    <h6>${books[0].publisher}</h6>
  </div>
</a>
    `;
  const jqueryExpectedFirstHTML = $(expectedFirstHTML);

  const expectedSecondHTML =
    `
<a href="${books[0].detailsUrl}" target="_blank" class="card book-card align-items-center">
  <img class="rounded" src="${books[0].coverUrl}" alt="No Image Found">
  <div class="card-body">
    <h4 class="card-title">${books[0].title}</h4>
    <h5>${books[0].authors}</h5>
    <h6>${books[0].publisher}</h6>
  </div>
</a>
    `;
  const jqueryExpectedSecondHTML = $(expectedSecondHTML);

  insertBookCards(jqueryTemplateHTML, books);

  const jqueryActualFirstHTML = jqueryTemplateHTML.next();
  const jqueryActualSecondHTML = jqueryTemplateHTML.next();
  expect(jqueryActualFirstHTML).toEqual(jqueryExpectedFirstHTML);
  expect(jqueryActualSecondHTML).toEqual(jqueryExpectedSecondHTML);
})

test('throws exception if bookCardTemplate is null', () => {
  const books = [new Book('', [''], '', '', '')];
  expect(() => insertBookCards(null, books)).toThrow();
})

test('throws exception if bookCardTemplate is empty', () => {
  const books = [new Book('', [''], '', '', '')];
  expect(() => insertBookCards($('blah'), books)).toThrow();
})

test('inserts no book cards if books is empty', () => {
  const books = [];
  const expectedNextElement = $(jqueryTemplateHTML).next();

  insertBookCards(jqueryTemplateHTML, books);

  const actualNextElement = $(jqueryTemplateHTML).next();
  expect(actualNextElement).toStrictEqual(expectedNextElement);
})

test('inserts no book cards if books is null', () => {
  const expectedNextElement = $(jqueryTemplateHTML).next();

  insertBookCards(jqueryTemplateHTML, null);

  const actualNextElement = $(jqueryTemplateHTML).next();
  expect(actualNextElement).toStrictEqual(expectedNextElement);
})