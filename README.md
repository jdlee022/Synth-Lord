# Synth Lord
[synthlord.herokuapp.com](synthlord.herokuapp.com)

[Project Presentation](https://docs.google.com/presentation/d/1e0f7rKEAZPsIJwfGvYbfDLbZQKeuijjZumg1z4KRRHw/edit#slide=id.p)

## Description
Synth Lord is a web based [synthesizer](https://en.wikipedia.org/wiki/Synthesizer) with MIDI support. Heroku currently does not support MIDI so in order to use your MIDI controller you must run the app locally by following the steps below.

NOTE: Synth Lord has only been tested for Google Chrome compatibility so other browsers may not function as expected.

## Installation
1. Download the master repository.

2. Change directory to the project folder in terminal.

3. Run 'npm install'

4. Run 'node server.js'

5. Open 'http://localhost:8000/' in browser.

## Usage

The piano keys start with asdfg.

Drum keys are 45678.

## Technologies
[Qwerty Hancock](https://stuartmemo.com/qwerty-hancock/) - used to generate a responsive keyboard for playing notes.

[Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) - used for sound manipulation and visualization.

[Web Audio DAW](https://github.com/rserota/wad#configuring-reverb) - a library that utilizes the Web Audio API to help with sound manipulation.

[Amazon Web Services S3](https://aws.amazon.com/s3/) - used to store our drum tracks.

MySQL - used to store global presets that all users have access to.

## Screenshots
![Screenshot 1](/public/app/img/screen-shot-1.png)

![Screenshot 2](/public/app/img/screen-shot-2.png)

## Issues/Bugs

The page must be reloaded every time one of the settings from the Tuna effects library is changed, or else there is a significant spike in CPU usage (this has something to do with the WAD library we used).

Drum loops stop playing when the page is reloaded after setting change.

Drum pad buttons spike CPU usage.

MIDI support currently not working with Heroku deployment.