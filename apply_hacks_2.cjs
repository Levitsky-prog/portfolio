const fs = require('fs');
const path = require('path');

const dir = __dirname;
const nuxtDir = path.join(dir, '_nuxt');

// We will modify C8MZNMkO.js to remove extra icons and keep only GitHub, Telegram, Threads.
const jsFiles = fs.readdirSync(nuxtDir).filter(f => f.endsWith('.js'));
for (const file of jsFiles) {
    const filePath = path.join(nuxtDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;

    // About Me section links
    if (content.includes('label:"CodePen"')) {
        const oldB = /b=\{code:\[.*?\],design:\[.*?\],alt:\[.*?\]\}/;
        const newB = `b={code:[{id:1,label:"GitHub",url:"https://github.com/alexanderlevitsky",icon:"simple-icons:github",color:"#000"}],design:[{id:2,label:"Telegram",url:"https://t.me/alexanderlevitsky",icon:"simple-icons:telegram",color:"#26a5e4"}],alt:[{id:4,label:"Threads",url:"https://www.threads.com/@alexanderlevitsky_",icon:"simple-icons:threads",color:"#0a0a0a"}]}`;
        if (oldB.test(content)) {
            content = content.replace(oldB, newB);
            changed = true;
            console.log('Updated About Me social links in', file);
        }
    }

    if (changed) {
        fs.writeFileSync(filePath, content);
    }
}

// Now we inject CSS directly into HTML files to prevent caching issues, and add .links .tabs
const cssToInject = `
<style>
.filters-container, .dropdown-filters, .project-tags, .links .tabs { display: none !important; }
.logo-link { margin-left: -20px !important; }
</style>
</head>`;

function walk(dirPath) {
    const items = fs.readdirSync(dirPath);
    for (const item of items) {
        const fullPath = path.join(dirPath, item);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            walk(fullPath);
        } else if (fullPath.endsWith('.html')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            
            // Avoid double injection
            if (!content.includes('.links .tabs { display: none !important; }')) {
                content = content.replace('</head>', cssToInject);
                fs.writeFileSync(fullPath, content);
                console.log('Injected CSS into HTML:', fullPath);
            }
        }
    }
}
walk(dir);
