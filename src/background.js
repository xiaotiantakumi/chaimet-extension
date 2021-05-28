// const moment = require('moment');
import axios from 'axios';
import {WordInfo} from './chaimet.js'

const baseUrl = "https://cjjc.weblio.jp/content/";
chrome.runtime.onMessage.addListener((request,sender,sendMessage)=>{
  if(request.type==='selectedMsg'){
  let word = encodeURI(request.msg);
  axios.get(baseUrl + word)
  .then((res) => {
    let doc = new DOMParser().parseFromString(res.data, "text/html");
    let titleEle = doc.getElementsByClassName('pnyn');
    let descriptionEle = doc.getElementsByClassName('lvlB')
    let wordInfo = new WordInfo('',titleEle,descriptionEle);
    // chrome.runtime.sendMessage({
    //   type: 'getWordInfo',
    //   msg:wordInfo
    // })
  })
  .catch((error) => {
    console.log('ERROR!! occurred in Backend.')
  });
  }
})