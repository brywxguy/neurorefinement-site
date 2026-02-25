#!/usr/bin/env node
/**
 * NeuroRefinement Fix v3b — Amazon Affiliate Links
 * Run from repo root: node apply-affiliate-links.js
 * 
 * Updates Research page book links with your Amazon Associates tag: neurorefineme-20
 */

const fs = require('fs');

function readFile(p) { return fs.readFileSync(p, 'utf-8'); }
function writeFile(p, c) { fs.writeFileSync(p, c, 'utf-8'); console.log(`  ✅ ${p}`); }

console.log('🔧 Adding Amazon Affiliate Links\n');

let research = readFile('src/app/research/page.tsx');

// Replace each amazonSearch with a direct affiliate link
const replacements = [
  [
    "amazonSearch: 'Kids+Beyond+Limits+Anat+Baniel',",
    "amazonUrl: 'https://www.amazon.com/dp/0399537368?tag=neurorefineme-20',",
  ],
  [
    "amazonSearch: 'Move+Into+Life+Anat+Baniel',",
    "amazonUrl: 'https://www.amazon.com/dp/0307395294?tag=neurorefineme-20',",
  ],
  [
    "amazonSearch: 'Awareness+Through+Movement+Feldenkrais',",
    "amazonUrl: 'https://www.amazon.com/dp/0062503227?tag=neurorefineme-20',",
  ],
  [
    "amazonSearch: 'Body+Mature+Behavior+Feldenkrais',",
    "amazonUrl: 'https://www.amazon.com/dp/1583941150?tag=neurorefineme-20',",
  ],
  [
    "amazonSearch: 'Brain+Way+Healing+Norman+Doidge',",
    "amazonUrl: 'https://www.amazon.com/dp/0143128752?tag=neurorefineme-20',",
  ],
  [
    "amazonSearch: 'Soft+Wired+Merzenich',",
    "amazonUrl: 'https://www.amazon.com/dp/0989432823?tag=neurorefineme-20',",
  ],
];

for (const [old, rep] of replacements) {
  if (research.includes(old)) {
    research = research.replace(old, rep);
    console.log(`  ✅ ${old.substring(0, 50)}...`);
  } else {
    console.error(`  ❌ Not found: ${old.substring(0, 50)}...`);
  }
}

// Update the link template to use amazonUrl instead of amazonSearch
research = research.replace(
  'href={`https://www.amazon.com/s?k=${book.amazonSearch}`}',
  'href={book.amazonUrl}'
);

// Update the placeholder text at bottom
research = research.replace(
  'Book links coming soon — check back for direct purchase options.',
  'Book purchases through these links support NeuroRefinement at no extra cost to you.'
);

writeFile('src/app/research/page.tsx', research);

console.log('\n🎉 Affiliate links added! Run:');
console.log('   git add -A');
console.log('   git commit -m "Add Amazon Associates affiliate links (neurorefineme-20)"');
console.log('   git push');
