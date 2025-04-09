const processPosts = () => {
    const posts = document.querySelectorAll('.feed-shared-inline-show-more-text:not(.processed)');
    posts.forEach((post) => {
        // Mark the post as processed to avoid duplicate processing
        post.classList.add('processed');

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

        // Add inline styles to ensure proper size and visibility
        extensionImg.style.width = '30px';
        extensionImg.style.height = '30px';
        extensionImg.style.position = 'absolute';
        extensionImg.style.right = 0;
        extensionImg.style.zIndex = 1000;
        extensionImg.style.cursor = 'pointer';
        extensionImg.style.opacity = 0;
        extensionImg.style.transition = 'opacity 0.3s ease';

        // Add hover effect to show the icon
        post.addEventListener('mouseenter', () => {
            extensionImg.style.opacity = 1;
        });

        post.addEventListener('mouseleave', () => {
            extensionImg.style.opacity = 0;
        });

        extensionImg.addEventListener('click', () => {
            handleIconClick(plainText);
        });

        post.prepend(extensionImg);
    });
};

// Observe changes in the DOM to detect newly loaded posts
const observer = new MutationObserver(() => {
    processPosts();
});

// Start observing the feed container for changes
const feedContainer = document.querySelector('.scaffold-finite-scroll__content');
if (feedContainer) {
    observer.observe(feedContainer, { childList: true, subtree: true });
}

// Process initial posts
processPosts();

function handleIconClick(plainText) {
    // Send the plainText to the background script
    chrome.runtime.sendMessage({ action: 'stashPostText', text: plainText }, (response) => {
        console.log('Background response:', response);
    });

    window.open('https://quillbot.com/ai-content-detector', '_blank');
}