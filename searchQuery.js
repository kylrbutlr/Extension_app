let queries = document.getElementsByClassName('r');
let search = document.getElementsByClassName('gsfi');
let form = document.getElementById('tsf');
let searchForm = document.getElementsByClassName("cdr_frm");
let cur = parseInt(document.querySelector('td.cur').textContent);
let results = [];

//document.body.style.setProperty("-webkit-transform", "rotate(-180deg)", null);

//alert(cur);
//console.log(google.PDb["[[Scopes]]"]["0"].s_b.s_1ga.Ka["[[Entries]]"][2].value);
//alert(searchForm[0][0].value);



//form.onSubmit = SearchesSomething;
//console.dir(searchForm);
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
query: searchForm[0][0].value,
searchResults: results,
currentPage: cur});

function foo (element){
    //alert(this.href);
    var ref = this.href;
    chrome.runtime.sendMessage({type: "ClickedLink", href: ref});
    //alert(ref);
   /* chrome.storage.sync.get('Query', function(data) {
        console.log(data.Query);
        data.Query.push(this.href);
            chrome.storage.sync.set({Query: data.Query}, function() {
                console.log(data.Query);
                alert(ref);
              });
        })*/
};


//code to send message to open notification. This will eventually move into my extension logic
