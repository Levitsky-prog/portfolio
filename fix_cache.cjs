const fs = require('fs');
const path = require('path');

const nuxtDir = path.join(__dirname, '_nuxt');
const oldFile = path.join(nuxtDir, '5AFuoeiE.js');
const newFileName = '5AFuoeiE_fix.js';
const newFile = path.join(nuxtDir, newFileName);

// 1. Read old file, replace content, write to new file
let content = fs.readFileSync(oldFile, 'utf8');
content = content.replace('const e=`/__nuxt_content/${o}/${r}`', 'const e=`/portfolio/__nuxt_content/${o}/${r}`');
fs.writeFileSync(newFile, content);
console.log('Created ' + newFileName);

// 2. Update references in all other files
const files = fs.readdirSync(nuxtDir);
for (const file of files) {
    if (!file.endsWith('.js') || file === newFileName) continue;
    const filePath = path.join(nuxtDir, file);
    let fileContent = fs.readFileSync(filePath, 'utf8');
    if (fileContent.includes('./5AFuoeiE.js')) {
        fileContent = fileContent.replace(/\.\/5AFuoeiE\.js/g, './' + newFileName);
        fs.writeFileSync(filePath, fileContent);
        console.log('Updated references in ' + file);
    }
}
