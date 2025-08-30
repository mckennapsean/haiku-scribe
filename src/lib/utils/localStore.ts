<script lang="ts">
  import { writable } from 'svelte/store';

  const LOCAL_STORAGE_KEY = 'haiku_draft';

  // Function to save the haiku draft to local storage
  export function saveHaikuDraft(line1: string, line2: string, line3: string) {
    const draft = JSON.stringify({ line1, line2, line3 });
    localStorage.setItem(LOCAL_STORAGE_KEY, draft);
  }

  // Function to load the haiku draft from local storage
  export function loadHaikuDraft(): { line1: string; line2: string; line3: string } {
    const draft = localStorage.getItem(LOCAL_STORAGE_KEY);
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
</script>