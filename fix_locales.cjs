const fs = require('fs');
const path = require('path');

const rootDir = process.cwd();

// 1. Fix EN i18n file (NR4mUFQZ.js)
const enFile = path.join(rootDir, '_nuxt/NR4mUFQZ.js');
if (fs.existsSync(enFile)) {
    let content = fs.readFileSync(enFile, 'utf8');
    // Replace all cyrillic Levitsky with English
    content = content.replace(/Левицкий/g, 'Levitsky');
    // Add name key to navigation and hero
    // navigation:{...} -> navigation:{name:{t:0,b:{t:2,i:[{t:3}],s:"Levitsky"}},...}
    content = content.replace('navigation:{', 'navigation:{name:{t:0,b:{t:2,i:[{t:3}],s:"Levitsky"}},');
    content = content.replace('hero:{', 'hero:{name:{t:0,b:{t:2,i:[{t:3}],s:"Levitsky"}},');
    fs.writeFileSync(enFile, content);
    console.log('Fixed EN i18n');
}

// 2. Fix RU i18n file (DtZD880f.js)
const ruFile = path.join(rootDir, '_nuxt/DtZD880f.js');
if (fs.existsSync(ruFile)) {
    let content = fs.readFileSync(ruFile, 'utf8');
    // Add name key to navigation and hero
    content = content.replace('navigation:{', 'navigation:{name:{t:0,b:{t:2,i:[{t:3}],s:"Левицкий"}},');
    content = content.replace('hero:{', 'hero:{name:{t:0,b:{t:2,i:[{t:3}],s:"Левицкий"}},');
    fs.writeFileSync(ruFile, content);
    console.log('Fixed RU i18n');
}

// 3. Patch DbrTs_I5.js for Dynamic Logo
const entryFile = path.join(rootDir, '_nuxt/DbrTs_I5.js');
if (fs.existsSync(entryFile)) {
    let content = fs.readFileSync(entryFile, 'utf8');
    // Find logo text pattern and replace with $t call
    // Old: ...i[0]||(i[0]=[Te("span",{class:"logo-text"},"Левицкий",-1)])
    // We replace the whole cached block with a dynamic call.
    // Note: s is available in scope. We need de (toDisplayString) which is 't' in exports but internally might be different.
    // Actually, Vue 3 createElementVNode (Te) can take a string from s.$t directly.
    content = content.replace(/\.\.\.i\[0\]\|\|\(i\[0\]=\[Te\("span",\{class:"logo-text"\},"Левицкий",-1\)\]\)/g, 'Te("span",{class:"logo-text"},s.$t("navigation.name"),1)');
    fs.writeFileSync(entryFile, content);
    console.log('Patched DbrTs_I5.js logo');
}

// 4. Patch ajyh9-bm.js for Dynamic Hero Name
const heroFile = path.join(rootDir, '_nuxt/ajyh9-bm.js');
if (fs.existsSync(heroFile)) {
    let content = fs.readFileSync(heroFile, 'utf8');
    // Old: E("span",{class:"highlight"},"Левицкий",-1)
    // In this file, de is available as the text interpolator. Scope is 'i'.
    content = content.replace(/E\("span",\{class:"highlight"\},"Левицкий",-1\)/g, 'E("span",{class:"highlight"},de(i.$t("hero.name")),1)');
    fs.writeFileSync(heroFile, content);
    console.log('Patched ajyh9-bm.js hero name');
}

// 5. Update HTML files for default EN state
['index.html', '200.html', '404.html'].forEach(f => {
    const fp = path.join(rootDir, f);
    if (fs.existsSync(fp)) {
        let content = fs.readFileSync(fp, 'utf8');
        // Replace logo text in static HTML
        content = content.replace(/<span class="logo-text"[^>]*>Левицкий<\/span>/g, '<span class="logo-text" data-v-30cc90ee>Levitsky</span>');
        // Replace highlight in hero
        content = content.replace(/<span class="highlight"[^>]*>Левицкий<\/span>/g, '<span class="highlight" data-v-818d3610>Levitsky</span>');
        // Replace titles/meta
        content = content.replace(/<title>Левицкий/g, '<title>Levitsky');
        content = content.replace(/content="Левицкий"/g, 'content="Levitsky"');
        content = content.replace(/"name":"Левицкий"/g, '"name":"Levitsky"');
        fs.writeFileSync(fp, content);
        console.log(`Updated HTML ${f}`);
    }
});

console.log('All locale fixes applied.');
