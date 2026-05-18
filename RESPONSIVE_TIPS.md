# Responsive Design Tips: Flexbox & Grid

## Mobile-First Approach

Always start with mobile styles (base) and add complexity for larger screens using breakpoints.

```jsx
// ❌ Bad - Desktop first
className="grid grid-cols-3 sm:grid-cols-1"

// ✅ Good - Mobile first
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
```

---

## Flexbox Responsive Patterns

### 1. Wrap for Overflow Protection

Use `flex-wrap` to prevent horizontal scrolling on small screens:

```jsx
// Stack on mobile, row on desktop
className="flex flex-wrap gap-4"

// Better control with flex-col on mobile
className="flex flex-col md:flex-row gap-4"
```

### 2. Responsive Justify & Align

```jsx
// Center on mobile, space-between on desktop
className="flex justify-center md:justify-between items-center"

// Stack centered on mobile, row with start alignment on desktop
className="flex flex-col items-center md:flex-row md:items-start"
```

### 3. Responsive Gaps

```jsx
// Smaller gaps on mobile, larger on desktop
className="flex gap-2 md:gap-4 lg:gap-6"
```

### 4. Full Width Buttons on Mobile

```jsx
// Full width on mobile, auto on desktop
className="flex w-full sm:w-auto justify-center"
```

### 5. Responsive Flex Basis

```jsx
// Full width items on mobile, 50% on tablet, 33% on desktop
className="flex flex-wrap"

// Child elements:
className="w-full sm:w-1/2 lg:w-1/3"
```

---

## Grid Responsive Patterns

### 1. Single to Multi-Column Layouts

```jsx
// Stack on mobile, 2 cols on tablet, 3 on desktop
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"

// Auto-fit pattern (fills available space)
className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4"
```

### 2. Asymmetric Layouts

```jsx
// Mobile: stack vertically
// Desktop: sidebar + main content
className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-4"

// Or with minmax for flexibility:
className="grid grid-cols-1 lg:grid-cols-[minmax(200px,auto)_1fr] gap-4"
```

### 3. Complex Responsive Grids

```jsx
// Mobile: single column
// Tablet: 2 columns
// Desktop: 3 columns with first item spanning 2 columns
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <div className="md:col-span-2 lg:col-span-1">Featured</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

### 4. Responsive Row Heights

```jsx
// Auto rows on mobile, fixed on desktop
className="grid grid-rows-[auto] md:grid-rows-[200px_1fr_auto]"
```

### 5. Grid Areas (Advanced)

```jsx
// Mobile layout
className="grid grid-cols-1 grid-rows-[auto_1fr_auto] gap-4
           md:grid-cols-[200px_1fr] md:grid-rows-[auto_1fr]"

// Children use different positions:
// Header: full width on mobile, spans both cols on desktop
className="md:col-span-2"

// Sidebar: below header on mobile, left column on desktop
className="md:row-start-2"

// Main: after sidebar on mobile, right column on desktop
className="md:col-start-2 md:row-start-2"
```

---

## Common Responsive Patterns

### 1. Card Grids

```jsx
// Responsive card layout
className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
```

### 2. Dashboard Layout

```jsx
// Container
className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-4"

// Sidebar (full width on mobile, fixed on desktop)
className="lg:row-span-full"

// Main content
className="grid grid-cols-1 md:grid-cols-2 gap-4"
```

### 3. Form Layouts

```jsx
// Stack on mobile, 2 columns on desktop
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <input className="md:col-span-2" /> {/* Full width */}
  <input /> {/* Half width on desktop */}
  <input /> {/* Half width on desktop */}
</div>
```

### 4. Hero Section

```jsx
// Stack image and text on mobile, side-by-side on desktop
className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center"
```

---

## Spacing Best Practices

### Responsive Padding & Margins

```jsx
// Mobile: tight spacing, Desktop: generous spacing
className="p-4 md:p-6 lg:p-8"
className="px-4 md:px-8 lg:px-20"
className="gap-2 md:gap-4 lg:gap-6"
```

### Container Max Widths

```jsx
// Prevent content from being too wide on large screens
className="w-full max-w-screen-xl mx-auto px-4 md:px-6"
```

---

## Typography Responsive Patterns

```jsx
// Scale text sizes
className="text-sm md:text-base lg:text-lg"
className="text-2xl md:text-4xl lg:text-5xl"

// Responsive text alignment
className="text-center md:text-left"

// Responsive line clamp (truncate text)
className="line-clamp-3 md:line-clamp-none"
```

---

## Image Handling

### 1. Responsive Images

```jsx
// Full width on mobile, constrained on desktop
className="w-full md:w-auto md:max-w-md"

// Fixed aspect ratio
className="aspect-square md:aspect-video object-cover"

// Responsive max width
className="w-full max-w-75 md:max-w-none"
```

### 2. Object Fit

```jsx
// Ensure images don't stretch
className="w-full h-48 md:h-64 object-cover rounded-lg"
```

---

## Common Pitfalls to Avoid

### ❌ Don't Do This

```jsx
// Starting with desktop and removing features on mobile
className="grid grid-cols-3 md:grid-cols-1"

// Using fixed widths that break on mobile
className="w-500"

// Not wrapping flex items
className="flex gap-4" // Can cause horizontal scroll!
```

### ✅ Do This Instead

```jsx
// Mobile first
className="grid grid-cols-1 md:grid-cols-3"

// Relative widths
className="w-full max-w-125 mx-auto"

// Safe flex wrapping
className="flex flex-wrap gap-4"
// or
className="flex flex-col md:flex-row gap-4"
```

---

## Breakpoints Reference (Tailwind)

```
sm:  640px   - Small tablets
md:  768px   - Tablets
lg:  1024px  - Small laptops
xl:  1280px  - Desktops
2xl: 1536px  - Large desktops
```

---

## Quick Checklist

- [ ] Start with mobile styles (no breakpoint prefix)
- [ ] Add `flex-wrap` or `flex-col` on mobile for flex layouts
- [ ] Use `grid-cols-1` as base for grid layouts
- [ ] Test with browser dev tools at different breakpoints
- [ ] Add responsive gaps, padding, and margins
- [ ] Scale typography appropriately
- [ ] Ensure images are responsive (`w-full`, `max-w-*`, `object-cover`)
- [ ] Center content on mobile when appropriate
- [ ] Use `overflow-hidden` or `overflow-x-hidden` on containers if needed
- [ ] Test touch interactions on mobile devices

---

## Real-World Examples

### E-commerce Product Grid

```jsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
  {products.map(product => (
    <div className="border rounded-lg p-4 hover:shadow-lg transition">
      <img className="w-full aspect-square object-cover rounded" />
      <h3 className="text-lg md:text-xl mt-2">{product.name}</h3>
      <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
    </div>
  ))}
</div>
```

### Navigation Bar

```jsx
<nav className="flex flex-col md:flex-row justify-between items-center gap-4 p-4 md:px-8">
  <div className="text-xl font-bold">Logo</div>
  <div className="flex flex-wrap gap-4 justify-center md:justify-end">
    <a href="/">Home</a>
    <a href="/about">About</a>
    <a href="/contact">Contact</a>
  </div>
</nav>
```

### Blog Post Layout

```jsx
<article className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6 md:gap-8 max-w-screen-xl mx-auto px-4 md:px-6">
  {/* Main content - full width on mobile */}
  <div className="prose prose-sm md:prose-base lg:prose-lg">
    <h1 className="text-3xl md:text-5xl mb-4">Article Title</h1>
    <p>Content...</p>
  </div>
  
  {/* Sidebar - below content on mobile, beside on desktop */}
  <aside className="border rounded-lg p-4 h-fit">
    <h3 className="text-lg font-bold mb-2">Related</h3>
    <ul>...</ul>
  </aside>
</article>
```

### Modal/Dialog

```jsx
{/* Full screen on mobile, centered card on desktop */}
<div className="fixed inset-0 bg-black/50 flex items-end md:items-center justify-center p-0 md:p-4">
  <div className="bg-white w-full h-full md:h-auto md:w-full md:max-w-2xl md:rounded-lg overflow-auto">
    <div className="p-4 md:p-6">
      {/* Modal content */}
    </div>
  </div>
</div>
```

---

## Performance Tips

1. **Minimize breakpoint complexity** - Don't use all breakpoints for every element
2. **Batch similar responsive changes** - Group elements with similar responsive behavior
3. **Use CSS Grid's auto-placement** when possible instead of explicit positioning
4. **Prefer `gap` over margins** for consistent spacing
5. **Use `aspect-ratio`** instead of padding hacks for maintaining proportions

---

## Debugging Tips

```jsx
// Add temporary borders to visualize layout
className="border-2 border-red-500"

// Check computed styles in browser DevTools
// Toggle device toolbar (Ctrl+Shift+M / Cmd+Shift+M)
// Test at breakpoint boundaries (639px, 767px, 1023px, etc.)
```

---

**Remember:** The best responsive design is one that works seamlessly across all devices without users even noticing the responsive adaptations!
