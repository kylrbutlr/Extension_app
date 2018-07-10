/**
 * @author Kyler Butler
 * This is the content script that will run on the Baidu search engine.
 * 
 */

 /**
  * @function onStart
  * The function, onStart(), is a function that will execute
 * everytime the webpage on the Baidu is refreshed or the url 
 * changes. This is to ensure that when a user changes their 
 * query the content script will capture and log said event.
 * This structure is similar to how Baidu's content script functions
 * since Baidu and Bing are similar in the design.
  */
function onStart(){
    let lin = document.getElementsByTagName('a'); //This contains all the links in the webpage.
     //This sets the onclick event to the clickedLink function of all links of the webpage.
    for(let i = 0; i < lin.length; i++){
        lin[i].onclick = clickedLink;
    }
    let finalResults = []; //Array that contains all the links of the search results in order
    let finalLinks = document.querySelectorAll(".c-container, #rs"); 
    let rankCount = finalLinks.length;
    //NOTE: Get Rank Count to aid mutiple page queries.
    for(let i=0; i < rankCount; i++){
        let tempRes = finalLinks[i].getElementsByTagName('a');
        for(let j = 0; j < tempRes.length; j++){
            tempRes[j].Rank = i+1;
            finalResults.push(tempRes[j].href);
        }
    }
    //Adding Baidu MediaBlock to end for consistency of other search engine
    let mediaBlock = document.querySelectorAll("#content_right");
    for(let i = 0; i < mediaBlock.length; i++){
        let tempRes = mediaBlock[i].getElementsByTagName('a');
        rankCount++;
        for(let j = 0; j < tempRes.length; j++){
            tempRes[j].Rank = rankCount;
            finalResults.push(tempRes[j].href);
        }
    }
    console.log(finalResults);
    /**
     * This section may be refactored and changed since many 
     * of these elements are already covered by previous code.
     */
    let queries = document.getElementsByClassName('result'); 
    //let search = document.getElementsByClassName('gsfi');
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
    
    // Because Baidu can't make up it's mind about which 
    // format they want to use for The Current page number
    let cur;
    try{
        cur = parseInt(document.getElementById('page').querySelector('strong').innerText);
    }catch{}
        
    let results = []; //Array that contains all the search results.

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
        queries[i].getElementsByTagName('a')[0].onclick = clickedLink;
        results.push(queries[i].getElementsByTagName('a')[0].href);
    }
    
   /**
    * This is to help with the weird formatting issues that Baidu 
    * seems to love. If the query field is undefined then the message 
    * won't be sent to the background script otherwise it will.
    */ 
   if(query){
    chrome.runtime.sendMessage({type: "searchQuery", 
    query: query,
    tab: tab_index,
    searchResults: results,
    engine: 'Baidu',
    timestamp: 0,
    userId : ""
    });
   }

    console.log(results);

    function clickedLink (element){
        //alert(this.href);
        var ref = this.href;
        chrome.runtime.sendMessage(
            {type: "ClickedLink", 
            href: ref,
            query: query,
            engine: 'Baidu',
            timestamp: 0,
            rank: this.Rank,
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