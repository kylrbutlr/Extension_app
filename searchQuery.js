
/**
 * @author Kyler Butler
 * 
 * This content script corresponds to the google search engine logging.
 * /

 /** 
 * These are the main global HTML elements that contain the user information we need 
 * prior to be cleaned and processed further. 
 * 
 */


let lin = document.getElementsByTagName('a');
for(let i = 0; i < lin.length; i++){
    lin[i].onclick = clickedLink;
}

const allLinks = document.links; // contains all the links of the documents in the proper order 
// will be used to help maintain the original order of the results. 
let queries = document.getElementsByClassName('r');// contains all the main web page results
let tab_index = document.getElementsByClassName('hdtb-msel')[0].innerText; // Contains the current media navigation tab
let search = document.getElementsByClassName('gsfi'); 
//let form = document.getElementById('tsf');
let searchForm = document.getElementsByName("q"); // Contains the search query
let vids = document.getElementsByClassName('P94G9b'); // The video results in the main results page
let top_stories = document.getElementsByClassName("VoEfsd"); // The top stories results in the main results page
let cur; // The current page of the results.

// Error handling incase the current page element is null
try{
    cur = parseInt(document.querySelector('td.cur').textContent);

}catch{}

/**
 * This section deals with the media block on the right side of a search results page that
 * contains a multitude of links and information. This can be useful because a user may gain the appropriate 
 * information from this media block without clicking a link.
 */
let mediaBlock;
let mediaBlockLinks;
//Try block is used to ensure that the rhs block is non null
try{
    mediaBlockLinks = [];
    mediaBlock = document.getElementById('rhs_block').getElementsByTagName('a');
    for(let i = 0; i < mediaBlock.length; i++){
       // mediaBlock[i].onclick = clickedLink;
        mediaBlockLinks.push(mediaBlock[i].href);
    }
    console.log(mediaBlockLinks);
}catch{}
/**
 * This section deals with some of the related search topics and suggestions that are displayed at the 
 * bottom of the search results page.
 */
let extraResLinks;
let extraRes;
try{
    extraResLinks = [];
    extraRes = document.getElementById('extrares').getElementsByTagName('a');
    for(let i = 0; i < extraRes.length; i++){
        extraResLinks.push(extraRes[i].href);
       // extraRes[i].onclick = clickedLink;
    }
    console.log(extraResLinks);
}catch{}

let imgResults;
let imgResultsLinks;
try{
    imgResultsLinks = [];
    imgResults = document.getElementById('imagebox_bigimages').getElementsByTagName('a');
    for(let i = 0; i < imgResults.length-4; i++){
        //imgResults[i].onclick = clickedLink;
        imgResultsLinks.push(imgResults[i].href);
    }
    console.log(imgResultsLinks);
}catch{}

let tileResults
let tileResultsLinks;
try{
    tileResultsLinks = [];
    tileResults = document.getElementsByClassName('klitem');
    for(let i = 0; i < tileResults.length; i++){
        //tileResults[i].onclick = clickedLink;
        tileResultsLinks.push(tileResults[i].href);
    }
    console.log(tileResultsLinks);
}catch{}
/**
 * Adds the web page results to the main results array
 */
let results = [];
for (var i = 0; i < queries.length; i++) {
    let res = queries[i].getElementsByTagName('a')
    //console.log(queries[i].getElementsByTagName('a')[0].href); //second console output
    if(res != undefined){
            //res[0].onclick = clickedLink;
            results.push(res[0].href); 
            res[0].queryLogType = 'Main';
           /* for(let j = 0; j < res.length; j++){
                res[j].onclick = clickedLink;
            }*/
    }

}
/**
 * Adds the videos results to the main results array
 */
/*for(let i = 0; i < vids.length; i++){
    results.push(vids[i].getElementsByTagName('a')[0].href);
    vids[i].getElementsByTagName('a')[0].onclick = clickedLink;
    //vids[i].getElementsByTagName('a')[0].onclick = yell;
}


/**
 * Adds the video and news results of the first page to the main results array
 */
for(let i = 0; i < top_stories.length; i++){
    let item = top_stories[i].getElementsByTagName('a')[0];
            results.push(item.href);
            //item.onclick = clickedLink;
}

let finalRes = [];
for(let i = 0; i < allLinks.length; i++){
    let index = results.indexOf(allLinks[i].href);
    if( index != -1){
        finalRes.push(allLinks[i].href);
       // allLinks[i].onclick = clickedLink;
        //console.log('This part works')
        }
    
}

console.log(finalRes);
/**
 * This is the message sent from the content script, which is ran on the search engine
 * web page, to the background script and will later be sent to the cloud.
 */
chrome.runtime.sendMessage({type: "searchQuery", 
query: searchForm[0].value,
tab: tab_index,
engine: 'Google',
timestamp: 0,
searchResults: results,
mediaBlockResults: mediaBlockLinks,
extraResults : extraResLinks,
currentPage: cur,
userId : ""
});

console.log(results);
/**
 * This function is executed when a user clicks a link on the search engine results page.
 * It sends a message to the background script with the URL, search query, timestamp, engine,
 * current page, media navigation tab, and user id.
 */
function clickedLink (){
    //alert(this.href);
    var ref = this.href;
    chrome.runtime.sendMessage({type: "ClickedLink", 
    href: ref,
    query: searchForm[0].value,
    timestamp: 0,
    engine: 'Google',
    currentPage: cur,
    linkType: this.queryLogType,
    tab: tab_index,
    userId : ""
    });
};


//code to send message to open notification. This will eventually move into my extension logic
