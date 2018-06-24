/*
{type: "searchQuery", 
query: searchForm[0].value,
tab: tab_index,
engine: 'Google',
timestamp: 0,
userId : ""
}

{type: "ClickedLink", 
    href: ref,
    query: searchForm[0].value,
    searchResults: results,
    timestamp: 0,
    engine: 'Google',
    currentPage: cur,
    tab: tab_index,
    userId : ""
}

*/
 class Query{
    constructor(query, tab, engine){
        this.type = "searchQuery";
        this.query = query;
        this.tab = tab;
        this.engine = engine;
        this.timestamp = 0
        this. userId = ""
    }
}

 class ClickedQuery extends Query{
    constructor(query, tab, engine, href, results, current){
        super(query, tab, engine);
        this.type = "ClickedLink";
        this.href = href;
        this.current = current;
        this.results = results;
    }
}

export {Query, ClickedQuery};