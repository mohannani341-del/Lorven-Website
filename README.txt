DR NTR BIOSCIENCES / LORVEN PREMIUM WEBSITE PROTOTYPE
======================================================

FILES
- index.html: responsive homepage
- css/style.css: full theme and responsive styles
- js/app.js: light/dark toggle, mobile navigation, product search/filter and testimonial carousel controls
- assets/products.json: selected public-reference product names, short descriptions and image URLs
- assets/hero-poster.svg: locally included fallback poster for the full-screen hero video
- assets/hero-lab.mp4: ADD YOUR AUTHORIZED COMPANY VIDEO HERE (not included)

RUN LOCALLY
Recommended: use VS Code Live Server, or from this folder run:
  python -m http.server 8000
Then open http://localhost:8000

PRODUCT IMAGES / ORIGINAL CONTENT
This prototype references public product image URLs hosted on drntrbiosciences.com and includes selected product names/categories taken from public reference pages. Images therefore require internet access and could change or stop loading if the source site changes. The original full media library has NOT been bundled. To make the project fully self-contained, download the approved original images into assets/ and update assets/products.json image fields to local paths. Confirm rights/permission before republishing logos, images, text, or testimonials.

VIDEO
Place an authorized compressed MP4 named assets/hero-lab.mp4. The hero is already configured for autoplay, muted, looping and inline playback, with a poster fallback. Use a compressed video and retain the poster for mobile/reduced-motion visitors.

IMPORTANT CONTENT CHECKS BEFORE PRODUCTION
- Confirm current product range, model names, specifications, availability and claims with the company.
- Verify testimonial authenticity, exact wording, names, and permission to publish.
- Confirm contact details and company facts.
- Connect the enquiry form/email workflow to an approved endpoint if you need form submissions; current CTA opens a pre-addressed email.
- Add privacy policy, cookie consent if required, security headers, analytics if desired, and production SEO/social metadata.
- Confirm authorization to reuse the company's brand assets.

The site is a polished starter project, not a recovered copy of the original site's private source code.

Homepage statistics: the demo uses the public reference-site figures 1,000+ customers, 400+ channel partners, 100+ employees and 2+ country presence. The counters animate from 10 on each fresh homepage visit. Please verify the figures with the company before publishing.
