# Evaluating The Effectiveness Of Internet Search Engines:

This is an Extension for tracking user input on search engines such as Google, Bing, etc.

## Introduction:

Which search engine is the best? This simple question is at the core of multiple heated debates. Some users have sworn by Google’s platform while others have voiced their affection for other lesser used search engines. Furthermore, many countries have banned the use of Google and use alternatives for their search queries. With an ever growing market and complexity for search queries, it has become more difficult to give an objective answer to which platform has the best performance. With this project we hope to provide necessary information for the evaluation of the effectiveness of search engines.

## Project Description:

In this project, we will use user interactions with each search engine to better understand the effectiveness of each platform. First, the methods of search engine evaluation should be researched and adapted to this project. Second, a system (i.e. a browser extension) should be used to record data from the user: pages returned, links clicked, query chains, type of query, modifications to the original query, and  time taken to find resource. Third, the data collected by the browser extension should be sent to the cloud and analyzed using data mining. 

### Browser Extension Specifications:

The Data structure (seen below) that is sent from the content script to the background script is of the following form:
```javascript
{
    type: "ClickedLink", //Type of the event of the message sent
    href: "", // Url clicked by the user
    query: "", // query entered by the user
    searchResults: [], // search results from the search engine
    engine: "", // The search engine that is used
    timeClicked: <timeStamp> // The time thw user clicked the url
    currentPage: <int>, // The page of the results from the search engine
    userId : "" // Unique Id of the user
}
```
When the user clicks a link on the search engine results page this object is sent to the background script.
(not finalized yet)

### Data mining and Cloud Computing Specifications:

(not finalized yet)

