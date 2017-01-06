# MichaelHumiston.com
This repository contains the code for my personal website [https://michaelhumiston.com](https://michaelhumiston.com)
and all the tools to build and deploy it (except for the images).

## How It Works
It is a single-page web application written using [React](https://facebook.github.io/react) for the front-end and a [Node.js](https://nodejs.org/en/) server on the back-end using [Hapi.js](https://hapijs.com/). The code can be built into a ready to deploy format using [Gulp](http://gulpjs.com) tasks.

## Requirements
[Node.js](https://nodejs.org/en) and [Yarn](https://yarnpkg.com/) need to be installed locally to download the dependencies and run the Gulp tasks.

## Developing
The client and server components are separated and can be built and ran individually.

The dependencies from the client and server must be installed individually. Run `yarn` in the root, client, and server directories to install all the necessary dependencies.

Development can be done by running `yarn start-dev` in the root directory which will start [webpack-dev-server](https://webpack.github.io/docs/webpack-dev-server.html) for the client and [Nodemon](https://nodemon.io/) for the server. Changes in the code will be picked up automatically: the client will hot reload components and the server will restart itself.

## Testing
The only current tests are linting with [ESLint](http://eslint.org/). Run `yarn test` to run the linting (and automated tests in the future).

## Building
Run `yarn build` to build the client and server. A `dist` folder will be created with folders for the client and server code. These folders can then be deployed.
