# TaskFlow SaaS Landing Page

A complete, production-ready, highly interactive SaaS landing page designed for **TaskFlow** — a modern workflow platform. Built using standard, lightweight web technologies focusing on visual excellence, performance, accessibility, and modern responsive patterns.

## Tech Stack
* **HTML5**: Semantic tags, accessible layout structure.
* **CSS3**: Custom properties, Flexbox, CSS Grid, custom utility systems, transitions, and keyframe animations.
* **JavaScript (ES6+)**: Custom async/await API fetching, local storage dark/light theme management, accessible hamburger drawers, custom constraint-based client-side form validation.

## Project Structure
```
frontend-task/
├── index.html
├── css/
│   ├── style.css
│   └── responsive.css
├── js/
│   └── app.js
├── images/
│   └── hero.png
├── README.md
└── .gitignore
```

## Core Features
1. **Hero Section**: Responsive navigation bar with functional hamburger menu, theme toggle button, clean typography, CTA button with feedback, and a generated modern SaaS UI illustration.
2. **Features Grid**: A 6-card grid displaying product capabilities with CSS grid layouts, equal heights, SVG icons, and smooth scale/glow hover effects.
3. **Pricing Cards**: A 3-tier pricing layout (Starter, Professional, Enterprise) highlighting the "Professional" recommended tier with extra visual cues (gradient borders, scaling animations).
4. **Contact Form**: An accessible forms section featuring custom client-side validation logic, descriptive ARIA error logs, keyboard-friendly focus outline feedback, and a visual success dialog.
5. **Bonus Blog Section**: A dynamic section fetching recent data from the JSONPlaceholder API with active UI feedback states including:
   - Modern spinner loader.
   - User-friendly error panel with a retry action button.
   - Smooth card transitions.
6. **Dark Theme Toggle**: Seamless transition between Light Theme and Dark Theme with system/user preference loading from local storage.

## Accessibility Features (WCAG Compliance)
* Semantic HTML5 elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`).
* ARIA controls (`aria-expanded`, `aria-hidden`, `aria-live`, `aria-invalid`, roles).
* Keyboard navigation support (escape triggers for menus, explicit tab ordering, visible outline states).
* Contrast-checked colors for both light and dark modes.

## Performance Optimization
* **Deferred Scripts**: Critical styling loaded in the head, and functional javascript loaded using `defer`.
* **Resource Optimization**: Native lazy-loading (`loading="lazy"`) for all secondary images.
* **Reflow Prevention**: Explicit aspect ratios on layout cards and the hero graphic.
* **Optimized Event Listeners**: Use of single delegated listeners or passive listeners where suitable.

## Running Locally
1. Clone or extract the folder to your local machine.
2. Double-click `index.html` to run in any browser, or use a local development server (e.g., Live Server in VSCode, `npx serve`, or python's `http.server`):
   ```bash
   # Using Python 3
   python3 -m http.server 8000
   ```
3. Open `http://localhost:8000` in your web browser.
