const fs = require('fs');
const path = require('path');

const rootDir = process.cwd();

const files = [
    'index.html', '200.html', '404.html',
    '_nuxt/ajyh9-bm.js', '_nuxt/DbrTs_I5.js', '_nuxt/C8MZNMkO.js',
    '_nuxt/DtZD880f.js', '_nuxt/NR4mUFQZ.js'
];

files.forEach(f => {
    const fp = path.join(rootDir, f);
    if (fs.existsSync(fp)) {
        let content = fs.readFileSync(fp, 'utf8');
        let oldContent = content;

        // 1. Social URLs
        content = content.replace(/github\.com\/alexanderlevitsky/gi, 'github.com/Levitsky-prog');
        content = content.replace(/t\.me\/alexanderlevitsky/gi, 't.me/Levitsky_prog');
        content = content.replace(/threads\.com\/@alexanderlevitsky_/gi, 'threads.com/@levitsky_prog');
        content = content.replace(/@alexanderlevitsky/gi, '@Levitsky_prog');

        // 2. Branding (ensure consistency)
        // If it's a RU file, ensure "Левицкий". If it's EN, ensure "Levitsky".
        // Actually, my dynamic patch handles the Logo/Hero.
        // For static metadata in HTML, we use "Levitsky" as default.
        if (f.endsWith('.html')) {
            content = content.replace(/Alexander Levitsky/gi, 'Levitsky');
            content = content.replace(/Aleks Levitsky/gi, 'Levitsky');
        }

        if (content !== oldContent) {
            fs.writeFileSync(fp, content);
            console.log(`Deep cleaned ${f}`);
        }
    }
});

console.log('Final deep clean applied.');
