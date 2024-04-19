// background.js

chrome.runtime.onInstalled.addListener(function() {
    // 检查是否已设置isEnabled和refreshInterval
    chrome.storage.sync.get(['isEnabled', 'refreshInterval'], function(data) {
        // 如果没有找到已存在的设置，则初始化为默认值
        if (data.isEnabled === undefined || data.refreshInterval === undefined) {
            chrome.storage.sync.set({ isEnabled: true, refreshInterval: '10' }, function() {
                console.log('默认设置已保存');
            });
        }
    });
});
