chrome.tabs.query({currentWindow: true}, function(tabs) {
    const tabList = document.getElementById('tab-list');
    console.log(tabs);
    document.getElementById("ext-title").innerHTML += ` (${tabs.length})`;
    tabs.forEach(tab => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      const icon = document.createElement('img');

      icon.src = tab.favIconUrl;
      icon.alt = tab.title;
      icon.style.marginRight = '10px';
      icon.width = 20;
      icon.onerror = function() {
        this.src = "assets/tabicon.png";
      };

      a.href = tab.url;
      a.textContent = tab.title;

      li.addEventListener('click', () => {
        chrome.tabs.update(tab.id, {active: true});
      });

      li.appendChild(icon);
      li.appendChild(a);

      tabList.appendChild(li);
    });
});

/* Light/Dark mode settings starts here */
var isDarkMode = false;
const darkModeToggle = document.getElementById('dark-mode-toggle');
darkModeToggle.addEventListener('click', () => {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle('dark-mode'); 
    chrome.storage.sync.set({ isDarkMode: isDarkMode });
});
chrome.storage.sync.get(["isDarkMode"]).then((result) => {
  isDarkMode = result.isDarkMode;
  if (result.isDarkMode) {
    document.body.classList.add('dark-mode');
  }
});
/* Light/Dark mode settings ends here */