const imageURL = chrome.runtime.getURL("assets/bookmark.png");

function addTracker() {
    const targetElement = document.getElementsByClassName("coding_list__V_ZOZ")[3];
    if (targetElement) {
        const btn = document.createElement('img');
        btn.id = "tracker-btn";
        btn.src = imageURL;
        btn.style.height = "30px";
        btn.style.width = "30px";

        targetElement.insertAdjacentElement("afterend", btn);
        console.log("Button added!");
        return true; // Stop observer once button is added
    }
    return false; // Keep observing if button is not found
}

// Use MutationObserver to watch for changes in the DOM
const observer = new MutationObserver(() => {
    if (addTracker()) {
        observer.disconnect(); // Stop observing once button is added
    }
});

// Start observing the body or a parent container for changes
observer.observe(document.body, { childList: true, subtree: true });
