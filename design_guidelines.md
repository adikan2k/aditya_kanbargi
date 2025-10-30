# Design Guidelines: Professional Portfolio with Appointment Booking

## Design Approach
**Reference-Based Approach** drawing from modern portfolio leaders (Dribbble, Behance) combined with Linear's clean professionalism and Notion's friendly accessibility. Focus on creating an impressive first impression that positions the job seeker as a modern, professional candidate while making appointment booking effortless.

## Layout System
**Spacing:** Use Tailwind units of 2, 4, 6, 8, 12, 16, 20, and 24 for consistent rhythm. Primary spacing: p-8, py-16, py-24 for sections; gap-6, gap-8 for content groups.

**Container Strategy:**
- Full-width sections with inner max-w-6xl for primary content
- max-w-4xl for text-focused content like bio
- max-w-7xl for project galleries

## Typography Hierarchy

**Font Families:**
- Headings: Inter (weights 600, 700, 800)
- Body: Inter (weights 400, 500)
- Accent/Numbers: Space Mono (weight 400) for appointment times and dates

**Hierarchy:**
- Hero Headline: text-5xl md:text-6xl lg:text-7xl, font-bold, leading-tight
- Section Headings: text-3xl md:text-4xl, font-semibold
- Subsection Headings: text-xl md:text-2xl, font-semibold
- Card Titles: text-lg md:text-xl, font-semibold
- Body Text: text-base, leading-relaxed
- Small Text/Labels: text-sm, font-medium
- Micro Copy: text-xs, uppercase, tracking-wide, font-medium

## Core Page Sections

### 1. Hero Section (100vh on desktop, 80vh on mobile)
Large, professional hero image with gradient overlay (diagonal split or bottom-to-top fade). Position: split-screen layout with left side containing professional headshot/workspace photo, right side with content. Include:
- Name in extra-large typography
- Professional tagline/current role
- Two CTAs: Primary "Book a Meeting" (prominent), Secondary "View My Work" (ghost button with blurred background)
- Brief availability indicator ("Available for opportunities • Responding within 24h")

### 2. About/Bio Section
Single column, max-w-4xl centered layout. Include:
- Section heading "About Me"
- 2-3 paragraph professional bio with strong opening hook
- Skills grid: 3-column grid (md:grid-cols-3) with skill categories and proficiency indicators
- Key achievements in card format with icons
- Professional stats row (years experience, projects completed, clients served)

### 3. Projects Showcase
Masonry-style grid (2 columns on tablet, 3 on desktop) with varied heights. Each project card includes:
- Featured project image (2:3 or 16:9 aspect ratio)
- Project title and brief description
- Technology tags as pills
- Hover state reveals "View Details" overlay
- Filter tabs at top for project categories (All, Web, Mobile, Design, etc.)

### 4. Interactive Appointment Booking
Two-column layout on desktop (calendar left, form right), stacked on mobile:
- Calendar widget showing available time slots with clear availability indicators
- Selected time highlights prominently
- Booking form fields: Name, Email, Phone (optional), Meeting Purpose (dropdown), Additional Notes (textarea)
- Meeting duration selector (15min, 30min, 60min)
- Time zone auto-detection display
- Clear "Confirm Booking" button
- Visual confirmation state with appointment summary card

### 5. Testimonials/Recommendations (if applicable)
Horizontal scroll carousel on mobile, 2-column grid on desktop. Each testimonial includes:
- Quote text with large opening quotation mark
- Client/colleague name, role, and company
- Small profile image or company logo
- Star rating or LinkedIn recommendation badge

### 6. Contact Section
Two-column split (60/40):
- Left: Contact form (Name, Email, Message) with submission success state
- Right: Contact information with icons (email, phone, location, LinkedIn, GitHub)
- Quick meeting link: "Can't wait? Book directly →" with inline calendar preview
- Response time commitment display

### 7. Footer
Rich footer with three columns:
- Column 1: Brief bio snippet and profile photo thumbnail
- Column 2: Quick navigation links
- Column 3: Connect section with social links and newsletter signup
- Bottom bar: Copyright and "Built with [tech stack]" credits

## Component Specifications

**Navigation:**
Fixed header with blur background (backdrop-blur-md), appears on scroll. Logo/name on left, navigation links center, "Book Meeting" CTA button on right.

**Buttons:**
- Primary: Solid with rounded-lg, px-6 py-3, font-medium, hover lifts slightly
- Secondary: Border with rounded-lg, px-6 py-3, hover fills
- Buttons on images: Backdrop-blur-md background, border, no hover background changes

**Cards:**
- Project cards: rounded-xl, subtle shadow (shadow-md), hover elevates (shadow-xl)
- Info cards: rounded-lg, border, p-6
- Testimonial cards: rounded-xl, border, p-8

**Forms:**
- Input fields: rounded-lg, border, px-4 py-3, focus ring
- Labels: text-sm, font-medium, mb-2
- Error states: red border with helper text below
- Success states: green border with checkmark icon

**Calendar Widget:**
- Month view with grid layout
- Available dates: interactive, hover highlights
- Unavailable dates: reduced opacity, not clickable
- Selected date: filled with primary treatment
- Time slots below calendar: pill-shaped buttons in grid

## Images Strategy

**Hero Section:** Full-width professional photograph - either clean workspace setup, professional headshot environment, or industry-relevant contextual image. Use high-quality stock from Unsplash (keywords: "professional workspace", "modern office", "creative professional").

**About Section:** Include professional headshot (circular frame, shadow-lg) aligned with bio text.

**Project Showcase:** Each project requires featured image - screenshots, mockups, or project photography. Use aspect-ratio-box to maintain consistent sizing.

**Decorative Elements:** Abstract geometric illustrations in background of bio section (subtle opacity), minimal line art illustrations accompanying skills/achievements.

**Testimonial Section:** Small circular profile images or company logos next to each testimonial.

## Accessibility & Interactions

- Focus states: 2px ring offset on all interactive elements
- Skip navigation link for keyboard users
- ARIA labels on all icon-only buttons
- Form validation with clear error messaging
- Success animations: subtle scale and fade-in on confirmation
- Loading states: skeleton screens for calendar while fetching availability
- Mobile: Touch targets minimum 44x44px, adequate spacing between interactive elements

## Responsive Behavior

**Breakpoints:**
- Mobile: Single column, stacked sections, horizontal scroll for project filter
- Tablet (md): 2-column grids, side-by-side forms
- Desktop (lg): 3-column grids, split sections, fixed navigation

**Mobile Optimizations:**
- Hero reduces to 80vh with content below fold
- Projects grid to 1 column with card view
- Calendar becomes vertical selection flow
- Footer columns stack vertically
- Navigation collapses to hamburger menu