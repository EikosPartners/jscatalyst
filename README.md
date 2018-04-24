# jscatalyst

> A Vue.js project

##To run project and server without authentication
npm start

##To run project and server with authentication
Make sure the auth plugin is added to the application in src > main.js
npm run auth

##To run tests
npm run test

##To run inside docker without authentication
You must have Docker installed and running locally on your machine
npm run docker

##To run inside docker with authentication
Make sure the auth plugin is added to the application in src > main.js
Go to the Dockerfile and comment out CMD ["npm", "run", "dock_start"]
Then comment in CMD ["npm", "run", "dock_start_auth"]
Save the file then run

npm run docker

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev
npm start

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test

# run in openfin (must have npm start / npm run dev running in another shell)
npm run fin

```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

##Developer Notes
