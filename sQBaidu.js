console.log('It\'s working')
function onStart(){
    let queries = document.getElementsByClassName('result');
    let search = document.getElementsByClassName('gsfi');
    let multimedia = document.querySelectorAll('.result-op.c-container');
   
    // Because Baidu can't make up it's mind about which 
    // format they want to use for The Input form
    let query;
    try{
        query = document.getElementById('kw').value;
    }
    catch{}
    try{
        query = document.getElementById('new-bdvSearchInput').value;
    }
    catch{}
    //let form = document.getElementById('tsf');
    //let searchForm = document.getElementsByClassName("cdr_frm");
    
    // Because Baidu can't make up it's mind about which 
    // format they want to use for The Current page number
    let cur;
    try{
        cur = parseInt(document.getElementById('page').querySelector('strong').innerText);
    }catch{
        cur = -1
    }
   
    let mediaResults = [];
    console.log(multimedia);

    for(let i = 0; i < multimedia.length; i++){
        let mediaLinks = multimedia[i].getElementsByTagName('a');
        mediaResults.push(mediaLinks[0].href);
        mediaLinks[0].onclick = foo;
    }

    console.log(mediaResults);
        
    let results = [];

    // Because Baidu can't make up it's mind about which 
    // format they want to use for The Media Nav bar
    let tab_index;
    try{
        tab_index = document.getElementsByClassName('s_tab')[0].getElementsByTagName('b')[0].innerText;
    }
    catch{}

    try{
        tab_index = document.getElementById('new-tabsearch').getElementsByTagName('strong')[0].innerText;
    }
    catch{}

    for (var i = 0; i < queries.length; i++) {
        //console.log(queries[i].getElementsByTagName('a')[0].href); //second console output
        queries[i].getElementsByTagName('a')[0].onclick = foo;
        results.push(queries[i].getElementsByTagName('a')[0].href);
    }
    
   if(query){
    chrome.runtime.sendMessage({type: "searchQuery", 
    query: query,
    tab: tab_index,
    engine: 'Baidu',
    timestamp: 0,
    userId : ""
    });
   }
/*{type: "searchQuery", 
    query: document.getElementsByName('wd')[0].value,
    tab: tab_index,
    engine: 'Baidu',
    timestamp: 0,
    userId : ""
    }*/ 
    console.log(results);

    /*
    {type: "ClickedLink", 
        href: ref,
        query: document.getElementsByName('wd')[0].value,
        searchResults: results,
        engine: 'Baidu',
        timestamp: 0,
        currentPage: cur,
        tab: tab_index,
        userId : ""
        }
    */
    function foo (element){
        //alert(this.href);
        var ref = this.href;
        chrome.runtime.sendMessage(
            {type: "ClickedLink", 
            href: ref,
            query: query,
            searchResults: results,
            engine: 'Baidu',
            timestamp: 0,
            currentPage: cur,
            tab: tab_index,
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