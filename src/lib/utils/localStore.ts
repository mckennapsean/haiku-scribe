<script lang="ts">
  import { writable } from 'svelte/store';

  const LOCAL_STORAGE_DRAFT_KEY = 'haiku_draft';
  const LOCAL_STORAGE_HAIKUS_KEY = 'saved_haikus';

  export interface SavedHaiku {
    id: string; // Unique ID for each haiku
    line1: string;
    line2: string;
    line3: string;
    createdAt: string;
  }

  // --- Draft Haiku Functions ---

  // Function to save the haiku draft to local storage
  export function saveHaikuDraft(line1: string, line2: string, line3: string) {
    const draft = JSON.stringify({ line1, line2, line3 });
    localStorage.setItem(LOCAL_STORAGE_DRAFT_KEY, draft);
  }

  // Function to load the haiku draft from local storage
  export function loadHaikuDraft(): { line1: string; line2: string; line3: string } {
    const draft = localStorage.getItem(LOCAL_STORAGE_DRAFT_KEY);
    if (draft) {
      return JSON.parse(draft);
    } else {
      return { line1: '', line2: '', line3: '' };
    }
  }

  // Create a writable store for auto-saving
  export const haikuDraftStore = writable(loadHaikuDraft());

  // Subscribe to changes in the store and save to local storage
  haikuDraftStore.subscribe(value => {
    saveHaikuDraft(value.line1, value.line2, value.line3);
  });

  // --- Saved Haikus Functions ---

  // Function to load all saved haikus from local storage
  function loadSavedHaikus(): SavedHaiku[] {
    const saved = localStorage.getItem(LOCAL_STORAGE_HAIKUS_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
    return [];
  }

  // Function to save a new haiku to local storage
  export function saveHaiku(haiku: SavedHaiku) {
    const currentHaikus = loadSavedHaikus();
    currentHaikus.push(haiku);
    localStorage.setItem(LOCAL_STORAGE_HAIKUS_KEY, JSON.stringify(currentHaikus));
    savedHaikusStore.set(currentHaikus); // Update the store
  }

  // Create a writable store for saved haikus
  export const savedHaikusStore = writable<SavedHaiku[]>(loadSavedHaikus());
</script>