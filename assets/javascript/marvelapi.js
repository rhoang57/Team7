const SCOTT_PUBLIC_KEY = "09270388b0fcc2f9d0996884d57c16a5";
const SCOTT_PRIVATE_KEY = "f1565acbd2ca58ce61b4230f98c9617d545b4964";

console.log("marvelapi.js linked");

//https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=g&apikey=09270388b0fcc2f9d0996884d57c16a5
var queryHash;
$( document ).ready(function(event) {
    
    // jQuery.md5( string )
    // md5(ts+privateKey+publicKey)
    // http://gateway.marvel.com/v1/public/comics?ts=1&apikey=1234&hash=ffd275c5130566a2916217b101f26150 (the hash value is the md5 digest of 1abcd1234)

    //Request Url: http://gateway.marvel.com/v1/public/comics
    // Request Method: GET
    // Params: {
    // "apikey": "your api key",
    // "ts": "a timestamp",
    // "hash": "your hash"
    // }
    // Headers: {
    // Accept: */*
    // }


    var date = new Date();
    var timestamp = date.getTime();
    //var queryHash = hex_md5(timestamp + SCOTT_PRIVATE_KEY + SCOTT_PUBLIC_KEY);
    // or b64_md5
    queryHash = hex_md5(timestamp + SCOTT_PRIVATE_KEY + SCOTT_PUBLIC_KEY).toString();
    //let testHash = hex_md5("1abcd" + 1234);
    //console.log(testHash);

    console.log(queryHash);  
    //var queryURL = `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=g`;
    // var queryURL = `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=g&apikey=09270388b0fcc2f9d0996884d57c16a5&timestamp=${timestamp}&hash=${queryHash}`;
    
    //var queryURL = 'https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=s&apikey=09270388b0fcc2f9d0996884d57c16a5';
    var queryURL = `http://gateway.marvel.com/v1/public/characters?ts=${timestamp}&nameStartsWith=s&apikey=${SCOTT_PUBLIC_KEY}&hash=${queryHash}`;
    console.log(queryURL);
  
    // Request Url: http://gateway.marvel.com/v1/public/comics
    // Request Method: GET
    // Params: {
    // "apikey": "your api key",
    // "ts": "a timestamp",
    // "hash": "your hash"
    // }
    // Headers: {
    // //Accept: */*
    // }

    let params = {
        nameStartsWith: "q",
        "apikey": SCOTT_PUBLIC_KEY,
        "ts": timestamp,
        "hash": queryHash
    }

    $.ajax({
      //userkey: SCOTT_PUBLIC_KEY,
      //ts: timestamp,
      //hash: queryHash,
       url: queryURL,
    //   ts: timestamp,
    //   apikey: SCOTT_PUBLIC_KEY,
    //   hash: queryHash,
      //context: document.body,
      method: "GET"
    }).then(function() {
        console.log(result);
    });
  });