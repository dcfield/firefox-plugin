// Get the folders from background script
function setupOptionsHtml(){
    var backgroundPage = browser.runtime.getBackgroundPage();
    backgroundPage.then(function(page){
        // Get the browser folders
        var folders = page.getBrowserFolders();
        //console.log(folders);
        displayFoldersInSettings(folders);
    });
}

// Calls the displayFolder method
function displayFoldersInSettings(foldersToPrint){
    return displayFolder(foldersToPrint[0][0]);
}

// Display given folder and all sub-folders with sub-folder levels
function displayFolder(folderOrBookmark, level=0){
    //console.log(folderOrBookmark);
    if(folderOrBookmark.type == "folder"){
        //console.log("this is a folder");
        printFolder(folderOrBookmark, level);
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
function printFolder(folderObject, level){
    let folderContainer = document.getElementById("container-folders");
    let indents = "-  ".repeat(level);
    let folderTitle = folderObject.title;
    let folderId = folderObject.id;
    //console.log(folderObject);
    folderContainer.innerHTML +=
        `${indents}><input type="checkbox" id="${folderId}" class="all-folders">${folderTitle}<br>`;
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

function saveOptions(e) {
    e.preventDefault();

    saveSelectedFolders();
}

function saveSelectedFolders(){
    let savedFolders = [];
    let allFoldersInSettings = document.getElementsByClassName("all-folders");

    for(let i = 0; i < allFoldersInSettings.length; i++){
        let thisFolder = allFoldersInSettings[i];
        if(thisFolder.checked){
            savedFolders.push(thisFolder.id);
        }
    }

    saveFolders(savedFolders);
}

function saveFolders(foldersToSave){
    //console.log(foldersToSave);
    browser.storage.sync.set({
        savedFolders: foldersToSave,
    });
}

// Restore saved options
function restoreOptions(){

    // Extract the previously saved folders from the given data
    function extractPreviouslySavedFolders(data) {
        let previouslySavedFolders = data.savedFolders;

        //console.log(item);
        return previouslySavedFolders;
    }

    // Catch any errors
    function onError(error) {
        console.log(`Error: ${error}`);
    }

    // If a folder is saved, check it
    function selectSavedFoldersInSettings(foldersToSelect){
        // Get the all-folders class to loop through
        let allFoldersInSettings = document.getElementsByClassName("all-folders");

        // Loop through all elements in the all-folders class to see if they should be selected
        for(let i = 0; i < allFoldersInSettings.length; i++){
            let thisFolder = allFoldersInSettings[i];
            let thisFoldersId = thisFolder.id;

            // Check the folder if it is saved
            if(foldersToSelect.includes(thisFoldersId)){
                thisFolder.checked = true;
            }
        }
    }

    setupOptionsHtml();

    let getSavedSettingsData = browser.storage.sync.get();
    getSavedSettingsData
        .then(extractPreviouslySavedFolders, onError)
        .then(selectSavedFoldersInSettings);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);