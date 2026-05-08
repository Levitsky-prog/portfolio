const fs = require('fs');
const path = require('path');

const dir = __dirname;
const nuxtDir = path.join(dir, '_nuxt');

// 1. Hide filters and adjust logo-link in entry CSS
const cssFiles = fs.readdirSync(nuxtDir).filter(f => f.endsWith('.css'));
for (const file of cssFiles) {
    if (file.startsWith('entry.')) {
        const filePath = path.join(nuxtDir, file);
        let content = fs.readFileSync(filePath, 'utf8');
        content += `\n.filters-container, .dropdown-filters, .project-tags { display: none !important; }\n.logo-link { margin-left: -20px; }\n`;
        fs.writeFileSync(filePath, content);
        console.log('Appended to', file);
    }
    // 2. Adjust support layout
    if (file.startsWith('support.')) {
        const filePath = path.join(nuxtDir, file);
        let content = fs.readFileSync(filePath, 'utf8');
        content = content.replace('grid-template-columns:1fr 1fr', 'grid-template-columns:1fr; max-width: 500px; margin: 0 auto;');
        fs.writeFileSync(filePath, content);
        console.log('Modified', file);
    }
}

// 3. Remove DALink, Boosty, YooMoney from JS chunk
const jsFiles = fs.readdirSync(nuxtDir).filter(f => f.endsWith('.js'));
for (const file of jsFiles) {
    const filePath = path.join(nuxtDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;

    if (content.includes('support.platformsList.dalink')) {
        content = content.replace(/h=\[\{label:o\("support\.platformsList\.dalink"\).*?color:"#8b3ffd"\}\]/, 'h=[]');
        changed = true;
        console.log('Cleared support links in', file);
    }

    if (content.includes('name:"LinkedIn"')) {
        content = content.replace(/a=\[\{name:"GitHub"[^\]]+\]/, 'a=[{name:"GitHub",url:"https://github.com/alexanderlevitsky",icon:"simple-icons:github",color:"#fff"},{name:"Telegram",url:"https://t.me/alexanderlevitsky",icon:"simple-icons:telegram",color:"#26a5e4"},{name:"Threads",url:"https://www.threads.com/@alexanderlevitsky_",icon:"simple-icons:threads",color:"#fff"}]');
        changed = true;
        console.log('Updated social links in', file);
    }

    if (changed) {
        fs.writeFileSync(filePath, content);
    }
}

// 4. Update HTML files for SSR social links
function walk(dirPath) {
    const items = fs.readdirSync(dirPath);
    for (const item of items) {
        const fullPath = path.join(dirPath, item);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            walk(fullPath);
        } else if (fullPath.endsWith('.html')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            // Remove the buttons-column entirely from support page
            if (content.includes('class="buttons-column"')) {
                content = content.replace(/<div class="buttons-column"[^>]*>.*?<\/div><div class="qr-card"/, '<div class="buttons-column" style="display:none"></div><div class="qr-card"');
            }
            
            // Replace the social links
            const githubLinkRegex = /<a href="https:\/\/github\.com\/alexanderlevitsky"[^>]+>.*?<\/a>/g;
            const linkedinLinkRegex = /<a href="https:\/\/www\.linkedin\.com\/in\/alexanderlevitsky\/"[^>]+>.*?<\/a>/g;
            const twitterLinkRegex = /<a href="https:\/\/x\.com\/alexanderlevitsky"[^>]+>.*?<\/a>/g;
            
            if (linkedinLinkRegex.test(content)) {
                content = content.replace(linkedinLinkRegex, '<a href="https://t.me/alexanderlevitsky" target="_blank" rel="noopener noreferrer" class="social-mini-btn" aria-label="Telegram" style="--hover-color:#26a5e4;" data-v-0df557f0><span class="iconify i-simple-icons:telegram" aria-hidden="true" style="font-size:20px;" data-v-0df557f0></span></a>');
            }
            if (twitterLinkRegex.test(content)) {
                content = content.replace(twitterLinkRegex, '<a href="https://www.threads.com/@alexanderlevitsky_" target="_blank" rel="noopener noreferrer" class="social-mini-btn" aria-label="Threads" style="--hover-color:#fff;" data-v-0df557f0><span class="iconify i-simple-icons:threads" aria-hidden="true" style="font-size:20px;" data-v-0df557f0></span></a>');
            }

            fs.writeFileSync(fullPath, content);
            console.log('Processed HTML:', fullPath);
        }
    }
}
walk(dir);
