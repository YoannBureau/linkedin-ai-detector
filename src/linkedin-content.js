const posts = document.querySelectorAll('.feed-shared-inline-show-more-text');
posts.forEach((post) => {
    // Replace <br> tags with line breaks, extract plain text and remove "...more" text
    let plainText =
        post.innerHTML
            // Replace <br> tags with line breaks
            .replace(/<br\s*\/?>/gi, '\n')
            // Hack to decode the HTML entities into their plain text equivalents
            .replace(/&(?:[a-z\d]+|#\d+|#x[a-f\d]+);/gi, (entity) => {
                const textarea = document.createElement('textarea');
                textarea.innerHTML = entity;
                return textarea.value;
            })
            // Remove HTML tags
            .replace(/<\/?[^>]+(>|$)/g, '').trim();
    plainText = plainText.replace(/…more$/, '').trim();

    const extensionImg = document.createElement('img');
    extensionImg.src = imgUrl = chrome.runtime.getURL('icon.png');
    extensionImg.alt = 'AI Post Detector';
    extensionImg.classList.add('lpaid-icon');

    extensionImg.addEventListener('click', () => {
        handleIconClick(plainText);
    });

    post.prepend(extensionImg);
});

function handleIconClick(plainText) {
    // Send the plainText to the background script
    chrome.runtime.sendMessage({ action: 'stashPostText', text: plainText }, (response) => {
        console.log('Background response:', response);
    });
    
    window.open('https://quillbot.com/ai-content-detector', '_blank');
}