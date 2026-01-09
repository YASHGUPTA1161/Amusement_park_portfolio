# How to Create Main Page with Window Tabs

## Step 1: Install Dependencies First

```bash
cd D:\my-portfolio
npm install
```

---

## Step 2: Create Window State Store

**File: `store/windowStore.ts`**

```typescript
import { create } from "zustand";

export type WindowType =
  | "home"
  | "about"
  | "links"
  | "work"
  | "faq"
  | "contact";

interface Window {
  id: string;
  type: WindowType;
  x: number;
  y: number;
  zIndex: number;
  isMinimized: boolean;
}

interface WindowStore {
  windows: Window[];
  nextZIndex: number;
  openWindow: (type: WindowType) => void;
  closeWindow: (id: string) => void;
  updateWindowPosition: (id: string, x: number, y: number) => void;
  focusWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
}

export const useWindowStore = create<WindowStore>((set) => ({
  windows: [],
  nextZIndex: 1,

  openWindow: (type) => {
    set((state) => {
      // Check if window already open
      const existing = state.windows.find((w) => w.type === type);
      if (existing) {
        // Focus existing window
        return {
          windows: state.windows.map((w) =>
            w.id === existing.id
              ? { ...w, zIndex: state.nextZIndex, isMinimized: false }
              : w
          ),
          nextZIndex: state.nextZIndex + 1,
        };
      }

      // Create new window
      const newWindow: Window = {
        id: `${type}-${Date.now()}`,
        type,
        x: 100 + state.windows.length * 30,
        y: 100 + state.windows.length * 30,
        zIndex: state.nextZIndex,
        isMinimized: false,
      };

      return {
        windows: [...state.windows, newWindow],
        nextZIndex: state.nextZIndex + 1,
      };
    });
  },

  closeWindow: (id) => {
    set((state) => ({
      windows: state.windows.filter((w) => w.id !== id),
    }));
  },

  updateWindowPosition: (id, x, y) => {
    set((state) => ({
      windows: state.windows.map((w) => (w.id === id ? { ...w, x, y } : w)),
    }));
  },

  focusWindow: (id) => {
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, zIndex: state.nextZIndex } : w
      ),
      nextZIndex: state.nextZIndex + 1,
    }));
  },

  minimizeWindow: (id) => {
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, isMinimized: !w.isMinimized } : w
      ),
    }));
  },
}));
```

---

## Step 3: Create Base Window Component

**File: `components/windows/Window.tsx`**

```typescript
'use client';

import { ReactNode } from 'react';
import Draggable from 'react-draggable';
import { useWindowStore } from '@/store/windowStore';
import { motion, AnimatePresence } from 'framer-motion';

interface WindowProps {
  id: string;
  title: string;
  children: ReactNode;
  type: 'home' | 'about' | 'links' | 'work' | 'faq' | 'contact';
}

export default function Window({ id, title, children, type }: WindowProps) {
  const { closeWindow, focusWindow, updateWindowPosition, windows } = useWindowStore();
  const window = windows.find(w => w.id === id);

  if (!window) return null;

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const handleDrag = (e: any, data: any) => {
    updateWindowPosition(id, data.x, data.y);
  };

  const handleClick = () => {
    focusWindow(id);
  };

  if (isMobile) {
    // Fullscreen on mobile
    return (
      <AnimatePresence>
        {!window.isMinimized && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-50 bg-white"
            onClick={handleClick}
            style={{ zIndex: window.zIndex }}
          >
            <div className="flex h-full flex-col">
              {/* Header */}
              <div className="flex items-center justify-between bg-gray-800 px-4 py-2 text-white">
                <span>{title}</span>
                <button
                  onClick={() => closeWindow(id)}
                  className="rounded px-2 py-1 hover:bg-gray-700"
                >
                  ×
                </button>
              </div>
              {/* Content */}
              <div className="flex-1 overflow-auto p-4">{children}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  // Desktop draggable window
  return (
    <AnimatePresence>
      {!window.isMinimized && (
        <Draggable
          handle=".window-header"
          position={{ x: window.x, y: window.y }}
          onDrag={handleDrag}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed left-0 top-0 w-96 rounded-lg border-2 border-gray-300 bg-white shadow-2xl"
            onClick={handleClick}
            style={{ zIndex: window.zIndex }}
          >
            {/* Header */}
            <div className="window-header flex cursor-move items-center justify-between rounded-t-lg bg-gray-800 px-4 py-2 text-white">
              <span className="font-semibold">{title}</span>
              <button
                onClick={() => closeWindow(id)}
                className="rounded px-2 py-1 hover:bg-gray-700"
              >
                ×
              </button>
            </div>
            {/* Content */}
            <div className="max-h-96 overflow-auto p-4">{children}</div>
          </motion.div>
        </Draggable>
      )}
    </AnimatePresence>
  );
}
```

---

## Step 4: Create Individual Window Components

**File: `components/windows/HomeWindow.tsx`**

```typescript
'use client';

import Window from './Window';

interface HomeWindowProps {
  id: string;
}

export default function HomeWindow({ id }: HomeWindowProps) {
  return (
    <Window id={id} title="home" type="home">
      <div>
        <h2 className="mb-4 text-2xl font-bold">Hi! I'm Shar</h2>
        <p className="text-gray-700">Illustrator, animator, and developer</p>
      </div>
    </Window>
  );
}
```

**File: `components/windows/AboutWindow.tsx`**

```typescript
'use client';

import Window from './Window';

interface AboutWindowProps {
  id: string;
}

export default function AboutWindow({ id }: AboutWindowProps) {
  return (
    <Window id={id} title="about" type="about">
      <div>
        <h2 className="mb-4 text-2xl font-bold">About Me</h2>
        <p className="text-gray-700">Your about content here...</p>
      </div>
    </Window>
  );
}
```

**File: `components/windows/LinksWindow.tsx`**

```typescript
'use client';

import Window from './Window';

interface LinksWindowProps {
  id: string;
}

export default function LinksWindow({ id }: LinksWindowProps) {
  return (
    <Window id={id} title="links" type="links">
      <div>
        <h2 className="mb-4 text-2xl font-bold">Links</h2>
        <div className="grid grid-cols-2 gap-4">
          {/* Add your social links here */}
        </div>
      </div>
    </Window>
  );
}
```

**File: `components/windows/WorkWindow.tsx`**

```typescript
'use client';

import Window from './Window';

interface WorkWindowProps {
  id: string;
}

export default function WorkWindow({ id }: WorkWindowProps) {
  return (
    <Window id={id} title="work" type="work">
      <div>
        <h2 className="mb-4 text-2xl font-bold">Work</h2>
        <p className="text-gray-700">Your work content here...</p>
      </div>
    </Window>
  );
}
```

---

## Step 5: Create Window Manager Component

**File: `components/WindowManager.tsx`**

```typescript
'use client';

import { useWindowStore } from '@/store/windowStore';
import HomeWindow from './windows/HomeWindow';
import AboutWindow from './windows/AboutWindow';
import LinksWindow from './windows/LinksWindow';
import WorkWindow from './windows/WorkWindow';

export default function WindowManager() {
  const { windows } = useWindowStore();

  return (
    <>
      {windows.map((window) => {
        switch (window.type) {
          case 'home':
            return <HomeWindow key={window.id} id={window.id} />;
          case 'about':
            return <AboutWindow key={window.id} id={window.id} />;
          case 'links':
            return <LinksWindow key={window.id} id={window.id} />;
          case 'work':
            return <WorkWindow key={window.id} id={window.id} />;
          default:
            return null;
        }
      })}
    </>
  );
}
```

---

## Step 6: Create Main Page with Navigation Tabs

**File: `app/page.tsx`**

```typescript
'use client';

import { useWindowStore } from '@/store/windowStore';
import WindowManager from '@/components/WindowManager';

export default function Home() {
  const { openWindow } = useWindowStore();

  const navItems = [
    { id: 'about', label: 'About', icon: '💬' },
    { id: 'links', label: 'Links', icon: '🔗' },
    { id: 'work', label: 'Work', icon: '📁' },
    { id: 'faq', label: 'FAQ', icon: '❓' },
    { id: 'contact', label: 'Contact', icon: '✉️' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-100">
      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-5xl font-bold">
            hi! i'm <span className="text-orange-500">shar</span>
          </h1>
          <p className="text-xl text-gray-600">
            illustrator, animator, and developer
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => openWindow(item.id as any)}
              className="flex flex-col items-center gap-2 rounded-lg border-2 border-gray-300 bg-white px-6 py-4 transition-all hover:border-orange-500 hover:shadow-lg"
            >
              <span className="text-3xl">{item.icon}</span>
              <span className="font-semibold">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Window Manager - Renders all open windows */}
      <WindowManager />
    </div>
  );
}
```

---

## Step 7: Create Folder Structure

Create these folders/files:

```
my-portfolio/
├── store/
│   └── windowStore.ts
├── components/
│   ├── windows/
│   │   ├── Window.tsx
│   │   ├── HomeWindow.tsx
│   │   ├── AboutWindow.tsx
│   │   ├── LinksWindow.tsx
│   │   └── WorkWindow.tsx
│   └── WindowManager.tsx
└── app/
    └── page.tsx (update this)
```

---

## Summary

1. **Install dependencies**: `npm install`
2. **Create store**: `store/windowStore.ts` - manages window state
3. **Create base Window**: `components/windows/Window.tsx` - draggable window component
4. **Create window components**: Individual windows for each tab
5. **Create WindowManager**: Renders all open windows
6. **Update main page**: Add navigation buttons that call `openWindow()`

**How it works:**

- Click a tab → `openWindow('about')` → adds window to store
- `WindowManager` renders all windows from store
- Each window is draggable (desktop) or fullscreen (mobile)
- Click × to close → removes from store

That's it! The windows will open when you click the tabs.
