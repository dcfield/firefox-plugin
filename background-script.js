// Put common functions in here
// Things that need to run on startup

// Variable to store the folders
let browserFolders = [];

function setBrowserFolders(folders){
    browserFolders = folders;
}
function getBrowserFolders(){
    return browserFolders;
}
function addFolderToBrowserFolders(folder, level){
    browserFolders.push([folder, level]);
}

let bookmarksFromSavedFolders = [];
function setBookmarksFromSavedFolders(bookmarks){
    bookmarksFromSavedFolders = bookmarks;
}
function getBookmarksFromSavedFolders(){
    return bookmarksFromSavedFolders;
}
function addBookmarkToBookmarksFromSavedFolders(bookmark){
    bookmarksFromSavedFolders.push(bookmark);
}

// Get all bookmarks from the saved folders
function pullBookmarksFromSavedFolders(){
    pullBrowserFoldersAndSave();
    // TODO: 1. Get bookmarks from the saved folders
    // TODO: 2. Add each bookmark to bookmarksFromSavedFolders
    // TODO: 3. Put randomizer funcionality into show_bookmark.js
}

// Get all folders in the browser
function pullBrowserFoldersAndSave(){
    let pullAllBookmarkDataFromBrowser = browser.bookmarks.getTree();
    pullAllBookmarkDataFromBrowser.then(function(browserBookmarkData){
        extractFoldersFromBookmarkTree(browserBookmarkData);
    });
}

// Extract the folders from the bookmark tree
function extractFoldersFromBookmarkTree(bookmarkData){
    return extractFoldersFromBookmarkTreeNode(bookmarkData[0]);
}

// Each tree node should be analyzed individually
function extractFoldersFromBookmarkTreeNode(bookmarkItem, level=0){
    if(bookmarkItem.type == "folder"){
        addFolderToBrowserFolders(bookmarkItem);
    }

    // If folder has subitems, we need to check if the sub items are also folders
    // if(bookmarkItem.children){
    //     addFolderToBrowserFolders(bookmarkItem, level);
    //     ++level;
    //     for(let child of bookmarkItem.children){
    //         extractFoldersFromBookmarkTreeNode(child, level);
    //     }
    // }
}

pullBookmarksFromSavedFolders();
