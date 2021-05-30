// const moment = require('moment');
import axios from 'axios';
import {WordInfo} from './chaimet.js'

let fromTabId = -1;
const baseUrl = "https://cjjc.weblio.jp/content/";
chrome.runtime.onMessage.addListener((request,sender,sendMessage)=>{
  fromTabId = sender.tab.id;
  if(request.type==='selectedMsg'){
  let word = encodeURI(request.msg);
  axios.get(baseUrl + word)
  .then((res) => {
    let doc = new DOMParser().parseFromString(res.data, "text/html");
    let titleEle = doc.getElementsByClassName('pnyn');
    let descriptionEle = doc.getElementsByClassName('level0')
    let wordInfo = new WordInfo('',titleEle,descriptionEle);
    chrome.tabs.sendMessage(fromTabId, {
        type: 'getWordInfo',
        msg:wordInfo
    });

    // すべてのタブを取得して何かしらの操作をする
    //chrome.tabs.getAllInWindow(null, afterGetAllTabs);
  })
  .catch((error) => {
    console.log('ERROR!! occurred in Backend.')
  });
  }
})

const urlPtn = '';
function afterGetAllTabs(tabs){
  let hasTab = false;
  Object.keys(tabs).forEach((key) => {
    let cur = tabs[key]
    if (urlPtn == cur.url) {
      hasTab = true;
      // ここで該当するタブをアクティブにする。タブIDが必要となる。
      chrome.tabs.update(cur.id, { selected : true});
      chrome.tabs.sendMessage(cur.id, wordInfo);
    } else{
      cur.active = false;
    }
  });
  // タブが見つからなかった時の処理
  if(hasTab == false && formTabId != -1){
  }
}