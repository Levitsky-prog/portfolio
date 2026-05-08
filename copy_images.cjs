const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\seerd\\.gemini\\antigravity\\brain\\38020842-15b9-4a5b-ba96-c0f56c79807b';
const destDir = 'c:\\Users\\seerd\\OneDrive\\Desktop\\портфолио\\minion5_portfolio\\images\\projects';

if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

const mapping = {
    'project_aether_card': 'aether.png',
    'project_lumen_card': 'lumen.png',
    'project_solace_card': 'solace.png',
    'project_void_card': 'void.png',
    'project_nexus_card': 'nexus.png',
    'project_obscura_card': 'obscura.png',
    'project_vanta_card': 'vanta.png',
    'project_eclipse_card': 'eclipse.png'
};

fs.readdirSync(srcDir).forEach(file => {
    for (const [prefix, newName] of Object.entries(mapping)) {
        if (file.startsWith(prefix) && file.endsWith('.png')) {
            fs.copyFileSync(path.join(srcDir, file), path.join(destDir, newName));
            console.log(`Copied ${file} to ${newName}`);
        }
    }
});
