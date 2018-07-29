# Evaluating The Effectiveness Of Internet Search Engines:

This is an Extension for tracking user input on search engines such as Google, Bing, and Baidu.
The extension is only available on chrome and currently has no backend but is planned to be 
connected to a cloud database.

## Introduction:

Which search engine is the best? This simple question is at the core of multiple heated debates. Some users have sworn by Google’s platform while others have voiced their affection for other lesser used search engines. Furthermore, many countries have banned the use of Google and use alternatives for their search queries. With an ever growing market and complexity for search queries, it has become more difficult to give an objective answer to which platform has the best performance. With this project we hope to provide necessary information for the evaluation of the effectiveness of search engines.

## Project Description:

In this project, we will use user interactions with each search engine to better understand the effectiveness of each platform. First, the methods of search engine evaluation should be researched and adapted to this project. Second, a system (i.e. a browser extension) should be used to record data from the user: pages returned, links clicked, query chains, type of query, modifications to the original query, and  time taken to find resource. Third, the data collected by the browser extension should be sent to the cloud and analyzed using data mining. 

### Browser Extension Specifications:
> There have been attempts to create an object class for less redundancy and ease of testing; however, every attempt has been
thwarted due to the nature of content scripts and web extensions despite Google's claim that chrome extensions support object classes. 

The Data structure (seen below) that is sent from the content script to the background script when the user clicks a link is of the following form:
```javascript
{
    type: "ClickedLink", //Type of the event of the message sent
    href: "", // Url clicked by the user
    query: "", // query entered by the user
    engine: "", // The search engine that is used
    rank: <int>, // identifies the rank of the link (see ranking section below)
    timeClicked: <timeStamp> // The time thw user clicked the url
    currentPage: <int>, // The page of the results from the search engine
    linkType: "",// indicates what type of link was clicked (i.e. Image, Video, News, Webpage, etc)
    tab: tab_index, //Identifies the media tab index (i.e. Images, video, news, all)
    userId : "" // Unique Id of the user
}
```
The Data structure (seen below) that is sent from the content script to the background script when the search results page is of the following form:
```javascript
{
    type: "searchQuery", //Type of the event of the message sent
    query: "", // query entered by the user
    tab: tab_index, //Identifies the media tab index (i.e. Images, video, news, all)
    engine: "", // Identifies the search engine of origin
    timestamp: <int>, // The page of the results from the search engine
    orderedResults: [[]], // 2D matrix of search results from the search engine. Each row is a rank and the all links in
    // said row belong to the same ranking
    currentPage: <int>, // The page of the results from the search engine
    userId : "" // Unique Id of the user
}
```
**Tracked Information:**
<ul>
    <li>
        <p>When the results page loads the query is recorded since the user may read the results and then change their query to better fit their needs</p>
    </li>
    <li>
        <p>When the user clicked a link</p>
    </li>
     <li>
        <p>What link the user clicked</p>
    </li>
     <li>
        <p>All the search results on that page</p>
    </li>
     <li>
        <p>The search results page number</p>
    </li>
</ul>

**Ranking Specifics:**

![Rankings](https://github.com/kylrbutlr/Extension_app/blob/master/images/pasted%20image%200.png)
>Bill cosby was used to demonstrate the different types of search results that can appear to the user.

As seen in the above image, links are grouped by the main container that they inhabit, that is to say they will have the same rank. All sublinks that correlate to a main page (i.e. ones that take the user to different parts of the website) but are clearly still part of a root link will be grouped together (see Rank #2 in image). Also, all links that are contained in a multimedia container are grouped together( see Rank #1 and Rank #14). This method was chosen to allow inclusion of verticals (multimedia SERP injections) without compromising the integrity of the Search Engine metrics discussed below. 

When the user clicks a link on the search engine results page this object is sent to the background script.
![object Example](https://github.com/kylrbutlr/Extension_app/blob/master/images/Screen%20Shot%202018-07-29%20at%203.12.00%20PM.png)

When the begins the search on the search engine results page this object is sent to the background script.
![object Example](https://github.com/kylrbutlr/Extension_app/blob/master/images/Screen%20Shot%202018-07-29%20at%202.39.55%20PM.png)

(not finalized yet)

### Data mining and Cloud Computing Specifications:

Normalized Discounted Cumulative Gain is the metric we'll be using to evaluate each query per search engine.
![DCG](https://wikimedia.org/api/rest_v1/media/math/render/svg/3efe45491d555db398ed663107460f81d6ecaf1e)

![IDCG](https://wikimedia.org/api/rest_v1/media/math/render/svg/0dfdd91ad2b2e59fce87ed6d6e5fa8ddd2678a7b)

![nDCG](https://wikimedia.org/api/rest_v1/media/math/render/svg/b3510c9c5cf42ee8820d65335675cada51b40736)

**Cloud DataBase:**

For this project we will use a cloud based database to record the user interactions with the search engines. This 
database will likely be hosted on Amazon Web Services. The database will be a relational database that supports SQL.

>The data we are recording are user records; hence, there is little need for Normal form since these records will not be mutated. Normal form may be used later on if we feel the need to save storage space.

Here is a mockup of what the data tables might look like:
 
**ClickedLink Table:**
    
type | href | query | engine | rank | timeClicked | currentPage | linkType | tab | userId 
---|---|---|---|---|---|---|---|---|---|
(TEXT) | (TEXT) | (TEXT) | (TEXT) | (INT) | (TIMESTAMP) | (INT) | (TEXT) | (TEXT) | (INT) 
(TEXT) | (TEXT) | (TEXT) | (TEXT) | (INT) | (TIMESTAMP) | (INT) | (TEXT) | (TEXT) | (INT) 
(TEXT) | (TEXT) | (TEXT) | (TEXT) | (INT) | (TIMESTAMP) | (INT) | (TEXT) | (TEXT) | (INT) 


**SearchQuery Table:**

type | query | engine | rank | timestamp | currentPage | orderedResults | tab | userId 
---|---|---|---|---|---|---|---|---|
(TEXT) | (TEXT) | (TEXT) | (INT) | (TIMESTAMP) | (INT) | (TEXT) | (TEXT) | (INT) 
(TEXT) | (TEXT) | (TEXT) | (INT) | (TIMESTAMP) | (INT) | (TEXT) | (TEXT) | (INT) 
(TEXT) | (TEXT) | (TEXT) | (INT) | (TIMESTAMP) | (INT) | (TEXT) | (TEXT) | (INT) 

>Where orderedResults is a delimited string respresentation of the 2D matrix.

(not finalized yet)

## References:

[Optimizing Search Engines using Clickthrough Data](https://www.cs.cornell.edu/people/tj/publications/joachims_02c.pdf)

[Personal Evaluations of Search Engines](https://www.cs.uic.edu/~liub/searchEval/SearchEngineEvaluation.htm)

[Analysis of a Very Large Web Search Engine Query Log](http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.83.8477&rep=rep1&type=pdf)

[Understanding User Goals in Web Search](http://www.ambuehler.ethz.ch/CDstore/www2004/docs/1p13.pdf)

[Accurately Interpreting Clickthrough Data as Implicit Feedback](https://www.cs.cornell.edu/people/tj/publications/joachims_etal_05a.pdf)

[Query Chains: Learning to Rank from Implicit Feedback](https://www.cs.cornell.edu/people/tj/publications/radlinski_joachims_05a.pdf)

[Evaluating the retrieval effectiveness of Web search engines using a representative query sample](https://pdfs.semanticscholar.org/0d2e/113b190000807799d4cd623231aca816809b.pdf)

[Counterfactual Learning-to-Rank for Additive Metrics and Deep Models](https://arxiv.org/pdf/1805.00065.pdf)

[Models for IR Evaluation](https://people.cs.umass.edu/~jpjiang/cs646/13_eval2.pdf)

[Discounted cumulative gain](https://en.wikipedia.org/wiki/Discounted_cumulative_gain)
