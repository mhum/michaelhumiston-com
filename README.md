# MichaelHumiston.com
This repository contains the code for my personal website [https://michaelhumiston.com](https://michaelhumiston.com) and all the tools to build and deploy it.

## How It Works
It is a single-page web application written using [React](https://facebook.github.io/react) for the front-end and a [Node.js](https://nodejs.org/en/) server on the back-end using [Koa](https://koajs.com/). It also does server-side rendering when initially loading the site. This is based on [Create React SSR App](https://github.com/trustworktech/create-react-ssr-app).

## Requirements
[Node.js](https://nodejs.org/en) and [Yarn](https://yarnpkg.com/) need to be installed locally to download the dependencies, run the development server, and build the production assets.

## Developing
Run `yarn start` to start the development server. It will automatically reload the server when any server changes are made and hot reload the client when any client changes are made.

## Building
Run `yarn build` to build the client and server. A `build` folder will be created with folders for the client and server code. These folders can then be deployed.
