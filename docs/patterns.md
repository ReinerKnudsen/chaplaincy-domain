# Code Patterns Referenz

Eine fortlaufende Dokumentation der Patterns, die in diesem Projekt verwendet werden.
Jedes Pattern erklärt **was** es macht, **warum** es so gelöst ist, und **wo** es im Code vorkommt.

---

## Inhaltsverzeichnis

1. [Svelte 5: $props() Destructuring](#1-svelte-5-props-destructuring)
2. [Svelte 5: $derived statt $state + $effect](#2-svelte-5-derived-statt-state--effect)
3. [Svelte 5: Snippets (children)](#3-svelte-5-snippets-children)
4. [{@const} im Template](#4-const-im-template)
5. [{#each} mit Key](#5-each-mit-key)
6. [TypeScript: Record<string, unknown>](#6-typescript-recordstring-unknown)
7. [TypeScript: import type](#7-typescript-import-type)
8. [TypeScript: Underscore-Prefix für ungenutzte Parameter](#8-typescript-underscore-prefix-für-ungenutzte-parameter)
9. [TypeScript: Event-Typing für Input-Handler](#9-typescript-event-typing-für-input-handler)
10. [Short-Circuit zu if-Statement](#10-short-circuit-zu-if-statement)
11. [Destructuring: ID vom Rest trennen](#11-destructuring-id-vom-rest-trennen)
12. [SvelteSet statt Set](#12-svelteset-statt-set)
13. [Nullish Coalescing Operator (??)](#13-nullish-coalescing-operator-)

---

## 1. Svelte 5: $props() Destructuring

### Was?

In Svelte 5 werden Props mit `$props()` deklariert und direkt destructured.

### Warum?

Ersetzt das alte `export let` Pattern aus Svelte 4. Bietet bessere TypeScript-Integration und klarere Prop-Definitionen.

### Wie?

```svelte
<script lang="ts">
	interface Props {
		title: string;
		subtitle?: string;
		onSave?: () => void;
	}

	let { title, subtitle = 'Default', onSave }: Props = $props();
</script>
```

### Wo im Code?

- `src/lib/components/Label.svelte` — einfaches Beispiel mit optionalen Props
- `src/lib/components/UserForm.svelte` — mit Callback-Props
- `src/lib/components/EventForm.svelte` — komplexes Beispiel mit vielen Props

---

## 2. Svelte 5: $derived statt $state + $effect

### Was?

`$derived` berechnet einen Wert automatisch neu, wenn sich seine Abhängigkeiten ändern. Es ersetzt das Pattern `$state` + `$effect` für abgeleitete Werte.

### Warum?

- Weniger Code
- Keine manuelle Synchronisation nötig
- Svelte erkennt Abhängigkeiten automatisch

### Wie?

```svelte
<!-- FALSCH: $state + $effect -->
<script lang="ts">
    let user = $state(null);
    $effect(() => {
        user = $authStore.user;
    });
</script>

<!-- RICHTIG: $derived -->
<script lang="ts">
    let user = $derived($authStore.user);
</script>
```

**Wichtig:** `$derived` nimmt einen **Ausdruck**, keine Arrow-Function:

```typescript
// Falsch:
let user = $derived(() => $authStore.user);

// Richtig:
let user = $derived($authStore.user);
```

### Wo im Code?

- `src/lib/components/Navigation.svelte` — `user` wird aus `$authStore` abgeleitet
- `src/lib/components/UserForm.svelte` — `isValid` wird aus Formularfeldern abgeleitet

---

## 3. Svelte 5: Snippets (children)

### Was?

Snippets ersetzen das alte Slot-System aus Svelte 4. `children` ist ein spezielles Snippet — der Inhalt zwischen den Tags einer Komponente.

### Warum?

- Typsicher mit `Snippet` aus Svelte
- Können Parameter haben (Daten an den Parent zurückgeben)
- Flexibler als Slots

### Wie?

```svelte
<!-- Komponente definieren -->
<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children?: Snippet; // Einfacher Content
		header?: Snippet; // Benanntes Snippet
		row?: Snippet<[string]>; // Snippet mit Parameter
	}

	let { children, header, row }: Props = $props();
</script>

{@render header?.()}
{@render children?.()}

<!-- Komponente nutzen -->
<MyComponent>
	<p>Dieser Text wird als "children" übergeben</p>
</MyComponent>
```

**Wichtig:** `Snippet` ist bereits ein Funktionstyp. Nicht `() => Snippet` schreiben!

### Wo im Code?

- `src/lib/components/Label.svelte` — einfaches `children` Snippet

---

## 4. {@const} im Template

### Was?

`{@const}` deklariert eine lokale Konstante innerhalb eines Template-Blocks.

### Warum?

- Vermeidet mehrfache Funktionsaufrufe im Template
- Ersetzt den `{#each [value] as variable}`-Trick
- Sauberer und lesbarer

### Wie?

```svelte
<!-- VORHER: Trick mit Array-Wrapper -->
{#each [getImageUsage(image.name)] as usages}
	{#if usages.length > 0}
		...
	{/if}
{/each}

<!-- NACHHER: @const -->
{@const usages = getImageUsage(image.name)}
{#if usages.length > 0}
	...
{/if}
```

### Regeln:

- Muss **innerhalb** eines Blocks stehen (`{#each}`, `{#if}`, etc.)
- Kann **nicht** auf Top-Level des Templates stehen
- Ist **read-only**

### Wo im Code?

- `src/routes/(admin)/admin/mediaadmin/+page.svelte` — `getImageUsage()` Ergebnis als Konstante

---

## 5. {#each} mit Key

### Was?

Jeder `{#each}` Block braucht einen eindeutigen Key, damit Svelte DOM-Elemente effizient aktualisieren kann.

### Warum?

Ohne Key muss Svelte bei Änderungen die gesamte Liste neu rendern. Mit Key kann es einzelne Elemente gezielt aktualisieren, verschieben oder entfernen.

### Wie?

```svelte
<!-- FALSCH: ohne Key -->
{#each items as item}
	<p>{item.name}</p>
{/each}

<!-- RICHTIG: mit Key -->
{#each items as item (item.id)}
	<p>{item.name}</p>
{/each}
```

Der Key muss **eindeutig** sein. Typischerweise eine `id` Property.

### Fallback: Index als Key

Wenn die Items keinen natürlichen Identifier haben (z.B. einfache Strings), kann der **Index** als Key verwendet werden:

```svelte
{#each results.errors as error, i (i)}
	<li>{error}</li>
{/each}
```

**Achtung:** Der Index ist ein "unechter" Key — er identifiziert die **Position**, nicht das Element. Das funktioniert gut für Listen, die sich nicht umsortieren. Bei sortierbaren Listen sollte immer eine echte ID verwendet werden, weil Svelte sonst bei Umsortierungen die falschen DOM-Elemente wiederverwendet.

### Wo im Code?

- `src/lib/components/Navigation.svelte` — `(menuItem.id)` für Menü-Items
- `src/routes/(pages)/news/+page.svelte` — `(newsItem.id)` für News-Artikel
- `src/routes/(admin)/admin/mediaadmin/+page.svelte` — `(image.name)` für Bilder
- `src/lib/data/menu.json` — IDs wurden extra für Keys hinzugefügt

---

## 6. TypeScript: Record<string, unknown>

### Was?

`Record<string, unknown>` definiert ein Objekt mit String-Keys und beliebigen Werten — typsicher.

### Warum?

Ersetzt `any` für generische Objekte. `unknown` erzwingt Type-Checks vor dem Zugriff, `any` nicht.

### Wie?

```typescript
// FALSCH: any schaltet TypeScript aus
const processData = (obj: any) => { ... }

// RICHTIG: Record erzwingt Objekt-Typ
const processData = (obj: Record<string, unknown>) => {
    // Muss Typ prüfen vor Zugriff:
    if (typeof obj.name === 'string') {
        obj.name.trim(); // OK
    }
}
```

### Varianten:

```typescript
Record<string, unknown>; // Beliebige Werte (typsicher)
Record<string, string>; // Nur String-Werte
Record<string, number>; // Nur Number-Werte
```

### Wo im Code?

- `src/lib/stores/ObjectStore.ts` — `createHashableString()` akzeptiert generische Objekte

---

## 7. TypeScript: import type

### Was?

`import type` importiert nur den Typ, nicht den Wert. Wird zur Laufzeit komplett entfernt.

### Warum?

- Macht klar, dass der Import nur für TypeScript-Typen ist
- Verhindert zirkuläre Abhängigkeiten
- Wird beim Build entfernt → kleineres Bundle

### Wie?

```typescript
// Normaler Import (Wert + Typ):
import { Editor } from '@toast-ui/editor';

// Nur Typ-Import (wird zur Laufzeit entfernt):
import type { Editor } from '@toast-ui/editor';
import type { Snippet } from 'svelte';
```

**Wann welchen?**

- `import type` → wenn du den Import nur für Typ-Annotationen brauchst
- `import` → wenn du den Import auch zur Laufzeit brauchst (z.B. `new Editor()`)

### Wo im Code?

- `src/lib/components/ToastEditor.svelte` — `import type Editor` für die Typ-Annotation, dynamischer Import für die Instanz
- `src/lib/components/Label.svelte` — `import type { Snippet } from 'svelte'`

---

## 8. TypeScript: Underscore-Prefix für ungenutzte Parameter

### Was?

Parameter die mit `_` beginnen, werden von ESLint als "absichtlich ungenutzt" erkannt.

### Warum?

TypeScript erzwingt Parameternamen in Typ-Signaturen, auch wenn sie nie als Variable existieren. ESLint meldet diese als "unused". Das `_` Prefix signalisiert: "Ich weiß, wird nicht genutzt."

### Wie?

```typescript
// PROBLEM: "items" wird als unused gemeldet
function update(fn: (items: Location[]) => Location[]) { ... }

// LÖSUNG: Underscore-Prefix
function update(fn: (_items: Location[]) => Location[]) { ... }
```

### Wo im Code?

- `src/lib/stores/LocationsStore.ts` — `updateAndSortLocations` Typ-Signatur

---

## 9. TypeScript: Event-Typing für Input-Handler

### Was?

DOM-Events in TypeScript brauchen korrekte Typen. `event.target` ist standardmäßig nur `EventTarget | null`.

### Warum?

Ohne Type Assertion hat `event.target` keine `files`, `value` etc. Properties.

### Wie?

```typescript
const handleFileChange = async (event: Event) => {
	const target = event.target as HTMLInputElement;
	if (target.files) {
		const file = target.files[0];
		// ...
	}
};
```

### Wo im Code?

- `src/lib/components/UploadPDF.svelte` — File-Input Handler

---

## 10. Short-Circuit zu if-Statement

### Was?

`callback && callback()` (Short-Circuit) wird zu einem expliziten `if`-Statement.

### Warum?

ESLint (`no-unused-expressions`) verbietet Ausdrücke, die keinen Effekt haben. Short-Circuit ist ein Ausdruck, `if` ist ein Statement.

### Wie?

```typescript
// VORHER: Short-Circuit (ESLint-Error)
onCancel && onCancel();

// NACHHER: Explizites if
if (onCancel) {
	onCancel();
}
```

Funktional identisch, aber expliziter und lesbarer.

### Wo im Code?

- `src/lib/components/UserForm.svelte` — `handleCancel`
- `src/lib/components/UploadPDF.svelte` — `handleFileChange`
- `src/lib/components/NewLocationForm.svelte` — `handleSave`
- `src/lib/components/UploadImage.svelte` — `handleFileSelect`

---

## 11. Destructuring: ID vom Rest trennen

### Was?

Mit Destructuring kann man die `id` eines Objekts vom Rest der Daten trennen, bevor man es z.B. in Firestore speichert.

### Warum?

- **Typsicher** — kein `delete` auf required Properties
- **Immutable** — erstellt ein neues Objekt statt das Original zu mutieren
- **Wartbar** — neue Properties werden automatisch eingeschlossen

### Wie?

```typescript
const { id, ...dataToSave } = location;
// id = "abc123"
// dataToSave = { name: "Church", address: "..." } (alles außer id)

await setDoc(doc(database, 'location', id), dataToSave);
```

### Wo im Code?

- `src/routes/(admin)/admin/locationsadmin/+page.svelte` — beim Speichern von Locations

---

## 12. SvelteSet statt Set

### Was?

`SvelteSet` ist ein reaktiver Ersatz für das native JavaScript `Set`.

### Warum?

Svelte 5 kann Änderungen an nativen `Set`/`Map` nicht tracken. `SvelteSet` aus `svelte/reactivity` ist reaktiv — Änderungen lösen automatisch UI-Updates aus.

### Wie?

```typescript
import { SvelteSet } from 'svelte/reactivity';

// FALSCH: nicht reaktiv
const selectedIds = new Set<string>();

// RICHTIG: reaktiv
const selectedIds = new SvelteSet<string>();
```

Gleiches gilt für `SvelteMap`, `SvelteDate`, `SvelteURL`.

### Wo im Code?

- `src/routes/(admin)/admin/mediaadmin/+page.svelte` — `eventIds` und `newsIds` Sets
- `src/lib/components/EventForm.svelte` — `new SvelteDate()` statt `new Date()`
- `src/lib/components/WeeklySheetForm.svelte` — `new SvelteDate()` statt `new Date()`

---

## 13. Nullish Coalescing Operator (??)

### Was?

Der `??` Operator gibt den rechten Wert zurück, wenn der linke `null` oder `undefined` ist.

### Warum?

TypeScript beschwert sich, wenn ein Wert `string | null` ist, aber eine Funktion nur `string` akzeptiert. Mit `??` gibst du einen Fallback-Wert an, der TypeScript zufriedenstellt. Auch innerhalb eines `if`-Checks narrowt TypeScript nicht immer korrekt, besonders bei `$state`-Variablen in Svelte 5, weil sich der Wert zwischen Check und Zugriff theoretisch ändern könnte.

### Wie?

```typescript
// PROBLEM: TypeScript sagt "string | null" ist nicht "string"
const parsed = await marked(thisEvent.description); // ❌ Error

// LÖSUNG: Fallback mit ??
const parsed = await marked(thisEvent.description ?? ''); // ✅
```

### Unterschied zu `||`:

```typescript
// ?? reagiert nur auf null und undefined
0 ?? 'fallback'; // → 0
'' ?? 'fallback'; // → ''
null ?? 'fallback'; // → 'fallback'

// || reagiert auf ALLE falsy Werte
0 || 'fallback'; // → 'fallback' (!)
'' || 'fallback'; // → 'fallback' (!)
null || 'fallback'; // → 'fallback'
```

`??` ist präziser und sicherer als `||`, weil `0` und `''` gültige Werte sein können.

### Wo im Code?

- `src/routes/(pages)/events/[eventId]/+page.svelte` — `thisEvent.description ?? ''` für `marked()` Aufruf
