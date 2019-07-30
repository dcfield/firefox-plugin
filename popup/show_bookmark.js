function getRandomBookmarkFromSavedFolder(){
    console.log('hello');

    // Get saved folders
    getSavedFolders()
        .then(getBookmarksInsideFolders);


    console.log(savedFolders);
    //console.log(savedFolders());

    // Get bookmarks in those saved folders
    // Randomly pick one of those bookmarks
    // Update the popup with that bookmark
}

// Catch any errors
function onError(error) {
    console.log(`Error: ${error}`);
}

// Get the saved folders
function getSavedFolders(){
    let getSavedSettingsData = browser.storage.sync.get();
    return getSavedSettingsData.then(
        extractPreviouslySavedFolders, onError);

    //return savedFolders;
}

// Extract the previously saved folders from the given data
function extractPreviouslySavedFolders(data) {
    //console.log(data);
    let previouslySavedFolders = data.savedFolders;

    return previouslySavedFolders;
}

function getBookmarksInsideFolders(folders){

}

// Update the popup with given bookmark
function updatePopup(bookmark){
    let formattedBookmark = formatBookmark(bookmark);

    document.getElementById("bookmark").innerHTML = formattedBookmark;
    document.getElementById("bookmark").href = bookmark;
    document.getElementById("bookmark_link").href = bookmark;
    document.getElementById("bookmark").href = bookmark;
}

// Format given bookmark in a span tag to highlight the domain
function formatBookmark(bookmark) {
    let urlObject = new URL(bookmark);
    let host = urlObject.host;
    let highlightedHost = `<span class="highlight">${host}</span>`;

    let pathname = urlObject.pathname;
    let url = highlightedHost + pathname;
    return url;
}

// Listener for the reload button
document.getElementById("bookmark_reload").addEventListener("click", function() {
    console.log("Reloading bookmarks");
    //console.log(bookmarks);
    //newRandomBookmark = getNewRandomBookmark();
    //updatePopup(newRandomBookmark);
});

// Once popup is clicked, this script is called
console.log('Popup clicked');
getRandomBookmarkFromSavedFolder();