# Portfolio Website Implementation Guide

## Tech Stack Overview

### Core Framework

- **Next.js 16** (App Router) - Server-side rendering, routing, and optimization
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling

### Key Libraries (Already Installed)

- **Framer Motion** - Smooth animations for window transitions
- **Howler.js** - Cross-browser audio support for button sounds
- **React Draggable** - Draggable window functionality
- **Axios** - HTTP requests for contact form

### Additional Packages Needed

```bash
npm install zustand react-hook-form @hookform/resolvers zod
# For email service (choose one):
npm install @resend/react  # OR
npm install emailjs-com    # OR
npm install @sendgrid/mail
```

---

## Implementation Steps

### Step 1: Window System Architecture

#### 1.1 Create Window State Management

- Use **Zustand** store to manage:
  - Open windows (array of window IDs)
  - Window positions (x, y coordinates)
  - Window z-index (for stacking)
  - Window sizes (for responsive design)
  - Active window (for focus)

#### 1.2 Create Window Component

- Base `Window` component with:
  - Draggable header (using react-draggable)
  - Close button
  - Minimize/maximize (optional)
  - Resizable (optional)
  - Mobile-responsive (fullscreen on mobile)
  - Z-index management
  - Focus/blur states

#### 1.3 Window Types

Create separate window components:

- `HomeWindow`
- `AboutWindow`
- `LinksWindow`
- `WorkWindow`
- `FAQWindow`
- `ContactWindow`

---

### Step 2: Sound System

#### 2.1 Sound Manager Hook

- Create `useSound` hook using Howler.js
- Preload sound effects:
  - Button click sound
  - Window open sound
  - Window close sound
  - Hover sound (optional)
- Sound toggle functionality (mute/unmute)
- Volume control

#### 2.2 Integrate Sounds

- Add sound to all interactive buttons
- Add sound to window open/close
- Respect user's sound preference (localStorage)

---

### Step 3: Contact Form

#### 3.1 Contact Form Component

- Form fields:
  - Name
  - Email
  - Subject
  - Message
- Validation using React Hook Form + Zod
- Loading states
- Success/error messages

#### 3.2 Email Service Integration

**Option A: Resend (Recommended)**

- Create API route: `/api/contact`
- Use Resend API to send emails
- Server-side email sending

**Option B: EmailJS**

- Client-side email sending
- No backend required
- Direct integration in component

**Option C: SendGrid**

- Enterprise-grade
- More complex setup

#### 3.3 API Route

- POST endpoint at `/api/contact`
- Validate input
- Send email
- Return success/error response

---

### Step 4: FAQ Section

#### 4.1 FAQ Component

- Accordion-style questions
- Smooth expand/collapse animations (Framer Motion)
- Search/filter functionality (optional)
- Categories (optional)

---

### Step 5: Mobile Responsiveness

#### 5.1 Mobile Window Behavior

- On mobile (< 768px):
  - Windows open fullscreen
  - Swipe gestures to close
  - Touch-friendly buttons
  - Stack windows vertically

#### 5.2 Responsive Design

- Use Tailwind breakpoints
- Test on various screen sizes
- Optimize touch targets (min 44x44px)

---

### Step 6: Performance Optimization

#### 6.1 Code Splitting

- Lazy load window components
- Dynamic imports for heavy components

#### 6.2 Image Optimization

- Use Next.js Image component
- Optimize all images
- Use WebP format

#### 6.3 Sound Optimization

- Lazy load sound files
- Compress audio files
- Use appropriate formats (MP3, OGG)

---

## File Structure

```
my-portfolio/
├── app/
│   ├── api/
│   │   └── contact/
│   │       └── route.ts          # Contact form API
│   ├── components/
│   │   ├── windows/
│   │   │   ├── Window.tsx        # Base window component
│   │   │   ├── HomeWindow.tsx
│   │   │   ├── AboutWindow.tsx
│   │   │   ├── LinksWindow.tsx
│   │   │   ├── WorkWindow.tsx
│   │   │   ├── FAQWindow.tsx
│   │   │   └── ContactWindow.tsx
│   │   ├── ui/
│   │   │   ├── Button.tsx        # Button with sound
│   │   │   ├── SoundToggle.tsx
│   │   │   └── ThemeToggle.tsx
│   │   └── layout/
│   │       ├── Header.tsx
│   │       └── Footer.tsx
│   ├── hooks/
│   │   ├── useSound.ts           # Sound management
│   │   ├── useWindow.ts          # Window management
│   │   └── useMobile.ts          # Mobile detection
│   ├── store/
│   │   └── windowStore.ts        # Zustand store
│   ├── lib/
│   │   ├── sounds.ts             # Sound file paths
│   │   └── email.ts              # Email service config
│   ├── public/
│   │   └── sounds/
│   │       ├── click.mp3
│   │       ├── open.mp3
│   │       └── close.mp3
│   └── page.tsx                  # Main page
```

---

## Implementation Order

1. **Setup State Management** (Zustand store)
2. **Create Base Window Component** (draggable, closeable)
3. **Implement Sound System** (Howler integration)
4. **Create Window Components** (Home, About, Links, Work, FAQ, Contact)
5. **Build Contact Form** (with email service)
6. **Add Mobile Responsiveness** (fullscreen windows on mobile)
7. **Polish & Optimize** (animations, performance)

---

## Key Features Implementation Details

### Window System

- Each window is a separate component
- Windows can be dragged (desktop) or fullscreen (mobile)
- Z-index increases when window is clicked
- Windows can be closed individually
- State persists (optional: localStorage)

### Sound System

- All buttons trigger click sound
- Window open/close sounds
- Sound toggle in header
- Respects browser autoplay policies
- Graceful degradation if audio fails

### Contact Form

- Client-side validation
- Server-side email sending
- Loading states
- Success/error feedback
- Spam protection (optional: reCAPTCHA)

### Mobile Support

- Touch-friendly interface
- Fullscreen windows on mobile
- Swipe to close
- Optimized performance

---

## Testing Checklist

- [ ] Windows open/close correctly
- [ ] Windows are draggable on desktop
- [ ] Windows are fullscreen on mobile
- [ ] Sounds play on all buttons
- [ ] Sound toggle works
- [ ] Contact form sends emails
- [ ] Form validation works
- [ ] FAQ accordion works
- [ ] All pages are responsive
- [ ] Performance is optimized
- [ ] Works on iOS Safari
- [ ] Works on Android Chrome

---

## Next Steps

1. Install additional dependencies
2. Set up Zustand store
3. Create base Window component
4. Implement sound system
5. Build individual window components
6. Set up email service
7. Add mobile responsiveness
8. Test and optimize
