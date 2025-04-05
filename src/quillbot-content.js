// Request the stashedPostText value from the background script
chrome.runtime.sendMessage({ action: 'getStashedPostText' }, (response) => {
    if (response && response.text) {
        console.log('Stashed Post Text:', response.text);

        // Wait for the #aidr-input-editor div to be loaded in the DOM
        const observer = new MutationObserver((mutations, obs) => {
            const editorDiv = document.querySelector('#aidr-input-editor');
            if (editorDiv) {
                editorDiv.textContent = response.text; // Set the text content of the div
                obs.disconnect(); // Stop observing once the element is found

                // Simulate a click on the div
                editorDiv.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));

                // Simulate pressing the down arrow key
                const downArrowEvent = new KeyboardEvent('keydown', {
                    key: 'ArrowDown',
                    code: 'ArrowDown',
                    keyCode: 40, // KeyCode for the down arrow key
                    which: 40,   // Which for the down arrow key
                    bubbles: true,
                    cancelable: true
                });
                editorDiv.dispatchEvent(downArrowEvent);

                // Simulate a click on the button with a span containing "Detect AI"
                const button = Array.from(document.querySelectorAll('button')).find((btn) => {
                    const span = btn.querySelector('span');
                    return span && span.textContent.trim() === 'Detect AI';
                });

                // Wait for 1 second before simulating a click on the button
                setTimeout(() => {
                    if (button) {
                        // button.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));                // Simulate a full click sequence (mousedown, mouseup, click)
                        button.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, cancelable: true }));
                        button.dispatchEvent(new MouseEvent('mouseup', { bubbles: true, cancelable: true }));
                        button.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));

                        console.log('Simulated click on the "Detect AI" button.');
                    } else {
                        console.log('Button with "Detect AI" text not found.');
                    }
                }, 1000); // Wait for 1 second (1000 milliseconds)
            }
        }).observe(document.body, {
            childList: true,
            subtree: true
        });

    } else {
        console.log('No stashed post text found.');
    }
});