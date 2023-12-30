chrome.action.onClicked.addListener((tab) => {
  chrome.tabs.sendMessage(tab.id, {
    projectCode: '103-01-001-10 : Allen Cell Science Activities',
    task: 'Default : Default',
    expenditureType: 'Regular - Straight Time',
  });
});