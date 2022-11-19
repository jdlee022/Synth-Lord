# Synth Lord
[synthlord.herokuapp.com](https://synthlord.herokuapp.com)

## Description
Synth Lord is a web based synthesizer with MIDI support. At the time of writing Heroku does not support MIDI, so in order to use your MIDI controller you must run the app locally by following the steps below.


## Installation
1. Download the repository.

2. `cd Synth-Lord`

3. `npm install`

4. `node server.js`

5. Open 'http://localhost:8000/' in browser.

## Usage

The piano keys start with asdfg.

Drum keys are 45678.

## Technologies
[Qwerty Hancock](https://stuartmemo.com/qwerty-hancock/) - used to generate a responsive keyboard for playing notes.

[Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) - used for sound manipulation and visualization.

[Web Audio DAW](https://github.com/rserota/wad#configuring-reverb) - a library that utilizes the Web Audio API to help with sound manipulation.

MySQL - used to store global presets that all users have access to.

## Screenshots
![Screenshot 1](/public/app/img/screen-shot-1.png)

![Screenshot 2](/public/app/img/screen-shot-2.png)

## Issues/Bugs

Drum loops stop playing when the page is reloaded after setting change.

MIDI support currently not working with Heroku deployment.
