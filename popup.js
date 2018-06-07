let changeColor = document.getElementById('changeColor');

  chrome.storage.sync.get('color', function(data) {
    changeColor.style.backgroundColor = data.color;
    changeColor.setAttribute('value', data.color);
  });

  changeColor.onclick = function(element) {
    let color = element.target.value;
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      var extracted_query = tabs[0].title;
      var i = extracted_query.indexOf(" - Google Search")
      extracted_query = extracted_query.slice(0, i);
      alert(extracted_query);
      
  });

};

