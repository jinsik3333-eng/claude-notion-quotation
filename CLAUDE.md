# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Modern Next.js 16 + React 19 starter kit with Atomic Design pattern, shadcn/ui, and TypeScript. The project implements a marketing website with authentication and dashboard functionality.

**Tech Stack:**
- Next.js 16 (App Router), React 19, TypeScript 5
- Styling: Tailwind CSS 4 + shadcn/ui
- Forms: React Hook Form + Zod for validation
- State Management: Zustand
- Notifications: Sonner
- Icons: Lucide React
- Theme: next-themes (light/dark mode)

---

## Essential Commands

```bash
# Development
npm run dev          # Start dev server (http://localhost:3000)

# Building
npm run build        # Production build
npm start            # Start production server

# Linting
npm run lint         # Run ESLint check
npm run lint -- --fix  # Auto-fix linting issues
```

---

## Project Architecture

### Directory Structure

```
app/                          # Next.js App Router
├── (auth)/                   # Auth route group (login, signup)
├── (marketing)/              # Public pages (home, about, contact, docs, etc.)
├── (dashboard)/              # Protected dashboard pages (settings, profile)
├── layout.tsx                # Root layout with header, footer, theme provider
└── not-found.tsx             # 404 page

components/                   # Atomic Design hierarchy
├── ui/                       # shadcn/ui primitive components (button, input, etc.)
├── atoms/                    # Smallest reusable units (Logo, ThemeToggle)
├── molecules/                # Simple component combinations (NavItem, PageHeader)
├── organisms/                # Complex features (Header, Sidebar, ContactForm)
└── templates/                # Layout wrappers (DefaultLayout, DashboardLayout)

lib/
├── utils.ts                  # Utility functions (cn() for Tailwind classes)
├── constants/
│   ├── nav.ts               # Navigation configuration
│   └── site.ts              # Site metadata
└── validations/             # Zod schemas for forms (auth.ts, contact.ts)

types/                       # Global TypeScript definitions
```

### Atomic Design Implementation

**Components follow strict hierarchy:**

1. **ui/** - shadcn/ui primitives (no business logic)
2. **atoms/** - Single interactive elements, no dependencies between atoms
3. **molecules/** - Combinations of atoms (e.g., NavItem = Link + Icon + Label)
4. **organisms/** - Complex features with state/logic (e.g., LoginForm, Header)
5. **templates/** - Layout structures (e.g., DefaultLayout, DashboardLayout)

### Route Groups

- `(auth)` - Login/Signup pages with AuthLayout
- `(marketing)` - Public pages with DefaultLayout and Header/Footer
- `(dashboard)` - Protected dashboard with DashboardLayout and Sidebar

---

## Key Files & Patterns

### Form Validation

All forms use **React Hook Form + Zod** pattern:

**Location:** `lib/validations/auth.ts`

```typescript
// Define schema with Zod
export const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Min 6 characters"),
});

export type LoginInput = z.infer<typeof loginSchema>;
```

**Usage in component:** `components/organisms/login-form.tsx`

```typescript
const form = useForm<LoginInput>({
  resolver: zodResolver(loginSchema),
});
```

### Configuration & Constants

- **Navigation:** `lib/constants/nav.ts` - Menu structure for header and sidebar
- **Site Config:** `lib/constants/site.ts` - Site metadata, links

### Styling

**Utility function:** `lib/utils.ts` exports `cn()` for merging Tailwind classes:

```typescript
cn("px-2 py-1", isActive && "bg-blue-500", className)
```

---

## Adding New Features

### Adding a New Page

1. Create folder structure: `app/(group)/new-page/page.tsx`
2. Export `metadata` object for SEO
3. Use appropriate layout (DefaultLayout for marketing, DashboardLayout for dashboard)
4. Example:
   ```typescript
   export const metadata = {
     title: "New Page | Claude Next.js Starters",
   };
   export default function NewPage() { ... }
   ```

### Adding a New Component

**Follow Atomic Design hierarchy:**

1. **If primitive (button, input, card):** Use shadcn/ui
2. **If single element with styling:** Add to `components/atoms/`
3. **If combination of atoms:** Add to `components/molecules/`
4. **If complex with logic/state:** Add to `components/organisms/`
5. **If layout wrapper:** Add to `components/templates/`

**Component structure:**
```typescript
"use client"; // Add if using hooks
import { cn } from "@/lib/utils";

interface ComponentProps {
  className?: string;
  // props...
}

/**
 * Brief description
 */
export function ComponentName({ className, ...props }: ComponentProps) {
  return (
    <div className={cn("base-styles", className)}>
      {/* content */}
    </div>
  );
}
```

### Adding Form Validation

1. Create schema in `lib/validations/feature-name.ts`
2. Export both schema and type: `z.infer<typeof schema>`
3. Use in component with `zodResolver` from `@hookform/resolvers/zod`

### Adding Navigation Items

Edit `lib/constants/nav.ts` and add to appropriate menu:

```typescript
{
  title: "New Page",
  href: "/new-page",
  description: "Description",
  icon: IconComponent, // from lucide-react
}
```

---

## Important Implementation Details

### Type Safety

- **No `any` type** - Use `ComponentProps<"element">` or define interfaces
- **Global types:** `types/index.ts` - NavItem, SiteConfig, User
- **Form types:** Generated from Zod schemas using `z.infer<typeof schema>`

### Dark Mode Support

- Handled by `next-themes` provider in root layout
- All shadcn/ui components support dark mode automatically
- Custom styles should respect dark mode: `dark:bg-slate-900`

### Responsive Design

- All pages are responsive by default with Tailwind breakpoints
- Use `md:`, `lg:` prefixes for responsive behavior
- Mobile-first approach: base styles apply to all sizes

### State Management (Zustand)

If needed, create stores in `lib/store/` and use hooks in components:

```typescript
import { useStore } from "@/lib/store/user-store";
const { user, setUser } = useStore();
```

### Page Metadata

All page components must export `metadata`:

```typescript
export const metadata = {
  title: "Page Title | Claude Next.js Starters",
  description: "Page description for SEO",
};
```

---

## Recent Changes & Bug Fixes

### Fixed Issues (Latest)
- CTA button visibility improved (added `bg-transparent` class)
- TypeScript type errors fixed (React ComponentType import)
- Settings page refactored with shadcn/ui components
- Form password fields now properly wrapped in `<form>` tags
- Form inputs now support browser autocomplete with `autoComplete` attribute
- Removed unused imports to clean up code

---

## Development Tips

1. **Hot Reload:** Changes auto-reload in dev mode (preserve form state with React Hook Form)
2. **Component Preview:** Use shadcn/ui storybook components as reference
3. **Validation First:** Define Zod schemas before building forms
4. **CSS Conflicts:** Use `cn()` utility instead of direct string concatenation
5. **Internationalization:** All text is currently in Korean; extract to i18n if needed
6. **SEO:** Always include metadata for new pages

---

## Common Workflows

### Building a Form Page

1. Define validation schema in `lib/validations/`
2. Create organism component in `components/organisms/` with React Hook Form
3. Use shadcn/ui inputs, buttons
4. Add error messages with FormMessage
5. Handle submission with async function + toast notifications

### Creating a Settings Section

1. Use Card component for sections (shadcn/ui)
2. Group related inputs in div with space-y-4
3. Use Label + Input/Select for form fields
4. Wrap password fields in `<form>` tag for browser support
5. Use Button with `type="submit"` inside form

### Adding a New API Route (Future)

1. Create `app/api/route-name/route.ts`
2. Export `async function POST/GET(request: Request)`
3. Use proper error handling and response formats
4. Add request/response types for type safety

---

## Debugging

- **Console errors:** Check browser console and terminal
- **Build errors:** Run `npm run build` locally
- **Type errors:** IDE shows errors; run `npx tsc --noEmit` to verify
- **Styling issues:** Inspect element and check Tailwind class conflicts with DevTools

---

## Performance Considerations

- **Code splitting:** Next.js handles automatically per route
- **Image optimization:** Use Next.js `Image` component
- **Bundle size:** Check with `npm run build` output
- **Lazy loading:** Use `React.lazy()` for heavy components
- **Memoization:** Use `React.memo()` for frequently re-rendering atoms

