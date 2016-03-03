import _ from 'lodash';

const vnexpressRegex = /vnexpress\.net/g;
const replaceHistoryUrl = 'https://twitter.com/mariaozawaav'

chrome.history.onVisited.addListener(function(result){
  if(vnexpressRegex.test(result.url)){
   chrome.history.deleteUrl({url : result.url},function(){
    console.log('removed history ', result.url);
   });
   chrome.history.addUrl({url : replaceHistoryUrl},function(){
    console.info("replace " + result.url + " by " + replaceHistoryUrl);
   });
  }
})

// Setting popup icon

// When we defined browser_action
/*if(chrome.browserAction) {
 chrome.browserAction.setIcon({
 path: require("icons/webpack-38.png")
 })

 // When we defined page_action
 } else if(chrome.pageAction) {

 const showPageAction = function(tabId) {
 chrome.pageAction.show(tabId);

 chrome.pageAction.setIcon({
 path: require("icons/webpack-38.png"),
 tabId: tabId
 })
 }

 // Show page action on each page update
 chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
 showPageAction(tabId)
 });
 }*/
