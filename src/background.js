console.log('Linkedin AI Post Detector : Extension started');

let stashedPostText = '';

// Listen for messages from the content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

  if (message.action === 'stashPostText') {
    stashedPostText = message.text;
    console.log('Stashed post text:', stashedPostText);
    sendResponse({ status: 'success', message: 'Text saved in background script' });
  }
  else if (message.action === 'getStashedPostText') {
    sendResponse({ text: stashedPostText });
    stashedPostText = '';
  }

});