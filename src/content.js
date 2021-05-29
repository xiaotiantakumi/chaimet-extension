import { WordInfo } from "./chaimet";


let lastSelectedStr;
let selection = null;
let doc = window.document;
let markerTextChar = "\ufeff";
let selectionEl;
let markerEl, markerId = "sel_" + new Date().getTime() + "_" + Math.random().toString().substr(2);

setInterval(() =>{
  selection = window.getSelection();
  let currentStr = selection.toString();
  if (!currentStr) {
    return;
  }
  if (currentStr === lastSelectedStr) {
    return;
  }
  lastSelectedStr = currentStr;
  // send current selected text 
  chrome.runtime.sendMessage({
    type: 'selectedMsg',
    msg: lastSelectedStr
  })
  console.log(selection.toString());
}, 1000);

chrome.runtime.onMessage.addListener((request, sender, sendMessage) => {
  if (request.type === 'getWordInfo') {
    let wordInfo = request.msg;

    let range = selection.getRangeAt(0).cloneRange();
    range.collapse(false);
    // Create the marker element containing a single invisible character using DOM methods and insert it
    markerEl = doc.createElement("span");
    markerEl.id = markerId;
    markerEl.appendChild(doc.createTextNode(markerTextChar));
    range.insertNode(markerEl);
    if (markerEl) {
      // Lazily create element to be placed next to the selection
      if (!selectionEl) {
        selectionEl = doc.createElement("div");
        selectionEl.style.border = "solid darkblue 1px";
        selectionEl.style.backgroundColor = "lightgoldenrodyellow";
        selectionEl.style.position = "absolute";
        selectionEl.style.zIndex = 100;
        doc.body.appendChild(selectionEl);
      }
      if (!wordInfo.pinyin) {
        return;
      }
      let str = '';
      str += wordInfo.pinyin + '</br>';
      str +=  wordInfo.Description;
      selectionEl.innerHTML = str;
      // Find markerEl position http://www.quirksmode.org/js/findpos.html
      let obj = markerEl;
      let left = 0, top = 0;
      do {
        left += obj.offsetLeft;
        top += obj.offsetTop;
      } while (obj = obj.offsetParent);

      left += 5;
      top += 5;
      selectionEl.style.left = left + "px";
      selectionEl.style.top = top + "px";

      markerEl.parentNode.removeChild(markerEl);
    }
  }
})