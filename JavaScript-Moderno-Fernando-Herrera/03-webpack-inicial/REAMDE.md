link: https://webpack.js.org/

### comandos usados para este proyecto

1 - npm init
2 - npm install webpack webpack-cli --save-dev

### Estos 2 paquetes me perimiten copiar el html en el dist y modificar el scipt del index.html automaticamente
3  npm i --save-dev html-loader html-webpack-plugin

### Dev Server para que compline cada vez que guardamos un archivo en el codigo. ( Recompila la App en modo desarrollo )
4 npm i -D webpack-dev-server

Tenemos que agregar el scpir en pacakage.json 
"start": "webpack-dev-server --open --port=8080"

### Lo que nos permite es crear nuestros archicos de css y cuando lo importamos en los modulos de js. cuanod lo necesitamos uasr webpack te lo agrega en ese momento. Muy util. porque cuando se carga el componente.js q tiene el archivo de css importado. automaticamente carga el color: red;

5 npm i -D css-loader style-loader

### Para argerar css globales 

6 npm i -D mini-css-extract-plugin

### este plugin es para minimizar el codigo css en produccion 

7 npm i -D optimize-css-assets-webpack-plugin

### trabajar con imagenes

8 npm i -D file-loader

### este paquete nos va a permitir realizaer movimitos de carpetas
9 npm i -D copy-webpack-plugin


### QUE ES BABEL 

link: https://babeljs.io/setup#installation

run npm install --save-dev babel-loader @babel/core

Nos ayuda a usar caracteritas del ES6/7/8 moderno y pasarlos o traducirlos a código de JavaScript compatible con navegadores web viejos.

## tenemos que crear en la raiz .babelrc y installar este paquete 
npm i -D babel-preset-minify
## deja el main en una sola linea y ofuscado
npm i -D babel-minify-webpack-plugin
## este cambia de const a var. y otras cosas para navegadores mas viejos
npm install @babel/preset-env --save-dev

# Esto es un Plus ( Como eliminar la carpeta dist con webpack )

npm i -D clean-webpack-plugin