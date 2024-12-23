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
const handleDeleteClick = () => {
    console.log("Delete button clicked");
};

/**
 * Handle play button click
 */
const handlePlayClick = () => {
    console.log("Play button clicked");
};
