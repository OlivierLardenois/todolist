# Todolist

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.7.3.

## Prerequisites

* [MongoDB](https://docs.mongodb.com/manual/installation/)
* [Nodejs](https://nodejs.org)
* [Angluar CLI](https://github.com/angular/angular-cli)

## Installation

Build angular app from todolist dir : 
- `ng build`

Run mongoDB :
- `sudo service mongod start` on Linux.
- `mongod.exe` on Windows.

Start the API from api folder :
- `npm start`

Get & Run [http-server](https://github.com/indexzero/http-server) :
- `npm install -g http-server`
- `http-server -p 4200 -c-1 ./dist`

Navigate to `http://localhost:4200/`

## Test

Install [Mocha](https://github.com/mochajs/mocha) :
- `npm install -g mocha`

Run API in test mode :
- `npm test`

Then run mocha in another prompt from api dir :
- `mocha`