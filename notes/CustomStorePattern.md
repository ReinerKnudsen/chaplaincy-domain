# Custom Svelte Store Patterns & Notification System

## Overview
Summary of patterns learned while implementing a global notification system for admin feedback in SvelteKit with Svelte 5.

## Custom Svelte Store Pattern

### Core Concept
Create a custom store by wrapping Svelte's `writable` store with additional methods while keeping data encapsulated.

```typescript
function createNotificationStore() {
    const { subscribe, set, update } = writable<Notification[]>([]);
    
    return {
        subscribe,                    // Built-in method from writable
        addToast: (type, message) => { /* custom logic */ },
        addAlert: (type, message) => { /* custom logic */ },
        remove: (id) => { /* custom logic */ },
        clear: () => { /* custom logic */ },
        clearToasts: () => { /* custom logic */ },
        clearAlerts: () => { /* custom logic */ }
    };
}

export const notificationStore = createNotificationStore();
```

### Key Principles

1. **Data Encapsulation**: The actual data array is hidden inside the `writable` store
2. **Method-Only Interface**: Return object contains only methods, no data properties
3. **Controlled Access**: All data manipulation goes through your custom methods
4. **Reactive**: Components get updates via the `subscribe` method

### Benefits
- ✅ **Safe**: Can't accidentally corrupt the data
- ✅ **Controlled**: All changes go through validation/business logic
- ✅ **Reactive**: Svelte's reactivity system works automatically
- ✅ **Testable**: Easy to unit test individual methods

## Notification System Architecture

### Store Structure
```typescript
interface Notification {
    id: string;              // crypto.randomUUID()
    type: NotificationType;  // 'success' | 'error' | 'warning' | 'info'
    message: string;
    isToast: boolean;        // true = floating toast, false = inline alert
    duration?: number | null; // null = manual dismiss, number = auto-dismiss
}
```

### Component Hierarchy
```
ToastContainer (fixed positioning at 75vh)
├── Toast (individual notification with animations)
├── Toast (stacked vertically with space-y-3)
└── Toast (newest appears at top)
```

### Animation Pattern
- **Slide-in**: `transform: translateX(100%)` → `translateX(0)`
- **Slide-out**: `transform: translateX(0)` → `translateX(100%)`
- **Timing**: 300ms duration with ease-out
- **GPU Acceleration**: `transform-gpu` class for smooth animations

## Cross-Route Messaging Pattern

### Problem
How to show notifications that persist across page navigation (e.g., success message after redirect)?

### Solution
1. **Add notification to store** before navigation
2. **Navigate to target page**
3. **Target page displays** the notification via ToastContainer
4. **Auto-dismiss** after specified duration

```typescript
// Edit page
try {
    await updateDoc(docRef, eventData);
    notificationStore.addToast('success', 'Event updated successfully!'); // Step 1
    goto('/admin/overview'); // Step 2
} catch (error) {
    notificationStore.addToast('error', 'Failed to update.'); // Stay on page
}

// Overview page
<ToastContainer /> <!-- Step 3: Displays the toast -->
```

## Error Handling Patterns

### Success Flow
- Add success toast → Navigate to overview page → Show toast → Auto-dismiss

### Error Flow  
- Add error toast → Stay on current page → Show toast → Manual dismiss → Preserve form data

### Key Insight
Navigation timing matters! The `goto()` call interrupts toast rendering, so cross-route messaging is essential for success notifications.

## Svelte 5 Syntax Patterns

### Reactive State
```typescript
// Svelte 5 (preferred)
const notifications = $derived($notificationStore);
const toasts = $derived($notificationStore.filter(n => n.isToast));

// Svelte 4 (legacy)
$: notifications = $notificationStore;
```

### State Management
```typescript
// Svelte 5
let isVisible = $state(false);

// Svelte 4
let isVisible = false;
```

## CSS Animation Techniques

### Transform-based Animations
```css
.toast {
    transform-gpu transition-transform duration-300 ease-out;
    transform: translateX(100%); /* Start off-screen */
}

.toast.visible {
    transform: translateX(0); /* Slide to final position */
}
```

### Benefits of Transform over Position
- ✅ GPU accelerated (smoother)
- ✅ Doesn't trigger layout recalculation
- ✅ Better performance on mobile
- ✅ Easier to animate

## Debugging Patterns

### Common Issues & Solutions

1. **Toasts Not Appearing**
   - Check if multiple ToastContainers exist
   - Verify store is being called correctly
   - Look for navigation timing conflicts

2. **Animation Issues**
   - Use `setTimeout` for DOM readiness before triggering animations
   - Ensure proper cleanup in component lifecycle
   - Check CSS transform syntax

3. **Store State Issues**
   - Add debug logs to verify store updates
   - Check component reactive statements
   - Verify import/export paths

## Best Practices

### Store Design
- Keep stores focused on single responsibility
- Use TypeScript interfaces for type safety
- Provide both granular and bulk operations
- Consider auto-cleanup for memory management

### Component Design
- Separate container (positioning) from item (content) components
- Use semantic HTML with proper ARIA attributes
- Handle both auto-dismiss and manual dismiss patterns
- Test animations across different screen sizes

### User Experience
- Provide clear visual feedback for all user actions
- Use appropriate colors and icons for message types
- Don't overwhelm users with too many notifications
- Ensure notifications are accessible (screen readers, keyboard navigation)

## German Programming Wisdom
*"Kaum macht man es richtig, schon funktioniert es"* - As soon as you do it right, it works! 

The key to debugging is methodical problem-solving and understanding the underlying patterns.

---

*Created: 2025-06-25 - Learning session on custom Svelte stores and notification systems*
