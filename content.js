const imageURL = chrome.runtime.getURL("assets/bookmark.png");
const AZ_problem_key = "AZ_problem_key";



const observer = new MutationObserver(() => {
        addTracker();
});
observer.observe(document.body, { childList: true, subtree: true });

addTracker();


function onProblemsPage(){
    return  (window.location.pathname.startsWith("/problems/"));
}
function addTracker() {
    console.log("Triggering!!");
    if(!onProblemsPage || document.getElementById("tracker-btn")) return;
    const targetElement = document.getElementsByClassName("coding_list__V_ZOZ")[3];
    if (targetElement) {
        const btn = document.createElement('img');
        btn.id = "tracker-btn";
        btn.src = imageURL;
        btn.style.height = "30px";
        btn.style.width = "30px";

        targetElement.insertAdjacentElement("afterend", btn);
        console.log("Button added!");
        btn.addEventListener("click", btnHandler);
        return true; 
    }
    return false;
}

function extractProblemName(url) {
    const path = new URL(url).pathname;
    const match = path.match(/problems\/([^\/?]+)/);
    return match ? match[1] : null;
}


async function btnHandler() {
    try {
        const currentBookmarks = await getCurrentBookmark();
        const azProblemURL = window.location.href;
        const id = extractProblemName(azProblemURL);
        const problemNameElement = document.getElementsByClassName("Header_resource_heading__cpRp1")[0];
        const problemName = problemNameElement ? problemNameElement.innerHTML : "Unknown Problem";

        if (currentBookmarks.some((bookmark) => bookmark.id === id)) {
            console.log("Problem is already bookmarked.");
            return;
        }

        const trackerObj = {
            id: id,
            name: problemName,
            url: azProblemURL
        };

        const updatedBookmarks = [...currentBookmarks, trackerObj];
        chrome.storage.sync.set({ [AZ_problem_key]: updatedBookmarks }, () => {
            console.log("Updated the bookmarks correctly:", updatedBookmarks);
        });
    } catch (error) {
        console.error("Error in btnHandler:", error);
    }
}

function getCurrentBookmark() {
    return new Promise((resolve, reject) => {
        chrome.storage.sync.get([AZ_problem_key], (result) => {
            if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError);
                return;
            }
            resolve(result[AZ_problem_key] || []);
        });
    });
}


