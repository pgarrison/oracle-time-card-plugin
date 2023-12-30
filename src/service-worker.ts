import TimeCardOptions from './time-card'
chrome.action.onClicked.addListener((tab) => {
  const options: TimeCardOptions = {
    projectCode: '103-01-001-10 : Allen Cell Science Activities',
    task: 'Default : Default',
    expenditureType: 'Regular - Straight Time',
  };
  chrome.tabs.sendMessage(tab.id, options);
});