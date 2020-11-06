const {readdirSync } = require('fs');
const {resolve} = require('path');
const { maxBy } = require('lodash');
const episodesPath = (...args) => resolve(__dirname, '..', 'episodios', ...args);
const currentEpisodesNames = readdirSync(episodesPath(''));
const numberPrefix = x => Number(x.slice(0,2))
const episodes = currentEpisodesNames
                    .filter(numberPrefix)
                    .map(ep => ({
                        name: ep, 
                        number: numberPrefix(ep)
                    }))

const maxEpisode = maxBy(episodes,'number')
require(episodesPath(maxEpisode.name,'banner.js'));