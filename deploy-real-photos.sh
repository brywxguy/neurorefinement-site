#!/bin/bash
# NeuroRefinement — Replace stock photos with real images
# Run from: ~/Documents/GitHub/neurorefinement-site
# Usage: bash deploy-real-photos.sh

set -e

echo "🖼️  NeuroRefinement: Swapping stock photos for your real images..."
echo ""

# 1. Copy images to public directory
echo "📂 Copying images to public/images/..."
mkdir -p public/images
cp public/images/hero-atm-class.jpeg public/images/hero-atm-class.jpeg 2>/dev/null || true
cp public/images/bryan-headshot.jpeg public/images/bryan-headshot.jpeg 2>/dev/null || true
cp public/images/functional-synthesis-session.jpeg public/images/functional-synthesis-session.jpeg 2>/dev/null || true
echo "   ✅ Images in place"

# 2. Replace hero image (Unsplash yoga stock → ATM group class)
echo "🏠 Updating hero image..."
sed -i '' 's|https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800\&q=80|/images/hero-atm-class.jpeg|g' src/app/page.tsx
sed -i '' 's|alt="Gentle movement practice in a peaceful setting"|alt="Anat Baniel Method group class — students practicing gentle floor movements"|g' src/app/page.tsx
echo "   ✅ Hero → ATM group class photo"

# 3. Replace about section image (Unsplash meditation stock → Bryan headshot)
echo "👤 Updating about section image..."
sed -i '' 's|https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800\&q=80|/images/bryan-headshot.jpeg|g' src/app/page.tsx
sed -i '' 's|alt="Mindful movement and wellness practice"|alt="Bryan Thunstrom — ABM NeuroMovement Practitioner, Carlsbad CA"|g' src/app/page.tsx
echo "   ✅ About → Bryan headshot (B&W, coastal rocks)"

echo ""
echo "🎉 Done! Images swapped. Now run:"
echo "   git add -A"
echo "   git commit -m 'Replace stock photos with real images'"
echo "   git push"
echo ""
echo "Vercel will auto-deploy in ~60 seconds."
