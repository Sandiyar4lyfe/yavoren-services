# Yavoren Services Website TODO

## Core Website Pages
- [x] Hero section with CTA buttons and partnership image
- [x] Stats banner (500+ workers, 8+ projects, 6 industries)
- [x] About Us section with company history
- [x] Vision and Mission cards
- [x] Services section (8 services with icons)
- [x] Project timeline (8 milestones with client details)
- [x] Industries We Serve section (6 industries)
- [x] Why Choose Us section (4 differentiators + standards)
- [x] Benefits for Businesses grid
- [x] Our Commitment section with quote
- [x] Footer with navigation links

## New Features (Added)
- [x] Contact form section (section 1.2) with name, email, phone, company, service, message fields
- [x] Contact form sends owner notification via tRPC
- [x] AI Chatbot floating widget (bottom-right corner)
- [x] Chatbot uses LLM with YAVOREN-specific system prompt
- [x] Chatbot supports multi-turn conversation history
- [x] Chatbot shows suggested prompts on first open
- [x] Mobile-responsive navigation with hamburger menu
- [x] Vitest tests for chatbot and contact form procedures (9 tests passing)

## Testimonials / Case Studies
- [x] Add Testimonials/Case Studies section with client success stories and metrics
- [x] Include client quotes, company names, project metrics (workers deployed, duration)
- [x] Add animated stat counters or highlight cards for key results
## Client Testimonial Submission
- [x] Add testimonials table to database schema (name, role, company, industry, quote, rating, status: pending/approved)
- [x] Add tRPC procedures: submitTestimonial (public) and getApprovedTestimonials (public)
- [x] Notify owner on new testimonial submission
- [x] Add testimonial submission form below existing case study cards
- [x] Display approved user-submitted testimonials dynamically from DB
- [x] Write vitest tests for testimonial procedures
