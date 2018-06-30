
/**@author Kyler Butler
 * This is the user id that associates the session with the a user.
 * Once the user closes the browser and later opens a new window the 
 * id will reset. 
 */

const userId = Math.floor(Math.random()*100000); 

/**
 * This is the message listener that will handle the messages sent from one of the 
 * many content scripts. The infomation from the messages will be the user data that
 * will be logged to the cloud. 
 */

  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    var date = new Date();
      var timestamp = date.getTime();
    if (request.type == "ClickedLink"){
      request.timestamp = timestamp;
      request.userId = userId;
      console.log(request);
    }
    else if (request.type == "searchQuery"){
      request.timestamp = timestamp;
      request.userId = userId;
      console.log(request);
    }
    
    sendResponse();
});

/**
 * This section deals with an odd design choice that would require 
 * a lot of time and research to adapt the extension to work around 
 * said design choice.
 */

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  var str = changeInfo.url;
  if(str){
    if(str.startsWith("https://www.bing.com/")){
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {greeting: "Refresh_Bing"}, function(response) {
        });
      });
    }
    else if(str.includes(".baidu.com/")){
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {greeting: "Refresh_Baidu"});
      });
    }
  }
});