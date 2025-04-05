console.log('Linkedin AI Post Detector : Extension started');

// Listen for navigation events
chrome.webNavigation.onCompleted.addListener((details) => {
  console.log('Navigated to LinkedIn feed!');
}, {
  url: [{ hostEquals: 'www.linkedin.com', pathEquals: '/feed/' }] // Filter for LinkedIn feed URL
});