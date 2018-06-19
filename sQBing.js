function onStart(){
    let queries = document.getElementsByClassName('b_algo');
    let search = document.getElementsByClassName('gsfi');
    //let form = document.getElementById('tsf');
    //let searchForm = document.getElementsByClassName("cdr_frm");
    let cur = parseInt(document.querySelector('a.sb_pagS.sb_pagS_bp.sb_bp').textContent);
    let results = [];
    console.log(document.getElementById('sb_form_q').value);
    // query for Bing document.getElementById('sb_form_q').value;

    //.innerText will get the hyperlink out
    window.onhashchange = function(){
        alert('Mmmmm');
    }
    function SearchesSomething(event){
        console.log(event);
        alert(hello);
    }
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
    timestamp: 0});

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
