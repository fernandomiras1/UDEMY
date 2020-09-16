Instaladores necesarios para correr en Andorid con Cordova
- npm i -g cordova    
- sudo apt-get update 
- sudo apt-get install openjdk-8-jdk 
- javac -version    
- sudo apt-get install gradle     

Run with Android

ionic cordova build android

Con el emulador levantado en Studio ( Nexsus S API 29 - funciona ok)


ionic cordova run android 


ERRORS.

Failed to find 'ANDROID_HOME' environment variable. Try setting it manually.
Failed to find 'android' command in your 'PATH'. Try update your 'PATH' to include path to valid SDK directory.

RUNs:
export ANDROID_HOME=/home/fernando/Android/Sdk 
export PATH=${PATH}:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools