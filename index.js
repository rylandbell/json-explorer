#!/usr/bin/env node
"use strict";

const fs = require('fs'),
  through = require('through2'),
  open = require('open'),
  trumpet = require('trumpet'),
  program = require('commander'),
  jsStringEscape = require('js-string-escape');

fs.readFile(process.argv[2], processData);

//will receive readable stream from fs.readFile
function processData(err, data) {
  if (err) {
    console.log('error found: ', err);
  } else {
    const fileContents = checkForValidJson(data.toString());
    // console.log(fileContents);
    createPageWithData(fileContents, true);
  }

  //abort the process and display an error msg if the provided user data isn't valid JSON
  function checkForValidJson(string) {
    try {
      // const condensedString = JSON.stringify(JSON.parse(string));
      JSON.parse(string);
      const escapedString = jsStringEscape(string);
      return escapedString;
    } catch (err) {
      if (err instanceof SyntaxError) {
        console.log('Error: not a valid JSON string. ', err.message);
      } else {
        console.log('Unexpected error.');
        console.error(err);
      }
      process.exit();
    }
  }
}

function createPageWithData(userData, openPage) {
  const tr = trumpet();
  
  //add code defining a variable to a blank script in source HTML file.
  tr.select('#preload-data')
    .createWriteStream()
    .end(`var preloadedUserData = '${userData}'`);

  const writeTempFile = fs.createWriteStream(__dirname + '/temp.html');

  fs.createReadStream(__dirname + '/index.html')
    .pipe(tr)
    .pipe(writeTempFile)
    .on('finish', () => openPage ? open('temp.html','google chrome') : console.log('all done!'))
}