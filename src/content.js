const posts = document.querySelectorAll('.feed-shared-inline-show-more-text');
posts.forEach((post) => {
    // Replace <br> tags with line breaks, extract plain text and remove "...more" text
    const htmlContent = post.innerHTML.replace(/<br\s*\/?>/gi, '%0A');
    let plainText = htmlContent.replace(/<\/?[^>]+(>|$)/g, '').trim();
    plainText = plainText.replace(/\.\.\.more$/, '').trim();

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
    window.open('https://app.gptzero.me/?scanType=basic&source=landing&triggerScan=true&text='+plainText, '_blank');
}