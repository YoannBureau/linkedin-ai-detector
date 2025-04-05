console.log('Linkedin AI Post Detector : Extension started');

// Variable to store the post text
let stashedPostText = '';

// Listen for messages from the content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'stashPostText') {
    stashedPostText = message.text; // Save the text in the variable
    console.log('Stashed post text:', stashedPostText);

    // Send a response back to the content script
    sendResponse({ status: 'success', message: 'Text saved in background script' });
  } else if (message.action === 'getStashedPostText') {
    // Respond with the stashedPostText value
    sendResponse({ text: stashedPostText });
    stashedPostText = ''; // Clear the text after sending it
  }
});