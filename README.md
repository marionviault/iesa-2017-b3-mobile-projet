# Ralph Le Croco

## Fichier manquants fin J3

- /report/report.pdf
	
## Members

* [Floriane Chomette](https://www.linkedin.com/in/florianechomette/)
* [Thomas Deroua](http://www.thomasderoua.fr/)
* [Marjorie Grondin](http://www.iesanetwork.com/m.grondin/)
* [Melissa Loeser](http://azaryia.com/)
* [Marion Viault](http://marionviault.com/)

## What is Schmilblick?

Schmilblick, l’appli qui vous permet de faire une bonne action tout en vous amusant !
Devinez des mots d’après des indices ou des images, gagnez des trophées et des pièces pour acheter des bonus et soutenez ainsi vos associations préférées dans la joie et la bonne humeur !

## Video n°1

* https://www.youtube.com/watch?v=QIEwFzEQo8o&feature=youtu.be
* https://www.youtube.com/watch?v=Rpa65p4xM4E&feature=youtu.be

## Video n°2

https://www.youtube.com/watch?v=VRZV-VwRv2A&feature=youtu.be

## How to work on the project

Clone project :
```
git clone https://github.com/marionviault/iesa-2017-b3-mobile-projet.git
```

Go in the project :
```
cd iesa-2017-b3-mobile-projet/sources
```

Install ionic :
```
sudo npm install -g cordova ionic
```

Install plugins :
```
cordova plugin add cordova-plugin-splashscreen
cordova plugin add cordova-plugin-contacts
cordova plugin add cordova-plugin-camera
cordova plugin add cordova-plugin-geolocation
cordova plugin add cordova-plugin-statusbar
(optionnal) cordova plugin add cordova-plugin-device-orientation
```

Install platforms :
```
ionic platform add ios
ionic platform add android
ionic build ios
ionic build android
```

Launch iOS and android simulators on navigator :
```
ionic serve --lab
```

Or launch iOS and android simulators alones :
```
ionic emulate ios
ionic emulate android
```

*IESA multimédia, 2017*
