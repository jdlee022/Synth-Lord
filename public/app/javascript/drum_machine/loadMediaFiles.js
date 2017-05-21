// console.log("running loadMediaFiles.js");
//==========Links for codes======================
//https://www.html5rocks.com/en/tutorials/webaudio/intro/

// https://dev.opera.com/articles/drum-sounds-webaudio/

//=========== Links for Drum Tracks MP3 ===============
// http://audiosoundclips.com/audio-sound-clips-drums/


//===========Links for sample drum sounds=========
//http://freewavesamples.com/sample-type/cymbals/hi-hat

//===========Links for sample drum sounds=========
// http://freewavesamples.com/

//TODO: Looking into overlay multiple canvases: 
//http://html5.litten.com/using-multiple-html5-canvases-as-layers/



var bufferLoader;
var bufferList = [
		'https://s3.amazonaws.com/drumtracks/Drum1.mp3',
		'https://s3.amazonaws.com/drumtracks/Drum2.mp3', 
		'https://s3.amazonaws.com/drumtracks/Drum3.mp3',
		'https://s3.amazonaws.com/drumtracks/Drum4.mp3',
		'https://s3.amazonaws.com/drumtracks/Drum5.mp3',
		'https://s3.amazonaws.com/drumtracks/Drum6.mp3',
		'https://s3.amazonaws.com/drumtracks/Drum7.mp3',
		'https://s3.amazonaws.com/drumtracks/Drum8.mp3',
		'https://s3.amazonaws.com/drumtracks/Drum9.mp3',
		'https://s3.amazonaws.com/drumtracks/Drum10.mp3',
		'https://s3.amazonaws.com/drumtracks/Drum11.mp3',
		'https://s3.amazonaws.com/drumtracks/Drum12.mp3',
		'https://s3.amazonaws.com/drumtracks/Drum13.mp3',
		'https://s3.amazonaws.com/drumtracks/Drum14.mp3',
		'https://s3.amazonaws.com/drumtracks/Drum15.mp3', 
        'https://s3.amazonaws.com/drumsounds/closed_hihat.wav',
        'https://s3.amazonaws.com/drumsounds/kick.wav',
        'https://s3.amazonaws.com/drumsounds/open_hihat.wav',
        'https://s3.amazonaws.com/drumsounds/snare.wav',
        'https://s3.amazonaws.com/drumsounds/tom.wav'
		// ,'https://firebasestorage.googleapis.com/v0/b/synthlords-d67d0.appspot.com/o/drum%2Fdrum.wav?alt=media&token=1b836b7f-eef5-4503-bbaa-fd92b06cb3b3'
	];

var sourceArray = [];
var sourceArrayDS = [];
var _isPlaying = false;
var _isPlayingDS;

let context;
var currentSource;
var currentSourceDS;
// var gainDrum;

//===Check browser support====
window.addEventListener('load', checkBrowserSupport, false);
function checkBrowserSupport() {
	// console.log("checkBrowserSupport");
	try {
        // Fix up for prefixing
        window.Audiocontext = window.Audiocontext||window.webkitAudiocontext;
        context = new AudioContext();
	}
	catch(e) {
	    alert('Web Audio API is not supported in this browser');
	}
}

//====LOADING BUFFER FILES============
window.onload = init;

function init() {
	// console.log("window.init()");

	window.Audiocontext = window.Audiocontext || window.webkitAudiocontext;
    
    //=======Drum Tracks ========
    context = new AudioContext();
    // gainDrum = context.createGain();
	analyser = context.createAnalyser();
	
    bufferLoader = new BufferLoader(
	context,
	bufferList,
	finishedLoading
	);

    bufferLoader.load();

}


function finishedLoading(bufferList) {
  // Create two sources and play them both together
  	// console.log("finishedLoading()");

    //===============Drum Tracks =======================
	for (var i = 0; i < 15; i++){
		var newSource = context.createBufferSource();
		newSource.buffer = bufferList[i];
		var trackNum = i+1;
		var sourceObj = {
			name: ("Drum" + trackNum), 
			source: newSource
		};
		sourceArray.push(sourceObj);
	}
	
	// (function(){
	// 	var newSource = context.createBufferSource();
	// 	newSource.buffer = bufferList[20];
	// 	var sourceObj = {
	// 		name: ("User File"), 
	// 		source: newSource
	// 	};
	// 	sourceArray.push(sourceObj);
	// })();
    

    //===============Drum Sounds==========================
    var closed_hihat = context.createBufferSource();
    var kick = context.createBufferSource();
    var open_hihat = context.createBufferSource();
    var snare = context.createBufferSource();
    var tom = context.createBufferSource();

	closed_hihat.buffer = bufferList[15];
    kick.buffer = bufferList[16];
    open_hihat.buffer = bufferList[17];
    snare.buffer = bufferList[18];
    tom.buffer = bufferList[19];

    pushSoundtoArray("Closed Hihat", closed_hihat);
    pushSoundtoArray("Kick", kick);
    pushSoundtoArray("Open Hihat", open_hihat);
    pushSoundtoArray("Snare", snare);
    pushSoundtoArray("Tom", tom);

	// console.log("sourceArray", sourceArray);
    // console.log("sourceArrayDS", sourceArrayDS);
    createDrumSoundBtns();
    createOptionElement();
	// createOptionElement();
}

// ======FINISH LOADING ==================

// ======== START/STOP TRACKS=========================
//if change track, stop current and play the new one
$("#trackDropBar").on("input", function(){
	// console.log("changing track to", $("#trackDropBar").val());
	if (_isPlaying === true){
		stopTrack();
		startTrack();
	}
});

$("#startTrack").on("click", function(){
	startTrack();
});

$("#stopTrack").on("click", function(){
	stopTrack();
});
//=======================================================

//TODO:
$("#drum-track-volume").change(function () {
	location.reload();
	
	currentSource.connect(context.destination);
	currentSource.volume = $("#drum-track-volume").val();
	// console.log("currentSource.volume", currentSource.volume);
	currentSource.loop = true;
	currentSource.start();
	startVis();
	_isPlaying = true;
});
//==============TRACKS FUNCTIONS=====================
function startTrack(){
	// console.log("_isPlaying", _isPlaying)
	var trackName = $("#trackDropBar").val();
	if (trackName === 0){
		alert("Pick a drum track to start playing");
		return;
	} else {
		if (_isPlaying === false){
			for (var i = 0; i < sourceArray.length; i ++){
				if (sourceArray[i].name === trackName){
					currentSource = sourceArray[i].source;
					// gainDrum.gain.value = $("#drum-track-volume").val();
					// console.log("gainDrum", gainDrum.gain.value);
					// currentSource.connect(gainDrum);
					
					// console.log("gainDrum", gainDrum.gain.value);
					currentSource.connect(context.destination);
					currentSource.volume = $("#drum-track-volume").val();
					// console.log("currentSource.volume", currentSource.volume);
					currentSource.loop = true;
					currentSource.start();
					startVis();
					_isPlaying = true;
				}
			}
		}
	}
	// console.log("_isPlaying", _isPlaying);
}

function stopTrack(){
	// console.log("stopTrack()");
	if (_isPlaying === true){
		currentSource.stop(2);
		_isPlaying = false;
	}
	// console.log("_isPlaying", _isPlaying);
}
//==============================================


//======== DRUM SOUNDS KEY EVENTS =====================
$(".drumSoundBtns").on("click", ".drumBtn", function(){
	startSound(this);
    // console.log("Click on sound button....");
    // _isPlayingDS = $(this).attr("data-playing");
    
    // if(_isPlayingDS === 'false'){
    //     startSound(this);
    // } else if (_isPlayingDS === 'true') {
    //     stopSound(this);
    // }
});

//TODO: Create key events
document.addEventListener("keydown", function(event) {
  //console.log("Keydown",event.which);
  switch (event.which){
	  case 52:
	  	// console.log("Closed Hihat");
		playSound("Closed Hihat", 0);
		break;
	  case 53: 
	  	// console.log("Kick");
		playSound("Kick", 1);
		break;
	  case 54:
	  	// console.log("Open Hihat");
		playSound("Open Hihat", 2);
		break;
	  case 55:
	  	// console.log("Snare");
		playSound("Snare", 3);
		break;
	  case 56: 
	  	// console.log("Tom");
		playSound("Tom", 4);
		break;
  }
});



// var drum_sound  = {
// 	keyDown : function(keyPressed){
// 		console.log(keyPressed);
// 		// if (_isPlayingDS === 'false'){
//         for (var i = 0; i < sourceArrayDS.length; i ++){
//             if (keyPressed === ""){
// 				console.log("check for the name of the sound");
//                 currentSourceDS = sourceArrayDS[i].source;
//                 currentSourceDS.connect(context.destination);
// 				// currentDrumSound.loop = true;
//                 currentSourceDS.start();
//                 // _isPlayingDS = "true";
// 				// currentSourceDS.stop(3);
//             }
//         }
// 	}, 
// 	keyUp : function(){
// 		currentSourceDS.start();
// 	}
// }


//============= DRUM SOUND FUNCTIONS ====================

//PLAYING/STOPING
function playSound(soundName, i){
	// console.log("playing sound....");
	var drumSoundObj = sourceArrayDS[i];
	if (drumSoundObj.name === soundName){
		// console.log("sound is", drumSoundObj.name);
		currentSourceDS = drumSoundObj.source;
		currentSourceDS.connect(context.destination);
		// currentDrumSound.loop = true;
		currentSourceDS.start();
		// _isPlayingDS = "true";
		currentSourceDS.stop(2);
	}
}

function startSound(soundBtn){
	
    // console.log("start sound....");
    // console.log(soundBtn);
	var soundName = $(soundBtn).attr("data-btn-val");
    // console.log(soundName);
    // if (_isPlayingDS === 'false'){
        for (var i = 0; i < sourceArrayDS.length; i ++){
            if (sourceArrayDS[i].name === soundName){
				// console.log("check for the name of the sound, index",i);
                currentSourceDS = sourceArrayDS[i].source;
                currentSourceDS.connect(context.destination);
				// currentDrumSound.loop = true;
                currentSourceDS.start();
                // _isPlayingDS = "true";
				// currentSourceDS.stop(3);
            }
        }
		currentSourceDS.stop(3);
    // }
    // $(soundBtn).attr("data-playing", _isPlayingDS);
	// console.log("_isPlayingDS", _isPlayingDS);
}

function stopSound(soundBtn){
    _isPlayingDS = $(soundBtn).attr("data-playing");
    // console.log("stopSound()");
	if (_isPlayingDS === 'true'){
		currentSourceDS.stop(2);
		_isPlayingDS = 'false';
	}
    $(soundBtn).attr("data-playing", _isPlayingDS)
	// console.log("_isPlayingDS", _isPlayingDS);
}



// =====DYNAMICALLY GENERATED ELEMENTS
function createOptionElement(){
	// console.log("createOptionElement");
	for ( var i = 0; i < sourceArray.length; i++){
		var optionHTML = "<option>"+ sourceArray[i].name +"</option>";
		//console.log(optionHTML);
		$("#trackDropBar").append(optionHTML);
	}
}

function createDrumSoundBtns(){
    // console.log('createDrumSoundBtns');
    for (var i = 0; i < sourceArrayDS.length; i++){
        var currentDrumSound = sourceArrayDS[i];
        var htmlDSBtn  = "<div class='drumBtnDiv'>";
            htmlDSBtn +=  "<button data-btn-val='" + currentDrumSound.name +"' "; 
            htmlDSBtn += "data-playing='false' class='drumBtn btn btn-default'>";
            htmlDSBtn += currentDrumSound.name;
            htmlDSBtn += "</button> </div> <br>";
        //console.log(htmlDSBtn);
        $(".drumSoundBtns").append(htmlDSBtn);
    }
}
//=====================================================

//==========Helper functions ================
function pushSoundtoArray(soundName, buffer){
    var sourceObj = 
        {
			name: soundName,
			source: buffer
		};
    sourceArrayDS.push(sourceObj);
};


/**** VISUALIZER ****/

var WIDTH = 640;
var HEIGHT = 100;
var canvas = document.querySelector('#myCanvas');
var myCanvas = canvas.getContext("2d");
var dataArray, bufferLength;


startVis();

// startVis(dataArrayDS, bufferLengthDS, currentSourceDS);

function startVis(){
	if (currentSource != undefined){
		myCanvas.clearRect(0, 0, WIDTH, HEIGHT);
		currentSource.connect(analyser);
		analyser.fftSize = 2048;
		bufferLength = analyser.frequencyBinCount; //an unsigned long value half that of the FFT size. This generally equates to the number of data values you will have to play with for the visualization
		dataArray = new Uint8Array(bufferLength);

		draw();

	} else {
		// console.log("no current source yet");
	}
}

function draw(){
	var drawVisual = requestAnimationFrame(draw);
	analyser.getByteTimeDomainData(dataArray);

	myCanvas.fillStyle = 'rgb(0, 0, 0)';
	myCanvas.fillRect(0, 0, WIDTH, HEIGHT);
	myCanvas.lineWidth = 2;
	myCanvas.strokeStyle = 'rgb(0, 255, 0)';

	myCanvas.beginPath();
	var sliceWidth = WIDTH * 1.0 / bufferLength;
	var x = 0;

	for (var i = 0; i < bufferLength; i++) {

	var v = dataArray[i] / 128.0;
	var y = v * HEIGHT / 2;

	if (i === 0) {
		myCanvas.moveTo(x, y);
	} else {
		myCanvas.lineTo(x, y);
	}

	x += sliceWidth;
	}
	myCanvas.stroke();
}
