var expect = require('expect');
var app = require('../build/main.js');

expect (
  app.stateReducer({data:{},currentPath:[],showError:false,textContent:""},{type: "SHOW_ERROR"})
).toIncludeKeys(['data','currentPath','showError','textContent']);