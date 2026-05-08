const fs = require('fs');
const path = require('path');

const rootDir = process.cwd();

const projects = [
  {
    title: "AETHER",
    description: "Techwear Armor. Invisible urban protection. Control the city.",
    date: "2026-05-08",
    meta: {
      slug: "aether",
      type: "website",
      stage: "completed",
      featured: true,
      technologies: ["Techwear", "3D", "GSAP"],
      color: "#00f3ff",
      image: "/portfolio/images/projects/aether.png",
      icon: "A"
    },
    _path: "https://levitsky-prog.github.io/aether"
  },
  {
    title: "LUMEN",
    description: "AI Scent Studio. Molecular perfumery created by artificial intelligence.",
    date: "2026-05-08",
    meta: {
      slug: "lumen",
      type: "website",
      stage: "completed",
      featured: true,
      technologies: ["AI", "Luxury", "Liquid Metal"],
      color: "#ffcc00",
      image: "/portfolio/images/projects/lumen.png",
      icon: "L"
    },
    _path: "https://levitsky-prog.github.io/lumen"
  },
  {
    title: "SOLACE",
    description: "Private Membership Club. Where ambition becomes legacy.",
    date: "2026-05-08",
    meta: {
      slug: "solace",
      type: "website",
      stage: "completed",
      featured: true,
      technologies: ["Premium", "Minimalism", "Networking"],
      color: "#ffffff",
      image: "/portfolio/images/projects/solace.png",
      icon: "S"
    },
    _path: "https://levitsky-prog.github.io/solace"
  },
  {
    title: "VOID",
    description: "Generative Fashion. Clothing that doesn't exist yet. Genesis protocol.",
    date: "2026-05-08",
    meta: {
      slug: "void",
      type: "website",
      stage: "completed",
      featured: true,
      technologies: ["Generative", "Fashion", "Cyberpunk"],
      color: "#ff00ff",
      image: "/portfolio/images/projects/void.png",
      icon: "V"
    },
    _path: "https://levitsky-prog.github.io/void"
  },
  {
    title: "NEXUS ONE",
    description: "AI for Architects. Professional co-pilot for interior designers.",
    date: "2026-05-08",
    meta: {
      slug: "nexus-one",
      type: "website",
      stage: "completed",
      featured: true,
      technologies: ["AI", "Architecture", "3D"],
      color: "#4ade80",
      image: "/portfolio/images/projects/nexus.png",
      icon: "N"
    },
    _path: "https://levitsky-prog.github.io/nexus-one"
  },
  {
    title: "OBSCURA",
    description: "Analog-Digital Photography. Premium tools and community.",
    date: "2026-05-08",
    meta: {
      slug: "obscura",
      type: "website",
      stage: "completed",
      featured: true,
      technologies: ["Photography", "Cinematic", "Film Grain"],
      color: "#ef4444",
      image: "/portfolio/images/projects/obscura.png",
      icon: "O"
    },
    _path: "https://levitsky-prog.github.io/obscura"
  },
  {
    title: "VANTA",
    description: "Blackest Black Materials. Disappear in perfection. Extreme minimalism.",
    date: "2026-05-08",
    meta: {
      slug: "vanta",
      type: "website",
      stage: "completed",
      featured: true,
      technologies: ["Minimalism", "Materials", "Physics"],
      color: "#000000",
      image: "/portfolio/images/projects/vanta.png",
      icon: "V"
    },
    _path: "https://levitsky-prog.github.io/vanta"
  },
  {
    title: "ECLIPSE",
    description: "Electric Mobility. Ultra-premium electric motorcycles. Brutal elegance.",
    date: "2026-05-08",
    meta: {
      slug: "eclipse",
      type: "website",
      stage: "completed",
      featured: true,
      technologies: ["Electric", "Mobility", "Design"],
      color: "#3b82f6",
      image: "/portfolio/images/projects/eclipse.png",
      icon: "E"
    },
    _path: "https://levitsky-prog.github.io/eclipse"
  }
];

const targetFile = path.join(rootDir, '_nuxt/5AFuoeiE_fix.js');
if (fs.existsSync(targetFile)) {
    let content = fs.readFileSync(targetFile, 'utf8');
    // Replace the default projects array 'm'
    const startStr = 'const m=[';
    const endStr = '],P=';
    const startIndex = content.indexOf(startStr);
    const endIndex = content.indexOf(endStr, startIndex);

    if (startIndex !== -1 && endIndex !== -1) {
        const newArrayStr = startStr + JSON.stringify(projects) + ']';
        const newContent = content.substring(0, startIndex) + newArrayStr + content.substring(endIndex + 1);
        fs.writeFileSync(targetFile, newContent);
        console.log('Updated projects list in 5AFuoeiE_fix.js');
    } else {
        console.log('Could not find projects array markers');
    }
} else {
    console.log('Target file not found');
}
