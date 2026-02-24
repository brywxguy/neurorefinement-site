#!/usr/bin/env node
/**
 * NeuroRefinement Photo & Emoji Patch Script
 * Run from your project root: node apply-photo-update.js
 */

const fs = require('fs');
const path = require('path');

function patchFile(filePath, replacements) {
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  File not found: ${filePath} — skipping`);
    return false;
  }
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;
  
  for (const [search, replace, label] of replacements) {
    if (content.includes(search)) {
      content = content.replace(search, replace);
      console.log(`  ✅ ${label}`);
      changed = true;
    } else {
      console.log(`  ⏭️  Already applied or not found: ${label}`);
    }
  }
  
  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
  }
  return changed;
}

console.log('\n🔄 NeuroRefinement Photo & Emoji Update\n');
console.log('━'.repeat(50));

// --- 1. HOMEPAGE (page.tsx) ---
console.log('\n📄 Updating Homepage...');
const homePage = path.join('src', 'app', 'page.tsx');

patchFile(homePage, [
  // Hero image: swap Unsplash for local + add B&W filter
  [
    'src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80"',
    'src="/images/hero-atm-class.jpg"',
    'Hero image → ATM group class photo'
  ],
  [
    'alt="Gentle movement practice in a peaceful setting"',
    'alt="Awareness Through Movement group class — gentle floor-based movement lessons"',
    'Hero alt text updated'
  ],
  // Add grayscale filter to hero image
  [
    'className="object-cover w-full h-full"',
    'className="object-cover w-full h-full grayscale"',
    'Hero image → B&W grayscale filter'
  ],
  // About section image: swap for Bryan's headshot
  [
    'src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&q=80"',
    'src="/images/bryan-headshot.jpg"',
    'About section → Bryan headshot'
  ],
  [
    'src="https://images.unsplash.com/',
    'src="/images/bryan-headshot.jpg" data-was="https://images.unsplash.com/',
    'Fallback: catch any remaining Unsplash about image'
  ],
  // Fix lesson theme emojis
  ['emoji: "💪"', 'emoji: "🤲"', 'TOS emoji: flexed arm → open hands (gentle touch)'],
  ['emoji: "🏋️"', 'emoji: "🌊"', 'Athletic emoji: weightlifter → wave (Carlsbad)'],
  ['emoji: "🧘‍♀️"', 'emoji: "🌿"', 'Yoga emoji → leaf/nature (not yoga)'],
]);

// --- 2. ABOUT PAGE ---
console.log('\n📄 Updating About page...');
const aboutPage = path.join('src', 'app', 'about', 'page.tsx');

if (fs.existsSync(aboutPage)) {
  let aboutContent = fs.readFileSync(aboutPage, 'utf8');
  
  // Check if headshot is missing
  if (!aboutContent.includes('bryan-headshot')) {
    // Try to find the placeholder and replace it
    const placeholders = [
      'Photo coming soon',
      'https://images.unsplash.com/',
      'placeholder',
    ];
    
    let patched = false;
    for (const placeholder of placeholders) {
      if (aboutContent.includes(placeholder)) {
        // Find the img/Image tag context and replace src
        aboutContent = aboutContent.replace(
          /src="[^"]*(?:unsplash|placeholder)[^"]*"/,
          'src="/images/bryan-headshot.jpg"'
        );
        console.log('  ✅ About page headshot added');
        patched = true;
        break;
      }
    }
    
    if (!patched) {
      // If no placeholder found, add headshot after the first section/div
      console.log('  ⚠️  Could not find placeholder — adding headshot section');
      
      // Insert headshot image component if Image import exists
      if (aboutContent.includes("from 'next/image'")) {
        aboutContent = aboutContent.replace(
          /(<section[^>]*>)/,
          `$1\n          {/* Bryan Headshot */}\n          <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden shadow-warm-lg mx-auto mb-8">\n            <Image\n              src="/images/bryan-headshot.jpg"\n              alt="Bryan Thunstrom — Certified ABM NeuroMovement Practitioner"\n              fill\n              className="object-cover"\n              priority\n            />\n          </div>`
        );
        console.log('  ✅ Headshot section injected into About page');
      } else {
        // Add Image import
        aboutContent = aboutContent.replace(
          "import Link from 'next/link'",
          "import Link from 'next/link'\nimport Image from 'next/image'"
        );
        console.log('  ✅ Added Image import to About page');
      }
    }
    
    fs.writeFileSync(aboutPage, aboutContent, 'utf8');
  } else {
    console.log('  ⏭️  Headshot already present');
  }
} else {
  console.log('  ⚠️  About page not found at expected path');
}

// --- 3. SERVICES / FUNCTIONAL SYNTHESIS PAGE ---
console.log('\n📄 Checking Services pages...');
const fsPage = path.join('src', 'app', 'functional-synthesis', 'page.tsx');
const servicesPage = path.join('src', 'app', 'services', 'page.tsx');
const workPage = path.join('src', 'app', 'work-with-me', 'page.tsx');

for (const pagePath of [fsPage, servicesPage, workPage]) {
  if (fs.existsSync(pagePath)) {
    patchFile(pagePath, [
      [
        'src="https://images.unsplash.com/',
        'src="/images/functional-integration-session.jpg" data-was="https://images.unsplash.com/',
        `FI session photo added to ${path.basename(path.dirname(pagePath))}`
      ]
    ]);
  }
}

// --- 4. CONFIG - Fix any remaining emoji issues ---
console.log('\n📄 Checking config for emoji themes...');
const configPath = path.join('src', 'lib', 'config.ts');

if (fs.existsSync(configPath)) {
  patchFile(configPath, [
    ['💪', '🤲', 'Config: TOS emoji → gentle hands'],
    // Keep good ones as-is
  ]);
}

// --- SUMMARY ---
console.log('\n' + '━'.repeat(50));
console.log('✅ Update complete!\n');
console.log('Images added to public/images/:');
console.log('  • hero-atm-class.jpg (ATM group floor work)');
console.log('  • bryan-headshot.jpg (B&W coastal portrait)');
console.log('  • functional-integration-session.jpg (hands-on table work)');
console.log('  • abm-certificate.jpg (ABM practitioner certificate)');
console.log('\nNext steps:');
console.log('  git add -A');
console.log('  git commit -m "Add real photos, B&W hero, fix emojis"');
console.log('  git push');
console.log('\nVercel will auto-deploy in ~60 seconds after push. 🚀\n');
