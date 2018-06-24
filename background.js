const userId = Math.floor(Math.random()*100000); 
chrome.identity.getProfileUserInfo(function(temp){
    console.log(temp);
});


var data = {
  query: {},
  results: [],
  clickedResults: []
};

/*chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({color: '#3aa757'}, function() {
      console.log("The color is green.");
    });
    chrome.storage.sync.set({Query: []}, function() {
      console.log("Query Set");
    });
    /*chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        chrome.declarativeContent.onPageChanged.addRules([{
          conditions: [new chrome.declarativeContent.PageStateMatcher({
            pageUrl: {urlContains: 'www.google.com/'},
          })
          ],
              actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
      });
  });*/


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
    /*else if (request.type == "searchQuery"){
      var obj = {};
      obj[request.currentPage.toString()] =  request.searchResults;
      console.log(typeof(data.query[request.query.toString()]));
      if(typeof(data.query[request.query.toString()]) == "undefined"){
        data.query[request.query.toString()] = []
        data.query[request.query.toString()].push(obj);
        console.log(data.query[request.query.toString()]);
      }
      else{
        if(data.query[request.query.toString()].indexOf(obj) !== -1) {
          data.query[request.query.toString()].push(obj);
          console.log(data);
        }
      }

      
    }*/
      

    sendResponse();
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  var str = changeInfo.url;
  if(str){
    if(str.startsWith("https://www.bing.com/")){
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {greeting: "Refresh_Bing"}, function(response) {
          console.log('Good');
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