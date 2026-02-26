#!/usr/bin/env node
/**
 * add-photos.js — Adds real photos to About and Children pages
 * 
 * Before running: place these files in public/images/
 *   - bryan-with-anat-baniel.png
 *   - abm-graduation-ceremony.png
 *   - fs-session-child-toys.jpg
 *   - fs-session-child-reading.jpg
 *   - fs-session-child-ambulance.jpg
 * 
 * Run: node add-photos.js
 */
const fs = require('fs');
const path = require('path');

const ABOUT = path.join(__dirname, 'src/app/about/page.tsx');
const CHILDREN = path.join(__dirname, 'src/app/children/page.tsx');

// ──────────────────────────────
// 1. ABOUT PAGE — Add Training & Lineage section before CTA
// ──────────────────────────────
let about = fs.readFileSync(ABOUT, 'utf8');

const trainingSection = `
      {/* Training & Lineage */}
      <Section variant="light">
        <SectionHeader
          eyebrow="Training & Lineage"
          title="Trained by the Creator of the Method"
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
          <div>
            <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-lg">
              <Image
                src="/images/bryan-with-anat-baniel.png"
                alt="Bryan Thunstrom with Anat Baniel, creator of the Anat Baniel Method"
                width={600}
                height={750}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
          <div>
            <div className="prose-nr">
              <p>
                I had the privilege of training directly under <strong>Anat Baniel</strong> —
                the creator of the Anat Baniel Method&reg; NeuroMovement&reg; and a former
                student of Dr. Moshe Feldenkrais himself. This direct lineage means the work
                I bring to every session carries the depth and precision of the method&apos;s
                original source.
              </p>
              <p>
                Anat&apos;s genius lies in translating cutting-edge neuroscience into practical,
                gentle movement that the brain can actually use. Her work with children with
                special needs and adults facing limitations has been featured in peer-reviewed
                research and transformed thousands of lives worldwide.
              </p>
              <p>
                Training with Anat wasn&apos;t just education — it was transformation. It
                changed how I understand the brain, movement, and what&apos;s possible when
                we stop forcing and start listening.
              </p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="prose-nr">
              <h3 className="font-display text-2xl text-brand-900 mb-4">
                Certification &amp; Continuing Education
              </h3>
              <p>
                After completing the rigorous ABM NeuroMovement&reg; practitioner training
                program, I received my certification alongside fellow practitioners who
                share a commitment to this brain-based approach. The training included
                hundreds of hours of hands-on practice, anatomy study, and supervised
                clinical work with both children and adults.
              </p>
              <p>
                I continue to deepen my practice through ongoing education, mentorship,
                and collaboration with the global ABM community.
              </p>
            </div>
          </div>
          <div>
            <div className="aspect-[16/9] rounded-3xl overflow-hidden shadow-lg">
              <Image
                src="/images/abm-graduation-ceremony.png"
                alt="Bryan Thunstrom at ABM NeuroMovement practitioner certification ceremony with Anat Baniel and Marcy Lindheimer"
                width={900}
                height={506}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </Section>
`;

// Insert before CTA section
about = about.replace(
  '      {/* CTA */}',
  trainingSection + '\n      {/* CTA */}'
);

fs.writeFileSync(ABOUT, about, 'utf8');
console.log('✅ About page updated — Training & Lineage section added');


// ──────────────────────────────
// 2. CHILDREN PAGE — Replace hero image + add session gallery
// ──────────────────────────────
let children = fs.readFileSync(CHILDREN, 'utf8');

// Replace the generic hero image with a real FS session photo
children = children.replace(
  `<Image
                src="/images/functional-integration-session.jpg"
                alt="Gentle hands-on NeuroMovement session with a child"
                width={600}
                height={750}
                className="object-cover w-full h-full"
                priority
              />`,
  `<Image
                src="/images/fs-session-child-toys.jpg"
                alt="Bryan Thunstrom working with a child in a Functional Synthesis session while mother participates"
                width={600}
                height={750}
                className="object-cover w-full h-full"
                priority
              />`
);

// Add photo gallery in "What a Session Looks Like" section — after the prose
const sessionGallery = `
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-md">
              <Image
                src="/images/fs-session-child-toys.jpg"
                alt="Functional Synthesis session — practitioner and child exploring movement through play with mother present"
                width={500}
                height={375}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-md">
              <Image
                src="/images/fs-session-child-reading.jpg"
                alt="Practitioner reading with child during Functional Synthesis session — learning through connection"
                width={500}
                height={375}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-md">
              <Image
                src="/images/fs-session-child-ambulance.jpg"
                alt="Child engaging with toys during a gentle NeuroMovement session with parents present"
                width={500}
                height={375}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
          <p className="text-center text-sm text-brand-400 mt-4 italic">
            Real Functional Synthesis sessions with children — gentle, playful, and always with family present.
          </p>`;

// Insert gallery after the last </p> in the "What a Session Looks Like" prose
children = children.replace(
  `Sessions typically last <strong>30 to 45 minutes</strong> for children,
              depending on their age, attention, and energy. Young children and infants
              may have shorter sessions. We always honor what your child needs in the
              moment.
            </p>
          </div>
        </div>
      </Section>`,
  `Sessions typically last <strong>30 to 45 minutes</strong> for children,
              depending on their age, attention, and energy. Young children and infants
              may have shorter sessions. We always honor what your child needs in the
              moment.
            </p>
          </div>${sessionGallery}
        </div>
      </Section>`
);

fs.writeFileSync(CHILDREN, children, 'utf8');
console.log('✅ Children page updated — real session photos added');

console.log('\n🎉 All pages updated! Run: git add . && git commit -m "Add real session and training photos" && git push');
