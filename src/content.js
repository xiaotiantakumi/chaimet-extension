// // import 'core-js';  // NOTE: babel で useBuiltIns: 'entry' にする場合に必要
// const moment = require('moment');
// import axios from 'axios';


let lastSelectedStr;
setInterval(() => {
  let selection = window.getSelection();
  let currentStr = selection.toString();
  if (!currentStr || currentStr === lastSelectedStr) {
    return;
  }
  lastSelectedStr = currentStr;
  console.log(selection.toString());
}, 1000);