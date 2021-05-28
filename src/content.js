import { WordInfo } from "./chaimet";


let lastSelectedStr;
setInterval(() => {
  let selection = window.getSelection();
  let currentStr = selection.toString();
  if (!currentStr || currentStr === lastSelectedStr) {
    return;
  }
  lastSelectedStr = currentStr;
  // send current selected text 
  chrome.runtime.sendMessage({
    type: 'selectedMsg',
    msg:lastSelectedStr
  })
  console.log(selection.toString());
}, 1000);

chrome.runtime.onMessage.addListener((request,sender,sendMessage)=>{
  if(request.type==='getWordInfo'){
  let wordInfo = request.msg;
  wordInfo.toConsoleLog();
  }
})