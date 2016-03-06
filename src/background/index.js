import _ from 'lodash';
import uuid from 'uuid';

const vnexpressRegex = /xvideos\.com/g;

chrome.history.onVisited.addListener(function (result) {
    var isNotPass = vnexpressRegex.test(result.url);
    console.warn('History_onVisited',result.url, isNotPass);
});

chrome.history.onVisitRemoved.addListener(function(obj){
    console.warn('History_onRemoved',obj.urls);
    chrome.history.search({}, function(results){

    })
});

function onWebNav(details) {
    console.log(details);
    if(details.frameId === 0){
        chrome.runtime.sendMessage({action : 'removeHistory', url : details.url});
    }
}
var filter = {
    url: [{
        originAndPathMatches : 'vnexpress|dantri.com.vn|news.zing.vn|xvideos'
    }]
};
chrome.webNavigation.onBeforeNavigate.addListener(onWebNav, filter);
chrome.webNavigation.onCommitted.addListener(onWebNav, filter);
chrome.webNavigation.onDOMContentLoaded.addListener(onWebNav, filter);
chrome.webNavigation.onCompleted.addListener(onWebNav, filter);

chrome.runtime.onMessage.addListener(function(msg, sender){
    if(msg.action === 'removeHistory'){
        chrome.history.deleteUrl({url: msg.url}, function () {
            console.log('removed history ', msg.url);
        });
        let replaceHistoryUrl = 'https://twitter.com/?hash=' + uuid();
        chrome.history.addUrl({url: replaceHistoryUrl}, function () {
            console.info("replace " + msg.url + " by " + replaceHistoryUrl);
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
