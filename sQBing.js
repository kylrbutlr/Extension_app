function onStart(){
    let queries = document.getElementsByClassName('b_algo');
    let search = document.getElementsByClassName('gsfi');
    //let form = document.getElementById('tsf');
    //let searchForm = document.getElementsByClassName("cdr_frm");
    let cur;
    if(document.querySelector('a.sb_pagS.sb_pagS_bp.sb_bp'))
        cur = parseInt(document.querySelector('a.sb_pagS.sb_pagS_bp.sb_bp').textContent);
    else
        cur = -1
    let results = [];
    let tab_index = document.getElementsByClassName('b_active')[0].innerText;
    console.log(document.getElementById('sb_form_q').value);
    // query for Bing document.getElementById('sb_form_q').value;

    //.innerText will get the hyperlink out
    let newsResults = [];
    let news = document.getElementById('na_cnt').getElementsByTagName('a');


   for(let i = 0; i < news.length; i++){
    news[i].onclick = foo;
    //if(newsResults.indexOf(news[i].href) == -1){
        newsResults.push(news[i].href);
    //}
        
   }
   console.log(newsResults);

    for (var i = 0; i < queries.length; i++) {
        let res = queries[i].getElementsByTagName('a')
        //console.log(queries[i].getElementsByTagName('a')[0].href); //second console output
        for(let j = 0; j < res.length; j++){
            res[j].onclick = foo;
            results.push(res[j].href);
        }    
    }

    console.log(results);
    chrome.runtime.sendMessage({type: "searchQuery", 
    query: document.getElementById('sb_form_q').value,
    timestamp: 0,
    engine: 'Bing',
    tab: tab_index});

    function foo (element){
        //alert(this.href);
        var ref = this.href;
        chrome.runtime.sendMessage({type: "ClickedLink", 
        href: ref,
        query: document.getElementById('sb_form_q').value,
        searchResults: results,
        engine: 'Bing',
        timestamp: 0,
        currentPage: cur,
        tab: tab_index,
        userId : ""
        });
    };
}
onStart();
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      console.log(sender.tab ?
                  "from a content script:" + sender.tab.url :
                  "from the extension");
      if (request.greeting == "Refresh_Bing"){
        onStart();
      }
    });

  

//XMLHttpRequest.onreadystatechange = function () { alert('please');};
//document.onreadystatechange = function () { alert('please');};
//code to send message to open notification. This will eventually move into my extension logic
