# Rocking Chair Pool Villa - AI Handoff Checklist

**Context for the new AI Model (Windsurf Cascade):**
This is a React/Vite project using Tailwind CSS. The current focus is on polishing the "Hero Section for Resort" and ensuring the overall landing page (`src/app/App.tsx`) is responsive, bug-free, and visually premium.

The user is transferring the workflow to this new IDE. Please review the checklist below to understand what has been accomplished and what needs to be fixed next.

---

## ✅ What has been done (Completed Tasks)
- [x] Initialized the project with React, Vite, and Tailwind CSS.
- [x] Implemented the main layout and structure in `src/app/App.tsx`.
- [x] Added high-quality imagery and set up the premium resort aesthetic.
- [x] Created `receipt.html` (Standalone task: an HTML receipt template that handles deposit deductions).

---

## 🚧 What needs to be done (Pending UI/UX Fixes in `App.tsx`)

These issues were identified during a local server inspection (`http://localhost:5173`) and need immediate attention.

### 1. Header & Logo Issues
- [ ] **Fix Logo Clipping:** The white circular background behind the logo is clipped/cut off at the top. (Check `overflow: hidden`, padding, or `clip-path` on the header/logo container).
- [ ] **Fix Navigation Bar Overlap:** When scrolling down on desktop, the fixed navigation bar becomes unreadable because it lacks a background. 
  - *Action:* Add a dynamic background color or `backdrop-filter: blur()` to the navbar when the user scrolls past the top.

### 2. Mobile Responsiveness (Critical)
- [ ] **Implement Mobile Menu:** There is currently no mobile navigation (Hamburger Menu). When resizing to mobile view, the nav links and "Book Direct" button disappear completely.
  - *Action:* Create a responsive hamburger menu with a slide-out or overlay for mobile screens.
- [ ] **Adjust Mobile Logo Size:** The logo scales too large on mobile devices, overlapping and cluttering other elements.
- [ ] **Fix Icon Proportions:** Icons in "The Experience" section (e.g., Private Pool, WiFi) are too large and overlap each other on mobile screens. Layouts and text overlap with background images.

### 3. Missing Elements
- [ ] **Restore the Ticker Bar:** A scrolling promotional text bar at the very top (e.g., "EXCLUSIVE SANCTUARY...") was previously obscured by the navbar and has now gone missing entirely.
  - *Action:* Reinstate the ticker bar and ensure it sits above the navbar without being covered.

---

## 📝 Suggested First Steps for the New AI
1. Review `src/app/App.tsx` and `src/styles/theme.css`.
2. Implement the Mobile Hamburger Menu and fix the Navigation Bar scroll state first, as these are critical for usability.
3. Fix the CSS issues related to the Logo clipping and mobile resizing.
