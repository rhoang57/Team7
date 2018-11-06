$("#refresh").on("click", function () {
    displayCharactersOnPage();
});

$('#speak-entered-text').on('click', function() {
    event.preventDefault();
    let memeText = $("#meme-text-to-speak").val().trim();
    //alert(memeText);
    speak(memeText);
});