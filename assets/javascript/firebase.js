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
  //variables for firebase pull
  var meme = "";
  var memeText = "";

  //on click submit button pushing information to firebase
  $(".submit").on("click", function (event) {
    event.preventDefault();

    memeText = $(".meme-input").val().trim();

    database.ref().push({
      //photo: selectedCharacter,
      writing: memeText
    });

  });

  //pulling info from firebase and displaying to the div meme-pull
  database.ref().on("child_added", function(childSnapshot) {
    memePullDiv = $("<div>");
    $("#meme-pull").append(memePullDiv).append(
      //childSnapshot.val().photo + 
      childSnapshot.val().writing);
    }, function(errorObject) {
    console.log("Error " + errorObject.code);
  });