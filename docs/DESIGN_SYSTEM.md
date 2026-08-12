# 🎨 Design System Documentation

## Overview

The CBD SaaS Platform design system is a comprehensive set of design tokens, components, and guidelines that ensure consistency across the entire application.

## Design Principles

1. **Premium & Professional** - High-end aesthetics that inspire confidence
2. **Dark-First** - Optimized for dark mode with sophisticated contrast
3. **Accessible** - WCAG 2.2 AA compliant
4. **Performant** - Optimized animations and interactions
5. **Consistent** - Unified patterns across all features

## Color Palette

### Primary Colors

#### CBD Black (Background)
```css
#050505 - Primary Background
#0A0A0A - Secondary Background
#111111 - Tertiary Background / Cards
```

#### CBD Green (Accent)
```css
#00FF66 - Primary Green (Main accent)
#00D95F - Light Green (Hover states)
#00B94A - Dark Green (Active states)
#063B24 - Darker Green (Subtle accents)
```

#### Neutral Grays
```css
#777777 - Primary Gray (Body text)
#A0A0A0 - Light Gray (Secondary text)
#F5F5F5 - Off White (Headings, important text)
```

### Semantic Colors

#### Status Colors
- **Success**: `#00FF66` (CBD Green)
- **Warning**: `#FCD34D` (Yellow)
- **Error**: `#EF4444` (Red)
- **Info**: `#3B82F6` (Blue)

#### Stock Status
- 🟢 **Normal**: Green
- 🟡 **Low**: Yellow  
- 🔴 **Critical**: Red
- ⚫ **Out of Stock**: Gray

## Typography

### Font Family

```css
font-family: 'Inter', system-ui, -apple-system, sans-serif;
```

### Type Scale

```css
/* Headings */
h1: 3rem (48px) - font-weight: 700
h2: 2.25rem (36px) - font-weight: 700
h3: 1.875rem (30px) - font-weight: 600
h4: 1.5rem (24px) - font-weight: 600
h5: 1.25rem (20px) - font-weight: 600
h6: 1rem (16px) - font-weight: 600

/* Body */
body-lg: 1.125rem (18px)
body: 1rem (16px)
body-sm: 0.875rem (14px)
body-xs: 0.75rem (12px)
```

### Font Weights

- Regular: 400
- Medium: 500
- Semibold: 600
- Bold: 700

## Spacing System

Based on 4px grid:

```css
spacing-1: 4px
spacing-2: 8px
spacing-3: 12px
spacing-4: 16px
spacing-5: 20px
spacing-6: 24px
spacing-8: 32px
spacing-10: 40px
spacing-12: 48px
spacing-16: 64px
spacing-20: 80px
spacing-24: 96px
```

## Border Radius

```css
radius-sm: 4px
radius-md: 8px (default)
radius-lg: 12px
radius-xl: 16px
radius-2xl: 24px
radius-full: 9999px
```

## Shadows

### Elevation Levels

```css
/* Shadow Small */
shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05)

/* Shadow Medium */
shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1)

/* Shadow Large */
shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1)

/* Shadow XL */
shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.15)

/* Green Glow (CBD Accent) */
glow-green: 0 0 20px rgba(0, 255, 102, 0.3)
glow-green-strong: 0 0 40px rgba(0, 255, 102, 0.5)
```

## Components

### Button

Variants:
- **default**: Primary green button
- **secondary**: Secondary dark button  
- **outline**: Outline button
- **ghost**: Transparent button
- **destructive**: Red error button

Sizes:
- **sm**: Small (32px height)
- **default**: Default (40px height)
- **lg**: Large (44px height)
- **icon**: Icon only (40x40px)

### Card

A container component with glassmorphism effect.

```tsx
<Card className="glass border-cbd-green/20">
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>Content</CardContent>
</Card>
```

### StatCard

Special card for displaying KPI metrics with trend indicators.

```tsx
<StatCard
  title="Total Sales"
  value="€12,430"
  change={12.5}
  changeLabel="vs yesterday"
  icon={DollarSign}
/>
```

### Badge

Status indicators with semantic variants.

```tsx
<Badge variant="success">Active</Badge>
<Badge variant="warning">Low Stock</Badge>
<Badge variant="destructive">Critical</Badge>
```

### Stock Status Badge

Specialized badge for inventory status.

```tsx
<StockStatusBadge status={StockStatus.NORMAL} />
<StockStatusBadge status={StockStatus.LOW} />
<StockStatusBadge status={StockStatus.CRITICAL} />
```

### Order Status Badge

Specialized badge for order tracking.

```tsx
<OrderStatusBadge status={OrderStatus.DELIVERED} />
<OrderStatusBadge status={OrderStatus.PREPARING} />
```

## Effects

### Glassmorphism

```css
.glass {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.glass-strong {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.15);
}
```

### Glow Effects

Applied to primary CTAs and interactive elements:

```css
.glow-green {
  box-shadow: 0 0 20px rgba(0, 255, 102, 0.3);
}

.glow-green-strong {
  box-shadow: 0 0 40px rgba(0, 255, 102, 0.5);
}
```

### Hover Effects

```css
.card-hover {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.card-hover:hover {
  transform: scale(1.02);
  box-shadow: 0 20px 25px rgba(0, 0, 0, 0.15),
              0 0 40px rgba(0, 255, 102, 0.2);
}
```

## Animations

### Duration

```css
fast: 150ms
normal: 300ms
slow: 500ms
slower: 800ms
```

### Easing

```css
ease-in: cubic-bezier(0.4, 0, 1, 1)
ease-out: cubic-bezier(0, 0, 0.2, 1)
ease-in-out: cubic-bezier(0.4, 0, 0.2, 1)
```

### Transitions

```css
transition-smooth: all 0.3s cubic-bezier(0.4, 0, 0.2, 1)
```

### Keyframe Animations

#### Fade In
```css
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

#### Slide In
```css
@keyframes slide-in-from-top {
  from { transform: translateY(-100%); }
  to { transform: translateY(0); }
}
```

#### Glow Pulse
```css
@keyframes glow {
  0%, 100% { box-shadow: 0 0 20px rgba(0, 255, 102, 0.3); }
  50% { box-shadow: 0 0 40px rgba(0, 255, 102, 0.6); }
}
```

## Motion Guidelines

### Microinteractions (150-300ms)

- Button hover/press
- Input focus
- Checkbox/switch toggle
- Tooltip appearance

### Transitions (300-500ms)

- Modal open/close
- Dropdown menu
- Tab switching
- Card expansion

### Page Transitions (500-800ms)

- Route changes
- Section scrolling
- Drawer/sidebar

## Accessibility

### Contrast Ratios

All text meets WCAG AA standards:
- **Large text** (18px+): Minimum 3:1
- **Normal text**: Minimum 4.5:1

### Focus States

All interactive elements have visible focus states:

```css
.focus-visible {
  outline: 2px solid #00FF66;
  outline-offset: 2px;
}
```

### Reduced Motion

Respects user preference:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Screen Readers

All interactive elements include:
- Semantic HTML
- ARIA labels
- ARIA descriptions
- Role attributes

## Responsive Breakpoints

```css
sm: 640px   // Mobile landscape
md: 768px   // Tablet
lg: 1024px  // Desktop
xl: 1280px  // Large desktop
2xl: 1536px // Extra large
```

## Icons

Using **Lucide React** icon library:

- Size: 16px, 20px, 24px
- Stroke width: 2px
- Color: Inherit from parent

Common icons:
- Navigation: Menu, X, ChevronRight
- Actions: Plus, Edit, Trash2, Download
- Status: Check, AlertTriangle, Info
- Business: Store, Package, ShoppingCart, Users

## Grid System

### Container

```css
.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 16px;
}

@media (min-width: 768px) {
  .container {
    padding: 0 24px;
  }
}
```

### Grid

12-column grid system with gap utilities.

## Component Composition

### Atomic Design Hierarchy

1. **Atoms**: Button, Input, Badge, Avatar
2. **Molecules**: StatCard, Form fields with labels
3. **Organisms**: Navigation, Data tables, Forms
4. **Templates**: Page layouts
5. **Pages**: Complete pages

## Usage Examples

### Landing Page Hero

```tsx
<section className="relative min-h-screen bg-cbd-black">
  <div className="absolute inset-0 bg-gradient-to-b from-cbd-black via-transparent to-cbd-black" />
  <Hero3D />
  <div className="relative z-10">
    <h1 className="text-5xl font-bold text-white">
      Transform Your <span className="text-gradient-green">CBD Business</span>
    </h1>
    <Button className="glow-green">Get Started</Button>
  </div>
</section>
```

### Dashboard Card

```tsx
<Card className="glass border-cbd-green/20 card-hover">
  <CardHeader>
    <CardTitle>Today's Sales</CardTitle>
  </CardHeader>
  <CardContent>
    <div className="text-3xl font-bold text-white">€12,430</div>
    <div className="flex items-center gap-1 text-sm">
      <TrendingUp className="text-cbd-green" />
      <span className="text-cbd-green">+12.5%</span>
    </div>
  </CardContent>
</Card>
```

## Best Practices

### Do's ✅

- Use glassmorphism for overlays and cards
- Apply green glow to primary CTAs
- Maintain consistent spacing (4px grid)
- Use semantic color for status indicators
- Respect reduced motion preferences
- Provide keyboard navigation

### Don'ts ❌

- Don't use more than 2-3 colors per component
- Avoid excessive animations (>1s)
- Don't use pure white (#FFF) - use #F5F5F5
- Avoid small text (<14px) without proper contrast
- Don't animate opacity + transform together on large elements
- Never skip accessibility attributes

---

**Last Updated**: 2026-08-10
**Version**: 1.0.0
