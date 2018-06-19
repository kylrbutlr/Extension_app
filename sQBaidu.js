function onStart(){
    let queries = document.getElementsByClassName('result');
    let search = document.getElementsByClassName('gsfi');
    //let form = document.getElementById('tsf');
    //let searchForm = document.getElementsByClassName("cdr_frm");
    let cur = parseInt(document.getElementById('page').querySelector('strong').innerText);
    let results = [];
    
    //.innerText will get the hyperlink out
    for (var i = 0; i < queries.length; i++) {
        //console.log(queries[i].getElementsByTagName('a')[0].href); //second console output
        queries[i].getElementsByTagName('a')[0].onclick = foo;
        results.push(queries[i].getElementsByTagName('a')[0].href);
    }
    chrome.runtime.sendMessage({type: "searchQuery", 
    query: document.getElementsByName('wd')[0].value,
    timestamp: 0});

    console.log(results);

    function foo (element){
        //alert(this.href);
        var ref = this.href;
        chrome.runtime.sendMessage({type: "ClickedLink", 
        href: ref,
        query: document.getElementsByName('wd')[0].value,
        searchResults: results,
        engine: 'Baidu',
        timestamp: 0,
        currentPage: cur,
        userId : ""
        });

    };


    //code to send message to open notification. This will eventually move into my extension logic

}
onStart();
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      console.log(sender.tab ?
                  "from a content script:" + sender.tab.url :
                  "from the extension");
      if (request.greeting == "Refresh_Baidu"){
        onStart();
      }
    });