# book-finder
Search for books using Google's Books API. Check it out at https://book-finder-1.herokuapp.com/ (you may have to wait a minute for it to start up because Heroku's free plan will sleep unused websites).

## How to run locally
You'll need to install [git](https://git-scm.com/downloads) and [npm](https://www.npmjs.com/get-npm).
1. Run `git clone https://github.com/keyserj/book-finder.git`
2. Run `npm install` in the cloned directory (if you get an error with finding a package, try deleting the package-lock.json and running install again)
3. Follow steps on [Google's Usage Guide](https://developers.google.com/books/docs/v1/using#APIKey) to get your own API key.
4. In your cloned repository, find env.json.example in book-finder/server/config-variables/, make a copy of it in the same directory, rename it env.json, and add your API key to it where specified.
5. Run `npm start`. You should be able to reach the site at http://localhost:8080/.
6. Ctrl+C to quit!

You can also run tests with `npm test`.

## Tools used
* HTML, CSS, and JavaScript for page structure, style, and interactivity
* [Bootstrap](https://getbootstrap.com/) for useful stylings and components
* [Node.js](https://nodejs.org/en/) with [Express](https://expressjs.com/) for serving up the page to clients, and for handling requests to Google's Books API
* [Heroku](https://www.heroku.com/home) for hosting the Node.js server
* [Visual Studio Code](https://code.visualstudio.com/) as an editor (debug settings checked into repo)
* [webpack](https://webpack.js.org/) to bundle .js files (both server and client side, but separate)
* [Babel](https://babeljs.io/) (combined with webpack's bundle process) to transpile ES6 javascript into ES5 for the server and client to run
* [ESLint](https://eslint.org/) for .js formatting standards (with [Prettier](https://prettier.io/docs/en/eslint.html))
* [stylelint](https://stylelint.io/) for .css formatting standards
* [checkJs](https://code.visualstudio.com/docs/languages/javascript#_type-checking) for providing compile-time errors with types
* [Jest](https://jestjs.io/) for automated testing
* [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) for locally hosting the application during interface development; it watches for file changes and will automatically reload
* [Auto Close Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-close-tag), [Auto Rename Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-rename-tag), [Better Comment](https://marketplace.visualstudio.com/items?itemName=Gruntfuggly.bettercomment), and [HTML CSS Support](https://marketplace.visualstudio.com/items?itemName=ecmel.vscode-html-css) for useful HTML/CSS editing

## Approach/Reflection

### Research
* Identified three major pieces of the project: making the user interface, getting that hosted with Heroku, and querying Google's Books API while keeping the API key hidden
* Researched major tooling, decided against using React and also against SASS for the extra time it would've taken to learn them. Having had to use Babel anyway, I think I would have been better off using SASS, but what can ya do. I'm not sure how using React would've gone - it does seem like it has a big learning curve, but it's so popular and I noticed during Googling my issues that a lot of solutions were for usage with React in particular. So perhaps there would've been enough guidance, but it's hard to say.
* Read up on usage of the Books API, mainly to determine what info the interface needs to request from the user and display back
* Sketched up a basic interface design
* Investigated tooling for web development in Visual Studio Code

### Development
**Developing the interface**

* I started with the interface because it seemed like a good way to get solidified whatever backend features would need to be implemented. 
* I used examples from Bootstrap's repository as references to find good-looking stylings to use, and in doing so, I found their repository's directory structure to be a good starting point for my directory structure.
* As I got into writing the JavaScript, I realized that I needed to bundle my .js files if I wanted to use ES6 syntax, so I found webpack and Babel to do just that. A side-benefit of that is that bundling is actually good for keeping file sizes small on the client side, and my HTML only needed to reference one .js.

**Hosting on Heroku**

* This was actually a lot easier than I expected. The only issue I ran into at the start was that some packages weren't being found. That's because my package.json had some packages listed under dev dependencies that really should have been under dependencies (dependencies - needed to run the server code, e.g. webpack, Babel, express; dev dependencies - only needed for development, e.g. linters, Jest).
* I did run into an issue later with getting Heroku to use the API key; in my webpack config files, I needed to conditionally set the mode to production/development based on the value of the NODE_ENV environment variable ***in addition*** to conditionally accessing a configuration file (production.js to reference the API key from the environment variable for Heroku, development.js to reference the key from a file not being checked in, env.json).

**Querying the API**

* Since hosting on Heroku was easier than expected, interacting with the API had to be harder in order for balance to remain. Unfortunately, I didn't think to consider that I needed a back-end server for this application. But that was the only good way that I found for keeping the API key out of the client. Luckily, Node.js and Express were on my side! Except, I also had to bundle the back-end .js code separately in order to use ES6 (at least the export/import keywords... Node does support more than just ES5).
* I spent a decent chunk of time figuring out how to parse the Books API response. It's a good thing I separated out the parsing of an expected JSON response, because otherwise it probably would've been harder to pinpoint. I knew that the issue was specifically with getting to the JSON from the response.
* Once I had the response parsed, it was only a matter of sending it back to the client and having the client properly parse that.

Deploying after getting the API settled is when I ran into that second Heroku issue. But besides that, smooth sailing! I.e., writing up the README. I had fun with this project and as you can see I learned a ton.
