const fs = require('fs');
const path = require('path');

const rootDir = process.cwd();

// 1. Fix Logo in DbrTs_I5.js
const entryFile = path.join(rootDir, '_nuxt/DbrTs_I5.js');
if (fs.existsSync(entryFile)) {
    let content = fs.readFileSync(entryFile, 'utf8');
    // Replace the failed $t call with a conditional based on known translated string
    content = content.replace(/s\.\$t\("navigation\.name"\)/g, '(s.$t("navigation.home").includes("Home")?"Levitsky":"Левицкий")');
    fs.writeFileSync(entryFile, content);
    console.log('Fixed DbrTs_I5.js logo logic');
}

// 2. Fix Hero in ajyh9-bm.js
const heroFile = path.join(rootDir, '_nuxt/ajyh9-bm.js');
if (fs.existsSync(heroFile)) {
    let content = fs.readFileSync(heroFile, 'utf8');
    // Replace the failed $t call. i is the scope there.
    content = content.replace(/de\(i\.\$t\("hero\.name"\)\)/g, '(i.$t("navigation.home").includes("Home")?"Levitsky":"Левицкий")');
    fs.writeFileSync(heroFile, content);
    console.log('Fixed ajyh9-bm.js hero logic');
}

// 3. Clean up the failed keys in i18n files just in case
const enFile = path.join(rootDir, '_nuxt/NR4mUFQZ.js');
if (fs.existsSync(enFile)) {
    let content = fs.readFileSync(enFile, 'utf8');
    content = content.replace('name:{t:0,b:{t:2,i:[{t:3}],s:"Levitsky"}},', '');
    fs.writeFileSync(enFile, content);
}
const ruFile = path.join(rootDir, '_nuxt/DtZD880f.js');
if (fs.existsSync(ruFile)) {
    let content = fs.readFileSync(ruFile, 'utf8');
    content = content.replace('name:{t:0,b:{t:2,i:[{t:3}],s:"Левицкий"}},', '');
    fs.writeFileSync(ruFile, content);
}

console.log('Locale logic fallback applied.');
