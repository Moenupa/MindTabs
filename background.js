(Background = function() {

    init = function() {
        // Called when the user clicks on the browser action.
        chrome.browserAction.onClicked.addListener(openTreeView);
    }

    var openTreeView = function(currentTab) {
        var views = chrome.extension.getViews({ type: 'tab' })
        if (views.length == 0) {
            chrome.tabs.create({active:true, url: "MindTabs.html"}, function(tab){})
        } else {
            var view = views[0]
            var graphiy = view.$item.query({name: 'MindTabs'})
            graphiy.open()
        }
    }

    var onTabRemoved = function(tabId, removeInfo) {
        if (!removeInfo.isWindowClosing) {
            saveTabs()
        } else {
            var views = chrome.extension.getViews({type:'tab'})
            chrome.storage.local.set({"note": views[0].$root})
        }
    }
    
    init()
})()
