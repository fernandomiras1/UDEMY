#bin/sh
# npm audit --registry=https://registry.npmjs.org
echo "tar from '^2.0.0' to 4.4.2" ; sed -i 's/"tar": "^2.0.0"/"tar": "4.4.2"/g' node_modules/node-gyp/package.json
echo "braces from '^2.3.1' to 2.3.2" ; sed -i 's/"braces": "^2.3.1"/"braces": "2.3.2"/g' node_modules/micromatch/package.json
echo "******* running install *******"
npm i ;npm i
