/**
 * @author Kyler Butler
 * This is the content script that will run on the bing search engine.
 * 
 */

 /**
  * @function onStart
  * The function, onStart(), is a function that will execute
 * everytime the webpage on the bing is refreshed or the url 
 * changes. This is to ensure that when a user changes their 
 * query the content script will capture and log said event.
 * This structure is similar to how Baidu's content script functions
 * since Bing and Baidu are similar in the design.
  */
function onStart(){
    let lin = document.getElementsByTagName('a');
    for(let i = 0; i < lin.length; i++){
        lin[i].onclick = clickedLink;
    }
    let queries = document.getElementsByClassName('b_algo');
    /**
     * Try and catch for current page identifier. 
     * If the Try trails, cur will be undefined, hence,
     * will not appear in the object sent to the background script.
     * 
     */
    let cur;
    try{
        cur = parseInt(document.querySelector('a.sb_pagS.sb_pagS_bp.sb_bp').textContent);
    }catch{}
    let results = [];
    let tab_index;
    try{ 
        tab_index = document.getElementsByClassName('b_active')[0].innerText;
    }catch{}
    console.log(document.getElementById('sb_form_q').value);
    
    let newsResults = [];
    let news;
    try{
        news = document.getElementById('na_cnt').getElementsByTagName('a');
        for(let i = 0; i < news.length; i++){
            news[i].onclick = clickedLink;
            //if(newsResults.indexOf(news[i].href) == -1){
                newsResults.push(news[i].href);
            //}
           }
    }catch{}
    let videoResults=[];
   let videos;
   try{
       videos = document.getElementsByClassName('vt11b');
       for(let i = 0; i < videos.length; i++){
        videoResults.push(videos[i].href);
       }
   }catch{}
   console.log(videoResults);  

   
   console.log(newsResults);

    for (var i = 0; i < queries.length; i++) {
        let res = queries[i].getElementsByTagName('a')
        //console.log(queries[i].getElementsByTagName('a')[0].href); //second console output
        for(let j = 0; j < res.length; j++){
            res[j].onclick = clickedLink;
            results.push(res[j].href);
        }    
    }

    console.log(results);
    chrome.runtime.sendMessage({type: "searchQuery", 
    query: document.getElementById('sb_form_q').value,
    timestamp: 0,
    searchResults: results,
    currentPage: cur,
    engine: 'Bing',
    tab: tab_index});

    function clickedLink (element){
        //alert(this.href);
        var ref = this.href;
        chrome.runtime.sendMessage({type: "ClickedLink", 
        href: ref,
        query: document.getElementById('sb_form_q').value,
        engine: 'Bing',
        timestamp: 0,
        currentPage: cur,
        tab: tab_index,
        userId : ""
        });
    };
}
onStart(); //To start the script for the first page load.

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      console.log(sender.tab ?
                  "from a content script:" + sender.tab.url :
                  "from the extension");
      if (request.greeting == "Refresh_Bing"){
        onStart();
      }
    });
