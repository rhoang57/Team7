// Globals to reference the current meme picture and text:
let memeImageSRC, memeCaption;

function displayMemeCreation() {
    // Display the initial state, create-a-meme
    $('#initial-mode').show();
    $('#edit-mode').hide();
    $('#share-mode').hide();
    getRandomMarvelCharacters(6);
}

function displayMemeEditor() {
    // Display the edit-meme state:
    $('#initial-mode').hide();
    $('#edit-mode').show();
    $('#share-mode').hide();
    let imageToMeme = $('<img>');
    imageToMeme.attr('src', memeImageSRC);
    imageToMeme.attr('width', '600');
    $('#photo-to-edit').append(imageToMeme);
}

function displayPermalink() {
    // Display the final created meme along with permalink.
    // Also loads if someone visits the page via a permalink.
    $('#initial-mode').hide();
    $('#edit-mode').hide();
    $('#share-mode').show();
    let url = $(location).attr('href');
    let memeId = null;
    if (url.includes('?')) {
        let urlIDIndex = url.indexOf('?');
        console.log(urlIDIndex);
        memeId = url.substring(url.indexOf('?') + 1, url.length);
        console.log('memeID is', memeId);
        console.log('retrieving stored data...');
        retrieveMeme(memeId);
        console.log('returned')
    }
    
}

$("#refresh").on("click", function () {
    // Display new characters.
    displayCharactersOnPage();
});

$('#speak-entered-text').on('click', function() {
    // Speak when someone clicks the preview button.
    event.preventDefault();
    let textToSpeak = $("#meme-text-to-speak").val().trim();
    speak(textToSpeak);
});

$(document).on('click', '.thumbnail-to-meme', function() {
    // Select a character to create a meme.
    // (When a user clicks on any div that has class 'thumbnail-to-meme')
    console.log('clicked', this);
    memeImageSRC = $(this).find('img').attr('src');
    console.log('src is', memeImageSRC);
    displayMemeEditor();
});

$(document).on('click', '#save-meme', function() {
    // Saves the completed meme to firebase.
    event.preventDefault();
    memeCaption = $('#meme-text-to-speak').val();
    console.log('Saving meme...');
    console.log('src is', memeImageSRC);
    console.log('caption is', memeCaption);
    saveMemeToFirebase();
});

$(document).ready(function(event) {
    // When page loads, determine if we should display a completed meme (via permalink)
    // or alternately, the default meme creation mode:
    let url = $(location).attr('href');
    console.log('url is', url);
    if (url.includes('?')) {
        console.log('displaying permalink...');
        displayPermalink();
    }
    else {
        displayMemeCreation();
    }
});