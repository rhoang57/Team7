const SCOTT_PUBLIC_KEY = "09270388b0fcc2f9d0996884d57c16a5";
const SCOTT_PRIVATE_KEY = "f1565acbd2ca58ce61b4230f98c9617d545b4964";
console.log("marvelapi.js linked");
let randomMarvelCharacters = [];

function displayCharactersOnPage() {
    let div = $('#photos-to-meme');
    console.log(randomMarvelCharacters);
    for(let i = 0; i < randomMarvelCharacters.length; i++) {
        let thumbnailDiv = $('<div>');
        thumbnailDiv.attr('class', 'thumbnail-to-meme col-6 col-sm-4 col-lg-3 col-xl-2');
        thumbnailDiv.attr('data-character-name', randomMarvelCharacters[i].name);
        thumbnailDiv.attr('data-wiki-link', randomMarvelCharacters[i].urls[1].url);
        let img = $('<img>');
        img.addClass('img-responsive p-2')
        //img.attr('class', 'img-responsive p-2');
        img.attr('src', `${randomMarvelCharacters[i].thumbnail.path}.${randomMarvelCharacters[i].thumbnail.extension}`);
        img.attr('width', '200');
        thumbnailDiv.append(img);
        div.append(thumbnailDiv);
    }
}

function getRandomMarvelCharacters(charactersToRetreive) {
    const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    let date = new Date();
    let timestamp = date.getTime();
    let queryHash = hex_md5(timestamp + SCOTT_PRIVATE_KEY + SCOTT_PUBLIC_KEY).toString();
    let randomAlphabetIndex = Math.floor(Math.random() * 25);
    // Select random letter to grab characters:
    let randomLetter = alphabet[randomAlphabetIndex];
    let queryURL = `http://gateway.marvel.com/v1/public/characters?ts=${timestamp}&nameStartsWith=${randomLetter}&limit=${charactersToRetreive}&apikey=${SCOTT_PUBLIC_KEY}&hash=${queryHash}`;
    console.log(queryURL);
    $.ajax({
      url: queryURL,
      context: document.body,
      method: 'GET'
    }).then(function(result) {
        randomMarvelCharacters = result.data.results;
        displayCharactersOnPage();
    });
}

$(document).ready(function(event) {
    getRandomMarvelCharacters(6);
});

$(document).on('click', '.thumbnail-to-meme', function() {
    // When a user clicks on any div that has class 'thumbnail-to-meme':
    console.log('clicked', this);
    // hide all characters
    $('.thumbnail-to-meme').hide();
    // find character that user selected:
    let selectedCharacter = $(this)
    // show the character and make it big!
    selectedCharacter.show();
    selectedCharacter.attr('class', 'col-12 mx-auto');
    selectedCharacter.find('img').attr('width', '600');
});