// https://developer.mozilla.org/en-US/docs/Using_files_from_web_applications
// https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL

/**GOOGLE CORS Rule: http://stackoverflow.com/questions/37760695/firebase-storage-and-access-control-allow-origin
 * 
 */

// Initialize Firebase
var config = {
    apiKey: "AIzaSyB6OSjJqvmVcLb4vLW3mt1-AhjCYJy2H5o",
    authDomain: "synthlords-d67d0.firebaseapp.com",
    databaseURL: "https://synthlords-d67d0.firebaseio.com",
    projectId: "synthlords-d67d0",
    storageBucket: "synthlords-d67d0.appspot.com",
    messagingSenderId: "638830557446"
};

firebase.initializeApp(config);

// Create a root reference
var storageRef = firebase.storage().ref();

// Create a reference to 'mountains.jpg'
var drumRef = storageRef.child('drum.wav');

// Create a reference to 'images/mountains.jpg'
var drumSoundRef = storageRef.child('drum/drum.wav');

// While the file names are the same, the references point to different files
drumRef.name === drumSoundRef.name            // true
drumRef.fullPath === drumSoundRef.fullPath    // false

//direct to the uploaded file


function uploadFile(){
    drumSoundRef.put(selectedFile).then(function(snapshot) {
        console.log('Uploaded a file!');
        console.log(snapshot);
    });
    // return false;
}

/** This is working */

var selectedFile;
var selectedFileURL;
function doSomething(){
    selectedFile = document.getElementById('audioFile').files[0];
    console.log(selectedFile);
    selectedFileURL = URL.createObjectURL(selectedFile);
    console.log(selectedFileURL);
    uploadFile();
    return false;
}