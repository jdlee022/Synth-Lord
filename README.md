# Synth-Lord
[synth-lord.herokuapp.com](Synth-lord.herokuapp.com)

[Project Presentation](https://docs.google.com/presentation/d/1e0f7rKEAZPsIJwfGvYbfDLbZQKeuijjZumg1z4KRRHw/edit#slide=id.p)

## Description
Synth Lord is a web based synthesizer with MIDI support. Heroku currently does not support MIDI so in order to use your MIDI controller you must run the app locally by following the steps below.

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


### CORS configuration: 

Go to AWS S3 and create a bucket. Upload your file here.

Go to Permissions > CORS configuration and modified the code in the CORS configuration editor with this code:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<CORSConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
<CORSRule>
    <AllowedOrigin>*</AllowedOrigin>
    <AllowedMethod>HEAD</AllowedMethod>
    <AllowedMethod>GET</AllowedMethod>
    <AllowedMethod>PUT</AllowedMethod>
    <AllowedMethod>POST</AllowedMethod>
    <AllowedMethod>DELETE</AllowedMethod>
    <ExposeHeader>ETag</ExposeHeader>
    <AllowedHeader>*</AllowedHeader>
</CORSRule>
</CORSConfiguration> 
```

Make all files public by going to the Objects tabs, choose all your files and click More > Make public.

To get the file link, click on the file and a board should popup with the file's link. 


### Visualizer with WAD.js 

The AnalyserNode is created within the WAD.js and the challenge here is to actually find this node in your WAD object. 

Do NOT create another AnalyserNode since this would most likely override the current one that already exists. 



## Our config.json for clearDB:

```json
{
  "development": {
    "username": "be0a4d94f7ab2f",
    "password": "02b68e21",
    "database": "heroku_e173a3460c3a3e7",
    "host": "us-cdbr-iron-east-03.cleardb.net",
    "dialect": "mysql"
  },
  "test": {
    "username": "be0a4d94f7ab2f",
    "password": "02b68e21",
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "us-cdbr-iron-east-03.cleardb.net"
  },
  "production": {
    "username": "be0a4d94f7ab2f",
    "password": "02b68e21",
    "database": "heroku_e173a3460c3a3e7",
    "host": "us-cdbr-iron-east-03.cleardb.net",
    "dialect": "mysql"
  }
}
```