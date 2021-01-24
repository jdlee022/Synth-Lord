

/**
 * sampleArray contains all links of sounds and tracks - use for the buffer-loader
 * samples contains all links of sounds and tracks in Obj - easier to find specific sounds
 */
var sampleArray=[];
var samples = {};

/**
 * sourceArr, sourceObj, sampleId contain only SOUNDS
 */
var sampleId = [ 'closed_hihat','open_hihat', 'kick', 'snare','tom'];
var sourceArr = [], sourceObj = {};
var currentSource, currentSampleId;

/**
 * sourceArr_Track , sourceObj_Track, sampleId_Track contain only TRACKS
 */
var sampleId_Track = ['Drum1', 'Drum2', 'Drum3', 'Drum4', 'Drum5', 'Drum6', 'Drum7', 'Drum8', 'Drum9', 'Drum10', 'Drum11', 'Drum12', 'Drum13', 'Drum14', 'Drum15'];
var sourceObj_Track = {}; sourceArr_Track = [];
var currentSource_Track, currentSampleId_Track;

var list = [ 'Closed Hihat', 'Open Hihat', 'Kick', 'Snare','Tom']
var pressedBtn;
var _isPlaying = false;
var _isPlaying_drum = false;
var currentVol;

//user can playing as many times 
// without reloading the whole page, just the files
var allowedStart = 1;

var audioContext = new AudioContext();
var analyser_drum = audioContext.createAnalyser();
var analyser_Track = audioContext.createAnalyser();
var gainNode = audioContext.createGain();
var App = {
    
    _checkBrowserSupport: function(){
        //console.log("check Browser Support");
        try {
            // Fix up for prefixing
            window.Audiocontext = window.Audiocontext||window.webkitAudiocontext;
            var cxt = new AudioContext();
        }
        catch(e) {
             console.error('Web Audio API is not supported in this browser');
        } 
        this._sampleObjArr();
    }, 

    _sampleObjArr: function(){
        sampleId.forEach(function(id){
            samples[id] = '/source-files/audio/' + id + '.wav';
            sampleArray.push(samples[id]);
        });
        sampleId_Track.forEach(function(id){
            samples[id] = '/source-files/audio/' + id + '.mp3';
            sampleArray.push(samples[id]);
        });
        //console.log("sampleArray", sampleArray);
        this._loadFiles(audioContext, finishedLoading);
    }, 

    _loadFiles: function(context, callback){
        allowedStart = 1; 
        console.clear();
        bufferLoader = new BufferLoader(
            context,
            sampleArray, 
            callback
        );

        bufferLoader.load();
    }
};

window.onload = App._checkBrowserSupport();

function finishedLoading(sampleArray){
    sourceObj = {}; sourceArr = []; sourceObj_Track={};

    for (var i = 0; i < sampleArray.length; i++){
        var source = audioContext.createBufferSource();
        source.buffer = sampleArray[i];
        sourceArr.push(source);
    };

    sourceObj_Track = {}; sourceArr_Track = [];

    //console.log("sourceArr", sourceArr);
    sourceObj ={
        'closed_hihat'  : sourceArr[0], 
        'open_hihat'    : sourceArr[1], 
        'kick'          : sourceArr[2],
        'snare'         : sourceArr[3],
        'tom'           : sourceArr[4]
    };
    sourceObj_Track = {
        'Drum1'        : sourceArr[5],
        'Drum2'        : sourceArr[6],
        'Drum3'        : sourceArr[7],
        'Drum4'        : sourceArr[8],
        'Drum5'        : sourceArr[9],
        'Drum6'        : sourceArr[10],
        'Drum7'        : sourceArr[11],
        'Drum8'        : sourceArr[12],
        'Drum9'        : sourceArr[13],
        'Drum10'       : sourceArr[14],
        'Drum11'       : sourceArr[15],
        'Drum12'       : sourceArr[16],
        'Drum13'       : sourceArr[17],
        'Drum14'       : sourceArr[18],
        'Drum15'       : sourceArr[19],
    }

     _createOptionElement();
    _createDrumSoundBtns();

    
}

$(document).on("keydown", function(keyEvent){
    switch(keyEvent.keyCode){
        case 52: $("#closed_hihat").addClass("drumlit");  startDrum('closed_hihat'); break;
        case 53: $('#open_hihat').addClass("drumlit");    startDrum('open_hihat'); break;
        case 54: $('#kick').addClass("drumlit");          startDrum('kick'); break;
        case 55: $('#snare').addClass("drumlit");         startDrum('snare'); break;
        case 56: $('#tom').addClass("drumlit");           startDrum('tom'); break;
        default: //console.log("Press key 4, 5, 6, 7, 8 to start playing.");
    }
   
});

$(document).on("keyup", function(keyEvent){
    //console.log(keyEvent.keyCode);
    switch(keyEvent.keyCode ){
        case 52: $("#closed_hihat").removeClass("drumlit");  stopDrum('closed_hihat'); break;
        case 53: $('#open_hihat').removeClass("drumlit");    stopDrum('open_hihat'); break;
        case 54: $('#kick').removeClass("drumlit");          stopDrum('kick'); break;
        case 55: $('#snare').removeClass("drumlit");         stopDrum('snare'); break;
        case 56: $('#tom').removeClass("drumlit");           stopDrum('tom'); break;
    } 
});





/**
 * 
 * START TRACKS 
 * 
*/ 

$("#startTrack").on("click", function(){
    if (allowedStart === 1){
        startTrack();
    } else {
        App._loadFiles(audioContext, finishedLoading);
    }
});

$("#stopTrack").on("click", function(){
	stopTrack();
    if (allowedStart < 1){
        App._loadFiles(audioContext, finishedLoading);
    }
});

$("#trackDropBar").on("input", function(){
	if (_isPlaying === true){
		stopTrack();
		startTrack();
    } 
});

$("#drum-track-gain").change(function(){
    if (_isPlaying === true){
        stopTrack();
        //Set drum info to localStorage 
        localStorage.setItem("drumTrack", JSON.stringify
                        ({
                            'name': $("#trackDropBar").val(),
                            'source': currentSource_Track, 
                            'gain': $("#drum-track-gain").val(), 
                            '_isPlaying': true
                        }));
        App._loadFiles(audioContext, finishedLoading);
        //Get drum info
        var drum = localStorage.getItem("drumTrack");
        drum = JSON.parse(drum);
        //FIXME: remember and select the drum track again: 
        _afterloading_createOptionElement(drum.name);
        drum.source.connect(audioContext.destination);
        drum.source.gain.value = drum.gain;
        drum.source.loop = true;
        _isPlaying = drum._isPlaying;
        startTrack();
    } else {
        localStorage.setItem("drumTrack", JSON.stringify
                        ({
                            'name': $("#trackDropBar").val(),
                            'source': currentSource_Track, 
                            'gain': $("#drum-track-gain").val(), 
                            '_isPlaying': true
                        }));
        App._loadFiles(audioContext, finishedLoading);
        //Get drum info
        var drum = localStorage.getItem("drumTrack");
        drum = JSON.parse(drum);
        //FIXME: remember and select the drum track again: 
        _afterloading_createOptionElement(drum.name);
        drum.source.connect(drum.source.destination);
        drum.source.gain.value = drum.gain;
        drum.source.loop = true;
        _isPlaying = drum._isPlaying;
    }
});

/***
 * FUNCTIONS
 * **** */

function startDrum(id){
    // pressedBtn.addClass("drumlit");
    currentSource = sourceObj[id];
    currentSource.connect(audioContext.destination);
    currentSource.start();
    startVis_drum();
    _isPlaying_drum = true;
     
}

function stopDrum(){
    currentSource.stop(3);
    _isPlaying_drum= false;
    App._loadFiles(audioContext, finishedLoading);
    pressedBtn.removeClass("drumlit");
}

function startTrack(){
    allowedStart--; 
    var trackName = $("#trackDropBar").val();
    if (trackName == 'Select a drum track to start'){
        alert("Pick a drum track to start playing");
        return;
    } 
    if (_isPlaying === false){
        sampleId_Track.forEach(function(name){
            if ( name == trackName){
                currentSource_Track = sourceObj_Track[name];
                currentSource_Track.loop = true;
                currentSource_Track.connect(gainNode);
                gainNode.connect(audioContext.destination);
                gainNode.gain.value = $("#drum-track-gain").val();
                currentSource_Track.start();
                _isPlaying = true;
                startVis_track();
            }
        });
    } 
}



function stopTrack(){
    if (_isPlaying === true ){
        currentSource_Track.stop(2);
        currentSource_Track.disconnect(analyser_Track);
        _isPlaying = false;
    } 
}


function _createOptionElement(){
    $("#trackDropBar").html("");
    //console.log("createOptionElement()");
    // var placeholder = "<option id='drumTrackplaceholder' disabled selected='selected' class='drumTrack'>Select a drum track to start</option>";
    // $("#trackDropBar").append(placeholder);
    for (var i = 0; i < sampleId_Track.length; i++){
        var optionHTML = "<option id='"+ sampleId_Track[i] +"' class='drumTrack'>" + sampleId_Track[i] + "</option>";
        $("#trackDropBar").append(optionHTML);
    }
}

function _afterloading_createOptionElement(currentTrack){
    $("#trackDropBar").html("");
    //console.log("createOptionElement()");
    // var placeholder = "<option id='drumTrackplaceholder' disabled class='drumTrack'>Select a drum track to start</option>";
    // $("#trackDropBar").append(placeholder);
    for (var i = 0; i < sampleId_Track.length; i++){
        var optionHTML;
        if (sampleId_Track[i] === currentTrack){
            optionHTML = "<option id='"+ sampleId_Track[i] +"' selected='selected' class='drumTrack'>" + sampleId_Track[i] + "</option>";
        } else {
            optionHTML = "<option id='"+ sampleId_Track[i] +"' class='drumTrack'>" + sampleId_Track[i] + "</option>";
        }
        $("#trackDropBar").append(optionHTML);
    }
}

function _createDrumSoundBtns(){
     $(".drumSoundBtns").html("");
    //console.log('createDrumSoundBtns()');
    for (var i = 0; i < sampleId.length; i++){
        //console.log("sound in sourceObj", sampleId[i]);
        var buttonHTML;
        if(i ===0) buttonHTML  = "<div class='drumBtnDiv col-md-2 col-md-offset-1'>";
        else buttonHTML  = "<div class='drumBtnDiv col-md-2'>";
            buttonHTML += "<button id='" + sampleId[i] + "'";
            buttonHTML += "class='drumBtn btn btn-default'>";
            buttonHTML += list[i] + "</button></div><br>";
        //console.log("buttonHTML",buttonHTML);
        $(".drumSoundBtns").append(buttonHTML);
    }
}
/**** VISUALIZER ***
 * 
 * Tracks
*/

var dataArray, bufferLength;


function startVis_track(){
    myCanvas.clearRect(0, 0, WIDTH, HEIGHT);

    currentSource_Track.connect(analyser_Track);

    analyser_Track.fftSize = 2048;
    bufferLength = analyser.frequencyBinCount; //an unsigned long value half that of the FFT size. This generally equates to the number of data values you will have to play with for the visualization
    dataArray = new Uint8Array(bufferLength);

    draw_track();
}

// function draw(source, analyser, dataArray, bufferLength){
function draw_track(){
    if (_isPlaying = true){
        var drawVisual = requestAnimationFrame(draw_track);
        analyser_Track.getByteTimeDomainData(dataArray);

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
    } else {
        myCanvas.clearRect(0, 0, WIDTH, HEIGHT);
    }
}

/**** VISUALIZER ***
 * 
 * Tracks
*/

var dataArray_drum, bufferLength_drum;


function startVis_drum(){
    myCanvas.clearRect(0, 0, WIDTH, HEIGHT);

    currentSource.connect(analyser_drum);

    analyser_drum.fftSize = 2048;
    bufferLength_drum = analyser.frequencyBinCount; //an unsigned long value half that of the FFT size. This generally equates to the number of data values you will have to play with for the visualization
    dataArray_drum = new Uint8Array(bufferLength_drum);

    draw_drum();
}

// function draw(source, analyser, dataArray, bufferLength){
function draw_drum(){
    if (_isPlaying_drum = true){
        var drawVisual = requestAnimationFrame(draw_drum);
        analyser_drum.getByteTimeDomainData(dataArray_drum);
        // dataArray.push(currentDataArray);
        myCanvas.fillStyle = 'rgb(0, 0, 0)';
        myCanvas.fillRect(0, 0, WIDTH, HEIGHT);
        myCanvas.lineWidth = 2;
        myCanvas.strokeStyle = 'rgb(0, 255, 0)';

        myCanvas.beginPath();
        var sliceWidth = WIDTH * 1.0 / bufferLength_drum;
        var x = 0;

        for (var i = 0; i < bufferLength_drum; i++) {

            var v = dataArray_drum[i] / 128.0;
            var y = v * HEIGHT / 2;

            if (i === 0) {
                myCanvas.moveTo(x, y);
            } else {
                myCanvas.lineTo(x, y);
            }

            x += sliceWidth;
        }
        myCanvas.stroke();
    } else {
        myCanvas.clearRect(0, 0, WIDTH, HEIGHT);
    }
}