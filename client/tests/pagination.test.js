/**
 * Notes:
 * When referring to pages, an asterisk (*) means that page is selected
 * e.g. 'page 1*' refers to the first page, which is selected.
 *
 * When referring to pages, an 'n' refers to the 'next' page item and a 'p'
 * refers to the 'previous' page item.
 */
import $ from 'jquery';
import { insertPageItems, getClickedPageNumber, getFirstResultNumber } from '../src/pagination';

const templateHTML = '<li class="page-item d-none"><a class="page-link" href="#"></a></li>';
const jqueryTemplateHTML = $(templateHTML);

test('inserts no pageItems if 10 or fewer results', () => {
  const expectedNextElement = $(jqueryTemplateHTML).next();

  insertPageItems(jqueryTemplateHTML, 1, 10, 10);

  const actualNextPage = jqueryTemplateHTML.next();
  expect(actualNextPage).toEqual(expectedNextElement);
});

test('inserts pages 1*,2,n if displaying 1-10 of 11 total results', () => {
  const jqueryExpectedPage1 = $('<li class="page-item selected"><a class="page-link" href="#">1</a></li>');
  const jqueryExpectedPage2 = $('<li class="page-item"><a class="page-link" href="#">2</a></li>');
  const jqueryExpectedPagen = $('<li class="page-item"><a class="page-link" href="#">Next</a></li>');

  insertPageItems(jqueryTemplateHTML, 1, 10, 11);

  const actualNextPage1 = jqueryTemplateHTML.next();
  const actualNextPage2 = actualNextPage1.next();
  const actualNextPagen = actualNextPage2.next();
  expect(actualNextPage1).toEqual(jqueryExpectedPage1);
  expect(actualNextPage2).toEqual(jqueryExpectedPage2);
  expect(actualNextPagen).toEqual(jqueryExpectedPagen);
});

test('inserts pages p,1,2* if displaying 11-11 of 11 total results', () => {
  const jqueryExpectedPagep = $('<li class="page-item"><a class="page-link" href="#">Previous</a></li>');
  const jqueryExpectedPage1 = $('<li class="page-item"><a class="page-link" href="#">1</a></li>');
  const jqueryExpectedPage2 = $('<li class="page-item selected"><a class="page-link" href="#">2</a></li>');

  insertPageItems(jqueryTemplateHTML, 11, 11, 11);

  const actualNextPagep = jqueryTemplateHTML.next();
  const actualNextPage1 = actualNextPagep.next();
  const actualNextPage2 = actualNextPage1.next();
  expect(actualNextPagep).toEqual(jqueryExpectedPagep);
  expect(actualNextPage1).toEqual(jqueryExpectedPage1);
  expect(actualNextPage2).toEqual(jqueryExpectedPage2);
});

test('inserts pages p,1,2,3*,4,5,n if displaying 21-30 of 50 total results', () => {
  const jqueryExpectedPagep = $('<li class="page-item"><a class="page-link" href="#">Previous</a></li>');
  const jqueryExpectedPage1 = $('<li class="page-item"><a class="page-link" href="#">1</a></li>');
  const jqueryExpectedPage2 = $('<li class="page-item"><a class="page-link" href="#">2</a></li>');
  const jqueryExpectedPage3 = $('<li class="page-item selected"><a class="page-link" href="#">3</a></li>');
  const jqueryExpectedPage4 = $('<li class="page-item"><a class="page-link" href="#">4</a></li>');
  const jqueryExpectedPage5 = $('<li class="page-item"><a class="page-link" href="#">5</a></li>');
  const jqueryExpectedPagen = $('<li class="page-item"><a class="page-link" href="#">Next</a></li>');

  insertPageItems(jqueryTemplateHTML, 21, 30, 50);

  const actualNextPagep = jqueryTemplateHTML.next();
  const actualNextPage1 = actualNextPagep.next();
  const actualNextPage2 = actualNextPage1.next();
  const actualNextPage3 = actualNextPage2.next();
  const actualNextPage4 = actualNextPage3.next();
  const actualNextPage5 = actualNextPage4.next();
  const actualNextPagen = actualNextPage5.next();
  expect(actualNextPagep).toEqual(jqueryExpectedPagep);
  expect(actualNextPage1).toEqual(jqueryExpectedPage1);
  expect(actualNextPage2).toEqual(jqueryExpectedPage2);
  expect(actualNextPage3).toEqual(jqueryExpectedPage3);
  expect(actualNextPage4).toEqual(jqueryExpectedPage4);
  expect(actualNextPage5).toEqual(jqueryExpectedPage5);
  expect(actualNextPagen).toEqual(jqueryExpectedPagen);
});

// inserts pages p,1,2,3*,4,5,n if displaying 21-30 of 100 total results
test('inserts at most two pages above the selected page', () => {
  const jqueryExpectedPagep = $('<li class="page-item"><a class="page-link" href="#">Previous</a></li>');
  const jqueryExpectedPage1 = $('<li class="page-item"><a class="page-link" href="#">1</a></li>');
  const jqueryExpectedPage2 = $('<li class="page-item"><a class="page-link" href="#">2</a></li>');
  const jqueryExpectedPage3 = $('<li class="page-item selected"><a class="page-link" href="#">3</a></li>');
  const jqueryExpectedPage4 = $('<li class="page-item"><a class="page-link" href="#">4</a></li>');
  const jqueryExpectedPage5 = $('<li class="page-item"><a class="page-link" href="#">5</a></li>');
  const jqueryExpectedPagen = $('<li class="page-item"><a class="page-link" href="#">Next</a></li>');

  insertPageItems(jqueryTemplateHTML, 21, 30, 100);

  const actualNextPagep = jqueryTemplateHTML.next();
  const actualNextPage1 = actualNextPagep.next();
  const actualNextPage2 = actualNextPage1.next();
  const actualNextPage3 = actualNextPage2.next();
  const actualNextPage4 = actualNextPage3.next();
  const actualNextPage5 = actualNextPage4.next();
  const actualNextPagen = actualNextPage5.next();
  expect(actualNextPagep).toEqual(jqueryExpectedPagep);
  expect(actualNextPage1).toEqual(jqueryExpectedPage1);
  expect(actualNextPage2).toEqual(jqueryExpectedPage2);
  expect(actualNextPage3).toEqual(jqueryExpectedPage3);
  expect(actualNextPage4).toEqual(jqueryExpectedPage4);
  expect(actualNextPage5).toEqual(jqueryExpectedPage5);
  expect(actualNextPagen).toEqual(jqueryExpectedPagen);
});

// inserts pages p,2,3,4*,5,n if displaying 31-40 of 50 total results
test('inserts at most two pages below the selected page', () => {
  const jqueryExpectedPagep = $('<li class="page-item"><a class="page-link" href="#">Previous</a></li>');
  const jqueryExpectedPage2 = $('<li class="page-item"><a class="page-link" href="#">2</a></li>');
  const jqueryExpectedPage3 = $('<li class="page-item"><a class="page-link" href="#">3</a></li>');
  const jqueryExpectedPage4 = $('<li class="page-item selected"><a class="page-link" href="#">4</a></li>');
  const jqueryExpectedPage5 = $('<li class="page-item"><a class="page-link" href="#">5</a></li>');
  const jqueryExpectedPagen = $('<li class="page-item"><a class="page-link" href="#">Next</a></li>');

  insertPageItems(jqueryTemplateHTML, 31, 40, 50);

  const actualNextPagep = jqueryTemplateHTML.next();
  const actualNextPage2 = actualNextPagep.next();
  const actualNextPage3 = actualNextPage2.next();
  const actualNextPage4 = actualNextPage3.next();
  const actualNextPage5 = actualNextPage4.next();
  const actualNextPagen = actualNextPage5.next();
  expect(actualNextPagep).toEqual(jqueryExpectedPagep);
  expect(actualNextPage2).toEqual(jqueryExpectedPage2);
  expect(actualNextPage3).toEqual(jqueryExpectedPage3);
  expect(actualNextPage4).toEqual(jqueryExpectedPage4);
  expect(actualNextPage5).toEqual(jqueryExpectedPage5);
  expect(actualNextPagen).toEqual(jqueryExpectedPagen);
});

test('throws exception if the ones digit of firstPageNumber is not 1', () => {
  expect(() => insertPageItems(jqueryTemplateHTML, 0, 10, 10)).toThrow();
  expect(() => insertPageItems(jqueryTemplateHTML, 2, 10, 10)).toThrow();
  expect(() => insertPageItems(jqueryTemplateHTML, 9, 10, 10)).toThrow();
  expect(() => insertPageItems(jqueryTemplateHTML, 10, 10, 10)).toThrow();

  expect(() => insertPageItems(jqueryTemplateHTML, 30, 40, 40)).toThrow();
  expect(() => insertPageItems(jqueryTemplateHTML, 32, 40, 40)).toThrow();
  expect(() => insertPageItems(jqueryTemplateHTML, 39, 40, 40)).toThrow();
  expect(() => insertPageItems(jqueryTemplateHTML, 40, 40, 40)).toThrow();
});

test('throws exception if the lastPageNumber is 10+ bigger than first', () => {
  expect(() => insertPageItems(jqueryTemplateHTML, 1, 11, 11)).toThrow();
  expect(() => insertPageItems(jqueryTemplateHTML, 11, 30, 30)).toThrow();
});

test('throws exception if firstResultNumber is greater than lastResultNumber', () => {
  expect(() => insertPageItems(jqueryTemplateHTML, 1, 0, 0))
    .toThrow('First result number cannot be greater than last result number');
});

test('throws exception if firstResultNumber is negative', () => {
  expect(() => insertPageItems(jqueryTemplateHTML, 2, 1, 11)).toThrow();
});

test('throws exception if any parameter is null', () => {
  expect(() => insertPageItems(null, 1, 10, 10)).toThrow();
  expect(() => insertPageItems(jqueryTemplateHTML, null, 10, 10)).toThrow();
  expect(() => insertPageItems(jqueryTemplateHTML, 1, null, 10)).toThrow();
  expect(() => insertPageItems(jqueryTemplateHTML, 1, 10, null)).toThrow();
});

test('throws exception if template is empty', () => {
  expect(() => insertPageItems($('blah'), 1, 10, 10)).toThrow();
});

test('throws exception if totalResults is negative', () => {
  expect(() => insertPageItems(jqueryTemplateHTML, 1, 10, -1)).toThrow();
});

test('throws exception if totalResults is smaller than lastResult - firstResult + 1', () => {
  expect(() => insertPageItems(jqueryTemplateHTML, 1, 10, 9)).toThrow();
});

test('get clicked page number returns one less than selected if clicked is Previous', () => {
  const actualPageNumber = getClickedPageNumber('Previous', '4');
  expect(actualPageNumber).toBe(3);
});

test('get clicked page number returns one more than selected if clicked is Next', () => {
  const actualPageNumber = getClickedPageNumber('Next', '4');
  expect(actualPageNumber).toBe(5);
});

test('get clicked page number returns clicked page item as number if it is a number', () => {
  const actualPageNumber1 = getClickedPageNumber('1', '4');
  expect(actualPageNumber1).toBe(1);

  const actualPageNumber9 = getClickedPageNumber('9', '4');
  expect(actualPageNumber9).toBe(9);
});

test('get clicked page number throws exception if selected page item text is NaN', () => {
  expect(() => getClickedPageNumber('Previous', 'string')).toThrow();
  expect(() => getClickedPageNumber('Previous', null)).toThrow();
});

test('get clicked page number throws exception if clicked page item text is NaN and not \'Previous\' or \'Next\'', () => {
  expect(() => getClickedPageNumber('Previouss', '4')).toThrow();
  expect(() => getClickedPageNumber(null, '4')).toThrow();
});

test('get first result number returns 1 for first page', () => {
  expect(getFirstResultNumber(1)).toBe(1);
});

test('get first result number returns 11 for second page', () => {
  expect(getFirstResultNumber(2)).toBe(11);
});

test('get first result number returns 231 for 24th page', () => {
  expect(getFirstResultNumber(24)).toBe(231);
});

test('get first result number throws exception if page number is null', () => {
  expect(() => getFirstResultNumber(null)).toThrow();
});
