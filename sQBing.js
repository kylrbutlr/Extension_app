let queries = document.getElementsByClassName('b_algo');
let search = document.getElementsByClassName('gsfi');
//let form = document.getElementById('tsf');
//let searchForm = document.getElementsByClassName("cdr_frm");
let cur = parseInt(document.querySelector('a.sb_pagS.sb_pagS_bp.sb_bp').textContent);
let results = [];
console.log(document.getElementById('sb_form_q').value);
// query for Bing document.getElementById('sb_form_q').value;

//.innerText will get the hyperlink out

function SearchesSomething(event){
    console.log(event);
    alert(hello);
}
for (var i = 0; i < queries.length; i++) {
    //console.log(queries[i].getElementsByTagName('a')[0].href); //second console output
    queries[i].getElementsByTagName('a')[0].onclick = foo;
    results.push(queries[i].getElementsByTagName('a')[0].href);
}
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


//code to send message to open notification. This will eventually move into my extension logic
