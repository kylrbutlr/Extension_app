let queries = document.getElementsByClassName('r');
let tab_index = document.getElementsByClassName('hdtb-msel')[0].innerText;
let search = document.getElementsByClassName('gsfi');
let form = document.getElementById('tsf');
let searchForm = document.getElementsByName("q");


chrome.runtime.sendMessage({type: "searchQuery", 
query: searchForm[0].value,
tab: tab_index,
engine: 'Google',
timestamp: 0,
userId : ""
});


let results = [];
let vid_results = [];
let news_results = [];
let vids = document.getElementsByClassName('P94G9b');
let top_stories = document.getElementsByClassName("VoEfsd");
let cur = parseInt(document.querySelector('td.cur').textContent);

for(let i = 0; i < vids.length; i++){
    vid_results.push(vids[i].getElementsByTagName('a')[0].href);
    vids[i].getElementsByTagName('a')[0].onclick = yell;
}
for(let i = 0; i < top_stories.length; i++){
    let item = top_stories[i].getElementsByTagName('a')[0];
    if(vid_results.indexOf(item.href) == -1){
            news_results.push(item.href);
            item.onclick = yell;

    }
}
console.log(news_results);

//form.onSubmit = SearchesSomething;
//console.dir(searchForm);
//.innerText will get the hyperlink out
function SearchesSomething(event){
    console.log(event);
    alert(hello);
}
for (var i = 0; i < queries.length; i++) {
    let res = queries[i].getElementsByTagName('a')[0]
    //console.log(queries[i].getElementsByTagName('a')[0].href); //second console output
    if(res != undefined){
            res.onclick = foo;
            results.push(res.href);
        
    }
}
console.log(results);

function foo (element){
    //alert(this.href);
    var ref = this.href;
    chrome.runtime.sendMessage({type: "ClickedLink", 
    href: ref,
    query: searchForm[0].value,
    searchResults: results,
    timestamp: 0,
    engine: 'Google',
    currentPage: cur,
    tab: tab_index,
    userId : ""
    });
};

function yell(){
    var ref = this.href;
    alert(ref);
}


//code to send message to open notification. This will eventually move into my extension logic
