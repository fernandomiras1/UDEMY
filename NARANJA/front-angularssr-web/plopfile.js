const path = require('path');
const fs = require('fs');
// const copy = require('recursive-copy');
const DIR = path.join(__dirname, '/');
const OUTPUT_TARGET = path.join(__dirname, '/dist/');

function copyFileSync( source, target ) {
  var targetFile = target;
  //if target is a directory a new file with the same name will be created
  if ( fs.existsSync( target ) ) {
      if ( fs.lstatSync( target ).isDirectory() ) {
          targetFile = path.join( target, path.basename( source ) );
      }
  }
  fs.writeFileSync(targetFile, fs.readFileSync(source));
}

function copyFolderRecursiveSync( source, target ) {
  var files = [];
  //check if folder needs to be created or integrated
  var targetFolder = path.join( target, path.basename( source ) );
  if ( !fs.existsSync( targetFolder ) ) {
    fs.mkdirSync( targetFolder );
  }
  //copy
  if ( fs.lstatSync( source ).isDirectory() ) {
    files = fs.readdirSync( source );
    files.forEach( function ( file ) {
      var curSource = path.join( source, file );
      if ( fs.lstatSync( curSource ).isDirectory() ) {
        copyFolderRecursiveSync( curSource, targetFolder );
      } else {
        copyFileSync( curSource, targetFolder );
      }
    } );
  }
}

module.exports = (plop) => {
  plop.setActionType('globals', (answers, config, plop) => {
    return new Promise((resolve, reject) => {
      const excludeFiles = [
        'CHANGELOG.md',
        'plopfile.js',
        'package-lock.json',
        '.gitlab-ci.yml',
      ];
      try {
        if ( !fs.existsSync( OUTPUT_TARGET ) ) {
          fs.mkdirSync(OUTPUT_TARGET);
        }
        fs.readdirSync( DIR ).forEach( ( file ) => {
          if (!fs.lstatSync(path.join(DIR, file)).isDirectory() && excludeFiles.indexOf(file) === -1) {
            copyFileSync(path.join(DIR, file), OUTPUT_TARGET);
          }
        })

        copyFolderRecursiveSync(path.join(__dirname, '/src/'), OUTPUT_TARGET);
        copyFolderRecursiveSync(path.join(__dirname, '/nginx/'), OUTPUT_TARGET);
        copyFolderRecursiveSync(path.join(__dirname, '/test/'), OUTPUT_TARGET);
        copyFolderRecursiveSync(path.join(__dirname, '/e2e/'), OUTPUT_TARGET);
        copyFolderRecursiveSync(path.join(__dirname, '/docs/'), OUTPUT_TARGET);
        copyFolderRecursiveSync(path.join(__dirname, '/stubs/'), OUTPUT_TARGET);

        resolve('success');
      } catch (err) {
        console.error('error:', err);
        reject('error message');
      }
    });
  });
  plop.setGenerator('template', {
    description: 'Front - Angular Server Side Render - Beta',
    prompts: [
      {
        type: 'input',
        name: 'teamId',
        message: 'Nombre de cuenta (ej: payments, quiero, zumo, etc)',
        khatu: {
          showAs: 'hidden',
        },
      },
      {
        type: 'confirm',
        name: 'gitlab',
        message: 'Deploy in gitlab.com?',
        default: true,
        khatu: {
          showAs: 'hidden',
        },
      },
      {
        type: 'input',
        name: 'name',
        message: 'Nombre de la aplicación (ej: front-zumo-web), asi quedara en gitlab',
        validate: (name) => {
          if (name.match(/front\-(.*)\-web$/)) {
            return true;
          }
          return 'Ingrese un nombre con este patron front-<nombre>-web';
        },
        khatu: {
          showAs: 'input',
          validate: {
            regexp: 'front\-(.*)\-web$',
            message: 'Ingrese un nombre que termine en front-<nombre>-web',
          },
        },
      },
      {
        type: 'list',
        name: 'infrastructure',
        message: 'Tipo de Stack, por defecto es kubernetes',
        choices: [
          { name: "Serverless ... aun no disponible!", value: "serverless" },
          { name: "Kubernetes", value: "kubernetes" }
        ],
        default: "kubernetes",
        khatu: {
          showAs: 'list'
        },
      },
    ],
    actions: (data) => {
      const resolveRepo = data.gitlab ? 'gitlab-dot-com' : 'cmprod';
      templateInfra = `${path.join(__dirname, '/generators/infrastructure')}/${resolveRepo}-${data.infrastructure}.yaml`;
      return [
        {
          type: 'add',
          path: `${OUTPUT_TARGET}/.gitlab-ci.yml`,
          templateFile: templateInfra,
          force: true,
        },
        {
          destination: OUTPUT_TARGET,
          templateFiles: './generators/templates/**/*',
          globOptions: {
            dot: true,
          },
          force: true,
          type: 'addMany',
          base: './generators/templates',
        },
        {
          type: 'globals',
        },
      ]
    }
  });
};
