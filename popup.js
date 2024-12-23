// Constants
const AZ_problem_key = "AZ_problem_key";
const assetsURL = {
    play: chrome.runtime.getURL("assets/play.png"),
    delete: chrome.runtime.getURL("assets/delete.png"),
};

// Event Listener
document.addEventListener("DOMContentLoaded", () => {
    chrome.storage.sync.get([AZ_problem_key], (data) => {
        const currentBookmarks = data[AZ_problem_key] || [];
        viewBookmarks(currentBookmarks);
    });
});

// DOM Elements
const bookmarkSection = document.getElementById("bookmarks");

// Functions

/**
 * Display bookmarks in the UI
 * @param {Array} bookmarks - List of bookmark objects
 */
const viewBookmarks = (bookmarks) => {
    bookmarkSection.innerHTML = "";

    if (bookmarks.length === 0) {
        bookmarkSection.innerHTML = "<i>No Bookmarks to show</i>";
        return;
    }

    bookmarks.forEach((bookmark) => {
        createBookmarkElement(bookmark);
    });
};

/**
 * Create and display a single bookmark element
 * @param {Object} bookmark - A bookmark object
 */
const createBookmarkElement = (bookmark) => {
    // Create elements
    const newElement = document.createElement("div");
    const title = document.createElement("div");
    const controls = document.createElement("div");

    // Set properties and classes
    title.innerText = bookmark.name;
    title.classList.add("bookmark-title");

    controls.classList.add("bookmark-controls");
    setControlButton(assetsURL.play, handlePlayClick, controls);
    setControlButton(assetsURL.delete, handleDeleteClick, controls);

    newElement.classList.add("bookmark");
    newElement.appendChild(title);
    newElement.appendChild(controls);
    newElement.setAttribute("url",bookmark.url)
    newElement.setAttribute("uid",bookmark.id);

    // Append to the bookmarks section
    bookmarkSection.appendChild(newElement);
};

/**
 * Set up a control button
 * @param {string} src - Image source URL
 * @param {Function} handler - Event handler for the button
 * @param {HTMLElement} parentDiv - Parent container for the button
 */
const setControlButton = (src, handler, parentDiv) => {
    const button = document.createElement("img");
    button.src = src;
    button.addEventListener("click", handler);
    parentDiv.appendChild(button);
};

// Event Handlers

/**
 * Handle delete button click
 */
const handleDeleteClick = (event) => {
    const item = event.target.parentNode.parentNode; // The parent div of the bookmark
    const id = item.getAttribute("uid"); // Correctly fetch the UID of the bookmark
    removefromStorage(id); // Remove from storage
    item.remove(); // Remove from the DOM
};

function  removefromStorage(_id){
    chrome.storage.sync.get([AZ_problem_key],(data)=>{
            const current = data[AZ_problem_key] || [];
            const update = current.filter((e)=>e.id!==_id);
            chrome.storage.sync.set({AZ_problem_key : update}, ()=>{
                console.log("Deleted from Storage also!")
            })
    })
}

/**
 * Handle play button click
 */
const handlePlayClick = (event) => {
    const problemURL = event.target.parentNode.parentNode.getAttribute("url");
    if (problemURL) {
        window.open(problemURL, "_blank");
    } else {
        console.error("URL not found for this bookmark.");
    }
};