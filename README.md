# book-finder
Search for books using Google's Books API. Check it out at https://book-finder-1.herokuapp.com/.

## How to run locally
You'll need to install [git](https://git-scm.com/downloads) and [npm](https://www.npmjs.com/get-npm).
1. Run `git clone https://github.com/keyserj/book-finder.git`
2. Run `npm install`
3. Follow steps on [Google's Usage Guide](https://developers.google.com/books/docs/v1/using#APIKey) to get your own API key.
4. In your cloned repository, find env.json.example in book-finder/server/config-variables/, make a copy of it in the same directory, rename it env.json, and add your API key to it where specified.
5. Run `npm start`. You should be able to reach the site at http://localhost:8080/.
6. Ctrl+C to quit!

You can also run tests with `npm test`.

## Tools used
* HTML, CSS, and JavaScript for page structure, style, and interactivity
* [Node.js](https://nodejs.org/en/) with [Express](https://expressjs.com/) for serving up the page to clients, and for handling requests to Google's Books API
* [Heroku](https://www.heroku.com/home) for hosting the Node.js server
* [Visual Studio Code](https://code.visualstudio.com/) as an editor (debug settings checked into repo)
* [webpack](https://webpack.js.org/) to bundle .js files (both server and client side, but separate)
* [Babel](https://babeljs.io/) (combined with webpack's bundle process) to transpile ES6 javascript into ES5 for the server and client to run
* [ESLint](https://eslint.org/) for .js formatting standards
* [stylelint](https://stylelint.io/) for .css formatting standards
* [checkJs](https://code.visualstudio.com/docs/languages/javascript#_type-checking) for providing compile-time errors with types
* [Jest](https://jestjs.io/) for automated testing
