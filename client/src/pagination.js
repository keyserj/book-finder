const PREVIOUS = -2;
const NEXT = -1;
const RESULTS_PER_PAGE = 10;
const MAX_PAGE_DISTANCE_FROM_SELECTED = 2;

/**
 * @param {JQuery<HTMLElement>} pageItemTemplate 
 * @param {number} firstResultNumber 
 * @param {number} lastResultNumber 
 * @param {number} totalResults 
 */
export function insertPageItems(
  pageItemTemplate,
  firstResultNumber,
  lastResultNumber,
  totalResults) {

  validate(pageItemTemplate, firstResultNumber, lastResultNumber, totalResults);

  const selectedPageNumber =
    Math.floor((lastResultNumber - 1) / RESULTS_PER_PAGE) + 1;

  const pageNumbers =
    getPageNumbers(
      selectedPageNumber,
      firstResultNumber,
      lastResultNumber,
      totalResults);

  if (pageNumbers.length > 1) {
    let elementToInsertAfter = pageItemTemplate;

    for (let i = 0; i < pageNumbers.length; i++) {
      const isSelectedPage = pageNumbers[i] === selectedPageNumber;
      const pageItem = createPageItem(pageItemTemplate, pageNumbers[i], isSelectedPage);
      pageItem.insertAfter(elementToInsertAfter);
      elementToInsertAfter = pageItem;
    }
  }
}

/**
 * @param {string} clickedPageItemText 
 * @param {string} selectedPageItemText 
 * @returns {number}
 */
export function getClickedPageNumber(clickedPageItemText, selectedPageItemText) {
  const selectedPageNumber = parseInt(selectedPageItemText);
  if (isNaN(selectedPageNumber)) {
    throw new Error("Selected page item's text is not a number");
  }

  let clickedPageNumber;
  if (clickedPageItemText === 'Previous') {
    clickedPageNumber = selectedPageNumber - 1;
  } else if (clickedPageItemText === 'Next') {
    clickedPageNumber = selectedPageNumber + 1;
  } else {
    clickedPageNumber = parseInt(clickedPageItemText);
    if (isNaN(clickedPageNumber)) {
      throw new Error("Clicked page item's text is not 'Previous', 'Next', nor a number");
    }
  }
  return clickedPageNumber;
}

/**
 * @param {number} pageNumber 
 * @returns {number}
 */
export function getFirstResultNumber(pageNumber) {
  if (!pageNumber) {
    throw new Error('Page number is required for determining the first result number');
  }
  return (pageNumber - 1) * RESULTS_PER_PAGE + 1;
}

/**
 * @param {JQuery<HTMLElement>} pageItemTemplate 
 * @param {number} firstResultNumber 
 * @param {number} lastResultNumber 
 * @param {number} totalResults 
 */
function validate(pageItemTemplate, firstResultNumber, lastResultNumber, totalResults) {
  if (!pageItemTemplate || !firstResultNumber || !lastResultNumber || !totalResults) {
    throw new Error('No argument can be null');
  }
  else if (!pageItemTemplate.length) {
    throw new Error('Empty pageItemTemplate cannot be used to create page items');
  }
  else if (!isOnesDigitAOne(firstResultNumber)) {
    throw new Error('The ones digit of the first page result should be a one');
  }
  else if (lastResultNumber >= (firstResultNumber + RESULTS_PER_PAGE)) {
    throw new Error(`Last page result should not be ${RESULTS_PER_PAGE}+` +
      ' pages higher than first page result');
  } else if (totalResults < (lastResultNumber - firstResultNumber + 1)) {
    throw new Error('Total results cannot be smaller than last result - first result + 1');
  }
}

/**
 * @param {number} firstResultNumber 
 */
function isOnesDigitAOne(firstResultNumber) {
  return firstResultNumber.toString().slice(-1) === '1';
}

/**
 * @param {JQuery<HTMLElement>} pageItemTemplate 
 * @param {number} pageNumber 
 * @param {Boolean} isSelectedPage 
 * @returns {JQuery<HTMLElement>}
 */
function createPageItem(pageItemTemplate, pageNumber, isSelectedPage) {
  const pageItemClone = pageItemTemplate.clone();
  pageItemClone.removeClass('d-none');

  if (isSelectedPage) {
    pageItemClone.addClass('selected');
  }

  const aTagOfPageItem = pageItemClone.find('a');
  aTagOfPageItem.text(getPageNumberAsString(pageNumber));

  return pageItemClone;
}

/**
 * @param {number} pageNumber 
 * @return {string}
 */
function getPageNumberAsString(pageNumber) {
  let pageNumberAsString;

  if (pageNumber === PREVIOUS) {
    pageNumberAsString = 'Previous';
  } else if (pageNumber === NEXT) {
    pageNumberAsString = 'Next';
  } else {
    pageNumberAsString = pageNumber.toString();
  }

  return pageNumberAsString;
}

/**
 * @param {number} selectedPageNumber 
 * @param {number} firstResultNumber 
 * @param {number} lastResultNumber 
 * @param {number} totalResults 
 * @returns {number[]}
 */
function getPageNumbers(
  selectedPageNumber,
  firstResultNumber,
  lastResultNumber,
  totalResults) {

  const pageNumbers = [selectedPageNumber];

  const numberOfPagesBeforeSelected =
    Math.floor((firstResultNumber - 1)) / RESULTS_PER_PAGE;
  const numberOfPagesAfterSelected =
    Math.ceil((totalResults - lastResultNumber) / RESULTS_PER_PAGE);

  for (let i = 1; i <= numberOfPagesBeforeSelected && i <= MAX_PAGE_DISTANCE_FROM_SELECTED; i++) {
    pageNumbers.unshift(selectedPageNumber - i);
  }
  if (numberOfPagesBeforeSelected > 0) {
    pageNumbers.unshift(PREVIOUS);
  }

  for (let i = 1; i <= numberOfPagesAfterSelected && i <= MAX_PAGE_DISTANCE_FROM_SELECTED; i++) {
    pageNumbers.push(selectedPageNumber + i);
  }
  if (numberOfPagesAfterSelected > 0) {
    pageNumbers.push(NEXT);
  }

  return pageNumbers;
}