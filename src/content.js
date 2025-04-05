const posts = document.querySelectorAll('.feed-shared-inline-show-more-text');
posts.forEach((post) => {
    // Replace <br> tags with line breaks and extract plain text
    const htmlContent = post.innerHTML.replace(/<br\s*\/?>/gi, '\n'); // Replace <br> with \n
    const plainText = htmlContent.replace(/<\/?[^>]+(>|$)/g, '').trim(); // Remove remaining HTML tags
    console.log('Found one post!', plainText);
    
    // Create a new image element
    const img = document.createElement('img');
    img.src = imgUrl = chrome.runtime.getURL('icon.png');
    img.classList.add('lpaid-icon');

    // Insert the image at the beginning of the post content
    post.prepend(img);
});