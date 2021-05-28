// const moment = require('moment');
// import axios from 'axios';

// const now = moment();
// (async () => {
//   const res = await axios.get('https://www.google.com/search?q=test');
//   console.log({
//     from: 'background.js',
//     now: now.format('YYYY/MM/DD HH:mm:ss'),
//     data: res.data,
//   })
// })();

// const now = moment();
// (async () => {
//   const res = await axios.get('https://cjjc.weblio.jp/content/%E4%BB%80%E4%B9%88');
//   let doc = new DOMParser().parseFromString(res.data, "text/html");
//   let titleEle = doc.getElementsByClassName('pnyn');
//   let discriptEle = doc.getElementsByClassName('lvlB')
//   console.log(titleEle[0].innerText);
//   let length = discriptEle.length > 3 ? 3 : discriptEle.length;
//   for (let i = 0; i < length; i++) {
//     console.log(discriptEle[i].innerText);
//   }
// })();