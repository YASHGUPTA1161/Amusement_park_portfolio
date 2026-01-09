# Links Button Popup Window - Implementation Plan

## Overview

When clicking the "Links" button in the CenteredWindow component, a popup window should appear displaying links content.

## Two Implementation Approaches

### Approach 1: Modal/Popup Overlay (Recommended) ⭐

**Best for:** Modern UX, better mobile support, easier to style

**Implementation Steps:**

1. Create a new route: `/app/links/page.tsx` - This will be the Links page content
2. Create a reusable `PopupWindow` component that can display any route content
3. Use Next.js router to manage the popup state (query params or state management)
4. Style the popup to match your existing window design
5. Add close button and backdrop click to close
6. Make it draggable (you already have `react-draggable` installed!)

**Pros:**

- Better UX (no browser popup blockers)
- Easier to style and animate
- Works on all devices
- Can be made draggable
- Better accessibility

**Cons:**

- Not a "real" browser window

---

### Approach 2: Browser Popup Window

**Best for:** If you specifically need a separate browser window

**Implementation Steps:**

1. Create a new route: `/app/links/page.tsx`
2. Use `window.open()` to open the route in a popup
3. Configure popup window size and features
4. Handle popup blocking gracefully

**Pros:**

- True separate browser window
- User can move it around their screen

**Cons:**

- Popup blockers may interfere
- Less control over styling
- Poor mobile experience
- Accessibility concerns

---

## Recommended Implementation (Approach 1)

### File Structure

```
app/
  ├── page.tsx (home)
  ├── links/
  │   └── page.tsx (links content)
  └── layout.tsx

components/
  ├── CenteredWindow.tsx (update with navigation)
  ├── PopupWindow.tsx (new - reusable popup component)
  └── LinksContent.tsx (new - links page content)
```

### Step-by-Step Plan

#### Step 1: Create Links Route

- Create `/app/links/page.tsx` with links content
- This will be the content shown in the popup

#### Step 2: Create PopupWindow Component

- Reusable component that wraps any content
- Features:
  - Draggable (using react-draggable)
  - Close button
  - Backdrop overlay
  - Matches existing window styling
  - Animation on open/close (using framer-motion)

#### Step 3: State Management

- Option A: Use Zustand store (you already have it!)
  - Create a store to manage which popup is open
  - Store popup position, size, etc.
- Option B: Use URL query params
  - `/links?popup=true`
  - Simpler but less flexible

#### Step 4: Update CenteredWindow

- Add click handler to Links button
- Open popup using state management
- Use Next.js `useRouter` for navigation if needed

#### Step 5: Styling

- Match existing `.window` styles
- Add backdrop overlay
- Add animations
- Make responsive

---

## Detailed Component Structure

### PopupWindow Component

```tsx
// components/PopupWindow.tsx
- Props: isOpen, onClose, title, children
- Features:
  - Draggable titlebar
  - Close button (X)
  - Backdrop overlay
  - Framer Motion animations
  - z-index management
```

### Links Page

```tsx
// app/links/page.tsx
- Display links content
- Can be used standalone or in popup
```

### State Store (Zustand)

```tsx
// store/popupStore.ts
- popups: { links: boolean, work: boolean, ... }
- openPopup(name)
- closePopup(name)
- positions: { links: { x, y }, ... }
```

---

## Implementation Order

1. ✅ Create Zustand store for popup state
2. ✅ Create PopupWindow component
3. ✅ Create Links page content
4. ✅ Update CenteredWindow to open popup
5. ✅ Add styling and animations
6. ✅ Test and refine

---

## Next Steps

Would you like me to implement Approach 1 (Modal/Popup Overlay)? This is the recommended approach for modern web applications.
