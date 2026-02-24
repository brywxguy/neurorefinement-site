# NeuroRefinement Photo & Emoji Update
## Instructions for Bryan

### Step 1: Copy Images
Copy the entire `public/images/` folder from this zip into your project:
```
neurorefinement-site/public/images/
```

### Step 2: Apply Code Changes
Replace these files in your project with the ones from this zip:
- `src/app/page.tsx` → replaces your homepage
- `src/app/about/page.tsx` → replaces your about page

### Step 3: Deploy
```bash
cd ~/Documents/GitHub/neurorefinement-site
git add -A
git commit -m "Add real photos, B&W hero filter, fix lesson emojis"
git push
```

### What Changed
- Hero image: Your ATM group class photo (B&W filter applied via CSS)
- About section (homepage): Your B&W headshot with coastal rocks
- About page: Your headshot now visible
- Services reference: Kristi Drullard FI lesson photo
- Lesson theme emojis: Fixed awkward ones (TOS, etc.)
- Certificate image available at /images/abm-certificate.jpg
