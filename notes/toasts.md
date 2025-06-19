# Toast Notification System Design

## Overview
Implement a hybrid toast notification approach for CRUD operations:
- Success: Show toast + navigate to list
- Error: Show toast + stay on edit page
- Non-blocking, auto-dismiss for success
- Manual dismiss required for errors

## Components

### 1. Toast Store (src/lib/stores/ToastStore.ts)
```typescript
interface Toast {
    type: 'success' | 'error';
    message: string;
    duration?: number;  // in milliseconds
    id?: string;       // for managing multiple toasts
}
```

### 2. Toast Component (src/lib/components/Toast.svelte)
- Position: Fixed, top-right corner
- Animation: Slide in from right, fade out
- Styling: Use DaisyUI classes
- Auto-dismiss timer for success messages
- Manual dismiss button for error messages

### 3. Layout Integration (src/routes/+layout.svelte)
- Mount toast container
- Handle multiple toasts
- Manage z-index and positioning

## Usage Example
```typescript
try {
    await saveData();
    ToastStore.show({ 
        type: 'success', 
        message: 'Successfully saved!' 
    });
    goto('/admin/list');
} catch (error) {
    ToastStore.show({ 
        type: 'error', 
        message: error.message 
    });
    // Stay on current page
}
```

## Integration Points
1. News create/edit pages
2. Event create/edit pages
3. Any other CRUD operations

## Implementation Steps
1. Create Toast store and types
2. Build Toast component
3. Add to layout
4. Integrate with CRUD operations
5. Add animations and styling
6. Test all scenarios
