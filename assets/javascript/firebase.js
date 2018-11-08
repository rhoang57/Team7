// Global to store all retrieved memes:
let allMemes;

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyB1w52iXv9J1pNh-kXGGBGbLaw7AAxaATk",
    authDomain: "team7-marvelous-memes.firebaseapp.com",
    databaseURL: "https://team7-marvelous-memes.firebaseio.com",
    projectId: "team7-marvelous-memes",
    storageBucket: "team7-marvelous-memes.appspot.com",
    messagingSenderId: "242470695925"
  };
  firebase.initializeApp(config);
  var database = firebase.database();
  
  function saveMemeToFirebase() {
    // called from logic.js to save to the database:
    console.log('Saving meme to firebase...');
    let uniqueID = randomString(8);
    database.ref().push({
      imageSrc: memeImageSRC,
      caption: memeCaption,
      url: uniqueID
    }).then((snap) => {
      // after the database updates, save the key to display the permalink.
      //let key = snap.key;
      //key = key.substring(1, key.length);
      //console.log('key saved as', key);
      //$('#meme-URL').val('https://rhoang57.github.io/Team7/index.html?' + key);
      $('#meme-URL').val(uniqueID);
      displayPermalink();
   });
  }

  function randomString(length) {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('');
    if (! length) {
        length = Math.floor(Math.random() * chars.length);
    }
    var str = '';
    for (var i = 0; i < length; i++) {
        str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
}

  function retrieveMeme(key) {

  database.ref().on("value", function(snapshot) {
    
    allMemes = snapshot.val();
    
    console.log('allMemes saved', snapshot.val()); // here's your data object

    for (const prop in allMemes) {
      if (allMemes[prop].url == key) {
        console.log(allMemes[prop]);
        memeImageSRC = allMemes[prop].imageSrc;
        memeCaption = allMemes[prop].caption;
        memeURL = allMemes[prop].url;
        console.log('SRC', memeImageSRC);
        let imageToMeme = $('<img>');
        imageToMeme.attr('src', memeImageSRC);
        imageToMeme.attr('width', '600');
        $('#meme-image-share').empty();
        $('#meme-image-share').append(imageToMeme);
        $('#meme-text-share').empty();
        $('#meme-text-share').append(memeCaption);
        $('#meme-URL').val('https://rhoang57.github.io/Team7/index.html?' + memeURL);
      }
    }

  });
}