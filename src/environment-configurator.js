const mustache = require('mustache');
const { readFileSync, writeFileSync } = require('fs');
const firebaseConfig = require('../secrets/firebase-app-config.json');

const generateEnvironmentTs = () => {
    try {
        const view = { firebaseConfig }
        const template = readFileSync('src/environments/environment.mustache', 'utf-8');
        const output = mustache.render(template, view);
        
        writeFileSync('src/environments/environment.ts', output);
        
        console.info('environment.ts was successfully generated');
    } catch (e) {
        console.error('An error occured while generating environment.ts file');
        console.error(e.message)

    }
}

// Main
generateEnvironmentTs();
