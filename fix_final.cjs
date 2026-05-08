const fs = require('fs');
const path = require('path');

const rootDir = process.cwd();

// 1. Stub window.ym in DbrTs_I5.js
const entryFile = path.join(rootDir, '_nuxt/DbrTs_I5.js');
let entryContent = fs.readFileSync(entryFile, 'utf8');
// Replace window.ym(...) call with a safe check
entryContent = entryContent.replace(/window\.ym\(e,r,\.\.\.o\)/g, '(window.ym||(()=>{}))(e,r,...o)');
fs.writeFileSync(entryFile, entryContent);
console.log('Stubbed window.ym in DbrTs_I5.js');

// 2. Global name replacement
const variations = [
    /Alexander\s+Levitsky/gi,
    /Aleks\s+Levitsky/gi,
    /Aleksander\s+Levitsky/gi,
    /Александр\s+Левицкий/gi,
    /Александр\s+Левитский/gi
];

const filesToFix = [
    'index.html',
    '200.html',
    '404.html',
    '_nuxt/DbrTs_I5.js',
    '_nuxt/DtZD880f.js',
    '_nuxt/NR4mUFQZ.js',
    '_nuxt/ajyh9-bm.js'
];

filesToFix.forEach(f => {
    const fp = path.join(rootDir, f);
    if (fs.existsSync(fp)) {
        let content = fs.readFileSync(fp, 'utf8');
        let oldContent = content;
        variations.forEach(v => {
            content = content.replace(v, 'Левицкий');
        });
        if (content !== oldContent) {
            fs.writeFileSync(fp, content);
            console.log(`Replaced names in ${f}`);
        }
    }
});

// 3. Re-add window.ym stub to HTML files just in case, to be super safe against 500 errors
const ymStub = '<script>window.ym = window.ym || function(){};</script>';
['index.html', '200.html', '404.html'].forEach(f => {
    const fp = path.join(rootDir, f);
    if (fs.existsSync(fp)) {
        let content = fs.readFileSync(fp, 'utf8');
        if (!content.includes('window.ym = window.ym')) {
            content = content.replace('<head>', '<head>' + ymStub);
            fs.writeFileSync(fp, content);
            console.log(`Added ym stub to ${f}`);
        }
    }
});

console.log('All fixes applied.');
