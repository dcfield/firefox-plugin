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

// Get all folders in the browser
function pullBrowserFolders(){
    let pullAllBookmarkDataFromBrowser = browser.bookmarks.getTree();
    pullAllBookmarkDataFromBrowser.then(function(browserBookmarkData){
        extractFoldersFromBookmarkTree(browserBookmarkData);
    }).then(function(){
        console.log("hello");
        console.log(getBrowserFolders());
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


pullBrowserFolders();