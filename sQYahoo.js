let queries = document.getElementsByClassName('ac-algo');
let search = document.getElementsByClassName('gsfi');
//let form = document.getElementById('tsf');
//let searchForm = document.getElementsByClassName("cdr_frm");
let cur = parseInt(document.getElementsByClassName('compPagination')[0].getElementsByTagName('strong')[0].textContent);
let results = [];
//console.log(document.getElementById('yschsp').value);
// query for Bing document.getElementById('sb_form_q').value;

//.innerText will get the hyperlink out

for (var i = 0; i < queries.length; i++) {
    //console.log(queries[i].getElementsByTagName('a')[0].href); //second console output
    queries[i].onclick = foo;
    results.push(queries[i].href);
}
chrome.runtime.sendMessage({type: "searchQuery", 
query: document.getElementById('yschsp').value,
timestamp: 0});

function foo (element){
    //alert(this.href);
    var ref = this.href;
    chrome.runtime.sendMessage({type: "ClickedLink", 
    href: ref,
    query: document.getElementById('yschsp').value,
    searchResults: results,
    engine: 'Yahoo',
    timestamp: 0,
    currentPage: cur,
    userId : ""
    });
};


//code to send message to open notification. This will eventually move into my extension logic
