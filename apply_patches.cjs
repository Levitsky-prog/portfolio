const fs = require('fs');
const path = require('path');

// ---- 1. Patch ajyh9-bm.js: social links + logo name ----
let file1 = path.join(__dirname, '_nuxt/ajyh9-bm.js');
let c1 = fs.readFileSync(file1, 'utf8');

// Telegram
c1 = c1.replace(/https:\/\/t\.me\/alexanderlevitsky/g, 'https://t.me/Levitsky_prog');
// Threads
c1 = c1.replace(/https:\/\/www\.threads\.com\/@alexanderlevitsky_/g, 'https://www.threads.com/@levitsky_prog');
// Logo name
c1 = c1.replace(/"Alexander Levitsky"/g, '"Левицкий"');

fs.writeFileSync(file1, c1);
console.log('Patched ajyh9-bm.js');

// ---- 2. Patch C8MZNMkO.js: social links, remove Laptop tile, logo name ----
let file2 = path.join(__dirname, '_nuxt/C8MZNMkO.js');
let c2 = fs.readFileSync(file2, 'utf8');

// GitHub URL
c2 = c2.replace(/https:\/\/github\.com\/alexanderlevitsky\b/g, 'https://github.com/Levitsky-prog');
// Telegram URL
c2 = c2.replace(/https:\/\/t\.me\/alexanderlevitsky/g, 'https://t.me/Levitsky_prog');
// Threads URL
c2 = c2.replace(/https:\/\/www\.threads\.com\/@alexanderlevitsky_/g, 'https://www.threads.com/@levitsky_prog');
// Remove Laptop setup tile (the entire object)
c2 = c2.replace(/,\{category:"Laptop",tools:"Chuwi Corebook X 14",icon:"mingcute:monitor-fill"\}/g, '');
// Logo name if present
c2 = c2.replace(/"Alexander Levitsky"/g, '"Левицкий"');

fs.writeFileSync(file2, c2);
console.log('Patched C8MZNMkO.js');

// ---- 3. Patch DbrTs_I5.js: logo name in main bundle ----
let file3 = path.join(__dirname, '_nuxt/DbrTs_I5.js');
let c3 = fs.readFileSync(file3, 'utf8');

// GitHub source code link in header area
c3 = c3.replace(/https:\/\/github\.com\/alexanderlevitsky\/alexanderlevitsky\.github\.io/g, 'https://github.com/Levitsky-prog');
c3 = c3.replace(/https:\/\/github\.com\/alexanderlevitsky\b/g, 'https://github.com/Levitsky-prog');
c3 = c3.replace(/https:\/\/t\.me\/alexanderlevitsky/g, 'https://t.me/Levitsky_prog');
c3 = c3.replace(/https:\/\/www\.threads\.com\/@alexanderlevitsky_/g, 'https://www.threads.com/@levitsky_prog');

// Logo name: "Aleks Levitsky" pattern
c3 = c3.replace(/"Aleks Levitsky"/g, '"Левицкий"');
c3 = c3.replace(/Aleks Levitsky/g, 'Левицкий');

fs.writeFileSync(file3, c3);
console.log('Patched DbrTs_I5.js');

// ---- 4. Patch index.html, 200.html, 404.html: remove ym stubs, fix name ----
['index.html', '200.html', '404.html'].forEach(f => {
  const fp = path.join(__dirname, f);
  let c = fs.readFileSync(fp, 'utf8');
  // Remove ym stub
  c = c.replace('<script>window.ym = window.ym || function(){};</script>', '');
  // Remove Yandex noscript img
  c = c.replace(/<noscript><div><img src="https:\/\/mc\.yandex\.ru\/watch\/[^"]*"[^>]*><\/div><\/noscript>/g, '');
  // Remove Yandex preload link
  c = c.replace(/<link href="https:\/\/mc\.yandex\.ru\/metrika\/tag\.js"[^>]*>/g, '');
  fs.writeFileSync(fp, c);
  console.log('Cleaned', f);
});

console.log('All patches applied!');
