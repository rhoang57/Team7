$("#refresh").on("click", function () {
    displayCharactersOnPage();
});

$('#speak-entered-text').on('click', function() {
    event.preventDefault();
    let memeText = $("#meme-text-to-speak").val().trim();
    //alert(memeText);
    speak(memeText);
});

$(document).ready(function(event) {
    let url = $(location).attr('href');
    let memeId = null;
    if (url.includes('?')) {
        let urlIDIndex = url.indexOf('?');
        console.log(urlIDIndex);
        memeId = url.substring(url.indexOf('?') + 1, url.length);
        console.log('memeID is', memeId);
    }
    getRandomMarvelCharacters(6);
});