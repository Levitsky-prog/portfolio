const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\seerd\\.gemini\\antigravity\\brain\\38020842-15b9-4a5b-ba96-c0f56c79807b';
const destDir = 'c:\\Users\\seerd\\OneDrive\\Desktop\\портфолио\\minion5_portfolio\\images\\projects';

if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

const mapping = {
    'velvet_bean_card': 'velvet-bean.png',
    'bloom_shade_card': 'bloom-shade.png',
    'silent_shine_card': 'silent-shine.png',
    'luna_crust_card': 'luna-crust.png',
    'forge_barber_card': 'forge-barber.png',
    'haven_studio_card': 'haven-studio.png',
    'oak_barrel_card': 'oak-barrel.png',
    'thread_needle_card': 'thread-needle.png'
};

fs.readdirSync(srcDir).forEach(file => {
    for (const [prefix, newName] of Object.entries(mapping)) {
        if (file.startsWith(prefix) && file.endsWith('.png')) {
            fs.copyFileSync(path.join(srcDir, file), path.join(destDir, newName));
            console.log(`Copied ${file} to ${newName}`);
        }
    }
});
