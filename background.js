const userId = Math.floor(Math.random()*100000); 
chrome.identity.getProfileUserInfo(function(temp){
    console.log(temp);
});


var data = {
  query: {},
  results: [],
  clickedResults: []
};

chrome.runtime.onInstalled.addListener(function() {
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
      });*/
  });

chrome.tabs.onRemoved.addListener(function (tabId, selectInfo){
  console.log(selectInfo);
});
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.type == "ClickedLink"){
      var date = new Date();
      var timestamp = date.getTime();
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