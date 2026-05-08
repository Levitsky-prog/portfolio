const fs = require('fs');
const path = require('path');

const rootDir = process.cwd();

// Global replacement for social links and names
const replacements = [
    { from: /github\.com\/alexanderlevitsky/gi, to: 'github.com/Levitsky-prog' },
    { from: /t\.me\/alexanderlevitsky/gi, to: 't.me/Levitsky_prog' },
    { from: /threads\.com\/@alexanderlevitsky_/gi, to: 'threads.com/@levitsky_prog' },
    { from: /@alexanderlevitsky/gi, to: '@Levitsky_prog' }
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
        replacements.forEach(r => {
            content = content.replace(r.from, r.to);
        });
        if (content !== oldContent) {
            fs.writeFileSync(fp, content);
            console.log(`Updated social links in ${f}`);
        }
    }
});

console.log('Social link fixes applied.');
