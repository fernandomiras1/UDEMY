'use strict';
const {writeFileSync, readdirSync, mkdirSync } = require('fs');
const {resolve} = require('path');
const [,,episodeName,epTitle] = process.argv;

// ----- Templates
const header = `'use strict';`;
const deps = `const fi = require('figlet');
const ch = require('chalk');
const clear = require('clear');
clear();console.log('');`

const title = (tit, color = 'white') => `console.info(ch.${color}(fi.textSync('${tit}')))`;

// ----- Colors
const colors = ['black','blue','red','green','yellow' ,'magenta' ,'cyan' ,'white' ,'redBright' ,'greenBright' ,'yellowBright' ,'blueBright' ,'magentaBright' ,'cyanBright' ,'whiteBright']
// ----- Utils
const colorNo = (x) => colors[x % colors.length];
const episodePath = (...args) => resolve(__dirname, '..', 'episodios', ...args);

// ----- Naming
const currentEpisodes = readdirSync(episodePath(''));
const maxEpisodeNumber = Math.max(...currentEpisodes
                            .map(x=>x.slice(0,2))
                            .map(Number)
                            .filter(x=>x))

const nextEpisodePrefix = (maxEpisodeNumber + 1).toString().padStart(2,'0');

console.log('This episode will be ' + nextEpisodePrefix + 'nth');

const fileBody = [
    header, deps, title(epTitle, colorNo(maxEpisodeNumber + 1))
].join('\n\n');

const fullEpisodeName = `${nextEpisodePrefix}-${episodeName}`;


// ----- File writing
mkdirSync(episodePath(fullEpisodeName));

writeFileSync(episodePath(fullEpisodeName, 'index.js'), fileBody);

console.info('Created ', fullEpisodeName);