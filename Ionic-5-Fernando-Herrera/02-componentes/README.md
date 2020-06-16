Correr la APP en Andoid Studio
leer: https://ionicframework.com/docs/developing/android

 npm i -g cordova
ionic cordova prepare android
ionic cordova build android
buscar los emuladores instalados en tu maquina
ionic cordova  run --list
Correr con la maquina virtual
ionic cordova run  android --target=Pixel_2_XL_API_26_-_PIPE

Correr la APP en IOS
SI tener error en xcode/ 
stderr: xcode-select: error: tool 'xcodebuild' requires Xcode, but active developer directory '/Library/Developer/CommandLineTools' is a command line tools instance

https://github.com/nodejs/node-gyp/issues/569
corre este comando: sudo xcode-select -s /Applications/Xcode.app/Contents/Developer
leer: https://ionicframework.com/docs/developing/ios
npm install -g ios-sim
brew install ios-deploy

ionic cordova run --list
ionic cordova prepare ios
 ionic cordova build ios
ionic cordova emulate ios --debug --target "iPhone-XXXXXX" 
ionic cordova build ios -- --buildFlag="-UseModernBuildSystem=0"
ionic cordova emulate ios -- --buildFlag="-UseModernBuildSystem=0"
ionic cordova run ios -- --buildFlag="-UseModernBuildSystem=0" -l