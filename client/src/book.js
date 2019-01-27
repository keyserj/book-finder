export default class Book {

  /**
   * @param {string} title 
   * @param {string[]} authors 
   * @param {string} publisher 
   * @param {string} coverUrl 
   * @param {string} detailsUrl 
   */
  constructor(title, authors, publisher, coverUrl, detailsUrl) {
    this.title = title;
    this.authors = authors.join(', ');
    this.publisher = publisher;
    this.coverUrl = coverUrl;
    this.detailsUrl = detailsUrl;
  }

}