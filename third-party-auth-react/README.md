# Getting Started with Third Parth Auth System

# Api Documentation

## 1. React

### a. Call the api with Fetch

You can place all the API calls under services so that these can be reused across components wherever they are needed. You can use Fetch API directly you don’t have to download or install any dependency for it.
Here is the user service using Fetch API. Since these are all the asynchronous calls you should use async/await so that it waits until the promise is resolved

    export async function getAllUsers() {

        try{
            const response = await fetch('/api/users');
            return await response.json();
        }catch(error) {
            return [];
        }

    }

    export async function createUser(data) {
        const response = await fetch(`/api/user`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({user: data})
          })
        return await response.json();
    }

### b. Call the api with axios

You can place all the API calls under services so that these can be reused across components wherever they are needed. You need to install dependency first before you use it in the application. Let’s install Axios API with the following command.
npm install axios
Once it is installed and you need to import it in the services as below.
const axios = require('axios');

const axios = require('axios');
export async function getAllUsers() {
try{
const response = await axios.get('/api/users');
console.log('response ', response)
return response.data;
}catch(error) {
return [];
}
  
 }
export async function createUser(data) {
const response = await axios.post(`/api/user`, {user: data});
return response.data;
}

## 2. Nodejs

HTTP – the Standard Library
First on our hit parade is the default HTTP module in the standard library. With this module, you can just plug and go without having to install external dependencies. The downside is that it isn’t very user friendly compared to other solutions.
The following code will send a GET request to NASA’s API and print out the URL for the astronomy picture of the day as well as an explanation:

    const https = require('https');

    https.get('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY', (resp) => {
    let data = '';

    // A chunk of data has been received.
    resp.on('data', (chunk) => {
    data += chunk;
    });

    // The whole response has been received. Print out the result.
    resp.on('end', () => {
    console.log(JSON.parse(data).explanation);
    });

    }).on("error", (err) => {
    console.log("Error: " + err.message);
    });

Much of the HTTP, and the HTTPS, module’s functionality is fairly low-level. You’re required to receive response data in chunks rather than just providing a callback function to be executed as soon as all of the data is received. You also need to parse the response data manually. This is fairly trivial if it is JSON formatted, but it is still an extra step.
One other problem is that this module does not support HTTPS by default, so we need to require the https module instead if the API we are using communicates over HTTPS.
It may take a bit more effort to get the data you want, but is a great utility if you don’t want to add too many dependencies to your codebase or want access to its low level functionality.
Request is a simplified HTTP client comparable to Python’s requests library. This library is much more user friendly than the default http module and has been considered a go-to for the community for several years.
This has been my personal choice since I’ve started using Node.js, and is great for quickly getting things done. Unlike the http module, you will have to install this one as a dependency from npm.
Run the following in your terminal from the directory you want your code to live in:

    npm install request@2.81.0

You’ll see that you need much less code to accomplish the same task that we did above:

    const request = require('request');

    request('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY', { json: true }, (err, res, body) => {
    if (err) { return console.log(err); }
    console.log(body.url);
    console.log(body.explanation);
    });

Request is a fantastic option if you just want an easy to use library that deals with HTTP requests in a sane way. If you want to use Promises, you can check out the request-promise library.
Axios
Axios is a Promise based HTTP client for the browser as well as node.js. Using Promises is a great advantage when dealing with code that requires a more complicated chain of events. Writing asynchronous code can get confusing, and Promises are one of several solutions to this problem. They are even useful in other languages such as Swift.
To install Axios from npm, enter the following command in your terminal:

    npm install axios@0.21.1

The following code will accomplish the same task of logging the URL to and of explaining the astronomy picture of the day:

    const axios = require('axios');

    axios.get('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY')
    .then(response => {
    console.log(response.data.url);
    console.log(response.data.explanation);
    })
    .catch(error => {
    console.log(error);
    });

Axios even parses JSON responses by default. Pretty convenient! You can also see that error handling is done with .catch() since we are using promises now.
You can even make multiple concurrent requests with axios.all if you wanted to do something like get the astronomy picture of two different days at once:

    var axios = require('axios');

    axios.all([
    axios.get('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=2017-08-03'),
    axios.get('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=2017-08-02')
    ]).then(axios.spread((response1, response2) => {
    console.log(response1.data.url);
    console.log(response2.data.url);
    })).catch(error => {
    console.log(error);
    });

Asynchronous code can easily become over complicated and unpleasant to deal with, and the way Axios tackles this problem may make your life easier in the long run.
SuperAgent
Similarly to Axios, SuperAgent is another popular library primarily used for making AJAX requests in the browser but works in Node.js as well. Install SuperAgent with the following command:

    npm install superagent@6.1.0

What is cool about SuperAgent is that you have other useful functions that you can chain onto requests such as query() to add parameters to the request. We’ve been just manually adding them in the URL in the previous examples, but notice how SuperAgent gives you a function to do this:

    const superagent = require('superagent');

    superagent.get('https://api.nasa.gov/planetary/apod')
    .query({ api_key: 'DEMO_KEY', date: '2017-08-02' })
    .end((err, res) => {
    if (err) { return console.log(err); }
    console.log(res.body.url);
    console.log(res.body.explanation);
    });

Just like with Axios you don’t have to parse the JSON response yourself, which is pretty cool.
Got
Got is another choice if you want a more lightweight library. It is also available to use in Twilio Functions.
Again, install Got with npm:

    npm install got@7.1.0

Similarly to Axios, Got works with Promises as well. The following code will work as the rest of the examples do:

    const got = require('got');

    got('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY', { json: true }).then(response => {
    console.log(response.body.url);
    console.log(response.body.explanation);
    }).catch(error => {
    console.log(error.response.body);
    });

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
