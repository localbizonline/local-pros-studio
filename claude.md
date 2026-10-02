# Local Pros Studio - Reputation & Social Media

## Project Overview
A React/TypeScript marketing website for Local Pros Studio, focused on reputation management services (review collection and social media posting) for South African contractors.

## Tech Stack
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **Icons**: Lucide React
- **Deployment**: Netlify

## Project Structure
```
src/
├── App.tsx                 # Main app with navigation and routing
├── main.tsx               # Entry point
├── index.css              # Tailwind + custom styles
├── components/
│   ├── Home2Page.tsx      # Homepage - reviews & social focus
│   ├── ReviewCollectionPage.tsx  # Review collection service
│   ├── SocialMediaPage.tsx       # Social posting service
│   ├── WebDesignPage.tsx         # Web design service (R9,900)
│   ├── AboutPage.tsx             # About page
│   ├── Footer.tsx                # Site footer
│   ├── MobileCTA.tsx             # Mobile floating CTA
│   ├── ScrollToTop.tsx           # Scroll restoration
│   ├── SocialProofSection.tsx    # Testimonials/reviews
│   └── PortfolioGallery.tsx      # Portfolio for web design
└── assets/images/         # Logo, mockups, service images
```

## Routes
| Path | Component | Description |
|------|-----------|-------------|
| `/` | Home2Page | Main landing - reputation services |
| `/reviews` | ReviewCollectionPage | Review collection service |
| `/social-media` | SocialMediaPage | Social posting service |
| `/web-design` | WebDesignPage | Web design service |
| `/about` | AboutPage | Company info |

## Key Services & Pricing
- **Review Collection**: R1,200/month
- **Social Posting**: R2,000/month
- **Complete Package**: R1,250/month (50% beta discount)
- **Web Design**: R9,900 once-off

## Commands
```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run preview  # Preview production build
```

---

## Design System

### Design Philosophy
Following the [Frontend Aesthetics Cookbook](https://github.com/anthropics/claude-cookbooks/blob/main/coding/prompting_for_frontend_aesthetics.ipynb) principles to avoid generic "AI slop" aesthetics. This design uses bold, distinctive choices with a cohesive warm palette.

### Typography
**Fonts** (loaded from Google Fonts):
- **Headings**: Bricolage Grotesque (400-800 weight) - distinctive, bold display font
- **Body**: Source Sans 3 (400-700 weight) - clean, readable body text

**Avoid**: Inter, Roboto, Arial, system fonts (generic AI defaults)

**Sizing**:
- H1: 4xl/5xl/6xl with extrabold weight
- H2: 3xl/4xl with bold weight
- Body: base size with relaxed line height

### Color Palette

**Primary Accent - Warm Amber** (complements logo):
```
amber-50:  #fffbeb  (backgrounds)
amber-100: #fef3c7  (light accents)
amber-400: #fbbf24  (badges, highlights)
amber-500: #f59e0b  (primary buttons, CTAs)
amber-700: #b45309  (text on light backgrounds)
```

**Neutrals** (dark-first approach):
```
neutral-950: #0a0a0a (darkest backgrounds)
neutral-900: #171717 (dark sections)
neutral-800: #262626 (borders, cards on dark)
neutral-400: #a3a3a3 (muted text)
neutral-100: #f5f5f5 (light backgrounds)
```

**Never use**: Purple gradients, blue/indigo accents, evenly-distributed pastel palettes

### Backgrounds
Use atmospheric gradients instead of flat colors:

```css
/* Dark sections with warm glow */
.bg-dark-warm {
  background:
    radial-gradient(ellipse 80% 60% at 20% 100%, rgba(180, 83, 9, 0.2) 0%, transparent 50%),
    radial-gradient(ellipse 50% 50% at 90% 20%, rgba(245, 158, 11, 0.1) 0%, transparent 50%),
    linear-gradient(to bottom, #0a0a0a, #171717);
}

/* Light sections with subtle warmth */
.bg-warm-gradient {
  background:
    radial-gradient(ellipse 80% 50% at 20% 40%, rgba(251, 191, 36, 0.15) 0%, transparent 50%),
    radial-gradient(ellipse 60% 50% at 80% 60%, rgba(245, 158, 11, 0.1) 0%, transparent 50%);
}
```

### Component Classes
```css
.btn-primary     /* Dark/amber buttons with Bricolage font */
.btn-secondary   /* Outline buttons */
.badge           /* Amber-100 bg, amber-800 text */
.badge-dark      /* Dark bg, amber-400 text */
.card            /* White with soft shadow */
.section         /* Vertical padding py-16/24/32 */
.container-lg    /* Max 7xl with responsive padding */
```

### Motion
Focus on high-impact moments:
- Staggered fade-in-up on page load (delay-100 through delay-500)
- Subtle hover transforms on cards (translateY -2px)
- CSS-only animations for performance

### Icons
Use Lucide React. Common icons:
- Star, Share2, Zap (services)
- Check (feature lists)
- ArrowRight (CTAs)
- Phone, Mail, MapPin (contact)

---

## WhatsApp Contact
Primary CTA links to: `wa.me/27832336716`

## Related Projects
- Original full-service site: `../localprosstudio`
