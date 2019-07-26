// Get the folders from background script
function setupSettings(){
    var backgroundPage = browser.runtime.getBackgroundPage();
    backgroundPage.then(function(page){
        // Get the browser folders
        var folders = page.getBrowserFolders();
        console.log(folders);
        displayFoldersInSettings(folders);
    });
}

function displayFoldersInSettings(foldersToPrint){
    return displayFolder(foldersToPrint[0][0]);
}

// Bookmarks Toolbar 0
// Most visited 1
// From google Chrome 1
// Bookmarks menu 0
function displayFolder(folderOrBookmark, level=0){


    //console.log(folderOrBookmark);
    if(folderOrBookmark.type == "folder"){
        //console.log("this is a folder");
        printFolder(folderOrBookmark.title, level);
        //document.getElementById("folders").innerHTML += "<br>" + folderOrBookmark.title + level;
    }

    if(folderOrBookmark.children){
        //console.log("This si a child");
        ++level;
        for(let child of folderOrBookmark.children){
            displayFolder(child, level);
        }
    }
}

// Print the folder and checkbox to the settings page
// Level indicates how many parents it has
function printFolder(folderTitle, level){
    let folderContainer = document.getElementById("container-folders");
    let indents = "-  ".repeat(level);
    folderContainer.innerHTML += `${indents}<input type="checkbox">${folderTitle}<br>`;



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

setupSettings();

// recursive function
// Loops through

// Level = 0. If we go down a level, increase the level by 1