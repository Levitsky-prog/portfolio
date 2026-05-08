const fs = require('fs');
const path = require('path');

const targetFile = path.join(process.cwd(), '_nuxt/5AFuoeiE_fix.js');
if (!fs.existsSync(targetFile)) {
    console.error('File not found');
    process.exit(1);
}

let content = fs.readFileSync(targetFile, 'utf8');

const projects = [
  {
    title: "VELVET BEAN",
    description: "Specialty Coffee Roastery & Cafe. Fresh roast every morning. Character in every cup.",
    date: "2026-05-15",
    meta: {
      slug: "velvet-bean",
      type: "website",
      stage: "completed",
      featured: true,
      technologies: ["Premium", "Roastery", "Cafe"],
      color: "#3d2b1f",
      image: "/portfolio/images/projects/velvet-bean.png",
      icon: "VB"
    },
    _path: "https://levitsky-prog.github.io/projects/velvet-bean/"
  },
  {
    title: "BLOOM & SHADE",
    description: "Premium Flower Studio. Exotic arrangements and seasonal stories told through flowers.",
    date: "2026-05-01",
    meta: {
      slug: "bloom-shade",
      type: "website",
      stage: "completed",
      featured: true,
      technologies: ["Floral", "Luxury", "Design"],
      color: "#1a2e1a",
      image: "/portfolio/images/projects/bloom-shade.png",
      icon: "BS"
    },
    _path: "https://levitsky-prog.github.io/projects/bloom-shade/"
  },
  {
    title: "SILENT SHINE",
    description: "Premium Car Detailing Studio. We don't wash cars, we revive them. Studio level care.",
    date: "2026-04-15",
    meta: {
      slug: "silent-shine",
      type: "website",
      stage: "completed",
      featured: true,
      technologies: ["Detailing", "Automotive", "High-Tech"],
      color: "#000000",
      image: "/portfolio/images/projects/silent-shine.png",
      icon: "SS"
    },
    _path: "https://levitsky-prog.github.io/projects/silent-shine/"
  },
  {
    title: "LUNA CRUST",
    description: "Artisan Bakery & Pastry. 36-hour sourdough and French butter. Hand-crafted perfection.",
    date: "2026-04-01",
    meta: {
      slug: "luna-crust",
      type: "website",
      stage: "completed",
      featured: true,
      technologies: ["Bakery", "Artisan", "Food"],
      color: "#f5f5dc",
      image: "/portfolio/images/projects/luna-crust.png",
      icon: "LC"
    },
    _path: "https://levitsky-prog.github.io/projects/luna-crust/"
  },
  {
    title: "FORGE BARBER",
    description: "Premium Men’s Grooming. Real man starts with details. Brutal elegance and atmosphere.",
    date: "2026-03-15",
    meta: {
      slug: "forge-barber",
      type: "website",
      stage: "completed",
      featured: true,
      technologies: ["Barber", "Grooming", "Men"],
      color: "#4a0404",
      image: "/portfolio/images/projects/forge-barber.png",
      icon: "FB"
    },
    _path: "https://levitsky-prog.github.io/projects/forge-barber/"
  },
  {
    title: "HAVEN STUDIO",
    description: "Private Wellness & Yoga. Regain silence and energy. Minimalist space for the soul.",
    date: "2026-02-15",
    meta: {
      slug: "haven-studio",
      type: "website",
      stage: "completed",
      featured: true,
      technologies: ["Wellness", "Yoga", "Zen"],
      color: "#ffffff",
      image: "/portfolio/images/projects/haven-studio.png",
      icon: "HS"
    },
    _path: "https://levitsky-prog.github.io/projects/haven-studio/"
  },
  {
    title: "OAK & BARREL",
    description: "Wine & Cheese Boutique. Wine that tells a story. Curated selection for connoisseurs.",
    date: "2026-01-10",
    meta: {
      slug: "oak-barrel",
      type: "website",
      stage: "completed",
      featured: true,
      technologies: ["Wine", "Cheese", "Boutique"],
      color: "#2d0a0a",
      image: "/portfolio/images/projects/oak-barrel.png",
      icon: "OB"
    },
    _path: "https://levitsky-prog.github.io/projects/oak-barrel/"
  },
  {
    title: "THREAD & NEEDLE",
    description: "Premium Tailoring Atelier. Clothes that fit perfectly. Bespoke suits and alterations.",
    date: "2025-12-05",
    meta: {
      slug: "thread-needle",
      type: "website",
      stage: "completed",
      featured: true,
      technologies: ["Tailoring", "Bespoke", "Fashion"],
      color: "#000080",
      image: "/portfolio/images/projects/thread-needle.png",
      icon: "TN"
    },
    _path: "https://levitsky-prog.github.io/projects/thread-needle/"
  }
];

// 1. Update the fallback 'm' array
const mMatch = content.match(/const m=\[\[(.*?)\]\]/);
if (mMatch) {
    const newM = `const m=[${JSON.stringify(projects)}]`; // Nuxt usually wraps it in one array, but let's check
    // Actually, looking at the file, it is m=[[{...}]]
    const newMFinal = `const m=[${JSON.stringify(projects)}]`;
    content = content.replace(/const m=\[\[.*?\]\]/, newMFinal);
}

// 2. Force loadAllProjects and loadProjectBySlug to use our data exclusively
// Find the loadAllProjects:async t=>{...} pattern
// Original: loadAllProjects:async t=>{try{const c=t||"en",i=o("projects",c,"all");if(n.value.has(i))return n.value.get(i);const f=await s(c)||m;return n.value.set(i,f),f}catch(c){return console.error("Ошибка загрузки проектов:",c),m}}
content = content.replace(/loadAllProjects:async t=>{.*?return n\.value\.set\(i,f\),f}catch\(c\){.*?return console\.error\("Ошибка загрузки проектов:",c\),m}}/, 
    `loadAllProjects:async t=>{const c=t||"en",i=o("projects",c,"all");if(n.value.has(i))return n.value.get(i);const f=m;return n.value.set(i,f),f}`);

// Find loadProjectBySlug:async(t,c)=>{...}
// Original: loadProjectBySlug:async(t,c)=>{try{const i=c||"ru",l=o("projects",i,`slug-${t}`);if(n.value.has(l)){const u=n.value.get(l);return(u&&u.length>0?u[0]:null)||null}const h=(await s(i)||[]).find(u=>u.meta?.slug===t)||null;return n.value.set(l,h?[h]:[]),h}catch(i){return console.error("Ошибка загрузки проекта:",i),null}}
content = content.replace(/loadProjectBySlug:async\(t,c\)=>{.*?return n\.value\.set\(l,h\?\[h\]:\[\]\),h}catch\(i\){.*?return console\.error\("Ошибка загрузки проекта:",i\),null}}/,
    `loadProjectBySlug:async(t,c)=>{const i=c||"ru",l=o("projects",i,\`slug-\${t}\`);if(n.value.has(l)){const u=n.value.get(l);return(u&&u.length>0?u[0]:null)||null}const h=m.find(u=>u.meta?.slug===t)||null;return n.value.set(l,h?[h]:[]),h}`);

fs.writeFileSync(targetFile, content);
console.log('Successfully patched 5AFuoeiE_fix.js to show only 8 new projects with custom dates.');
