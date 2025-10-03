<script lang="ts">
  import { syllable } from 'syllable';
  import WordAssistant from './WordAssistant.svelte';
  import { haikuDraftStore, saveHaiku } from './utils/localStore';
  import { v4 as uuidv4 } from 'uuid'; // For generating unique IDs
  import { onMount } from 'svelte';

  let line1: string;
  let line2: string;
  let line3: string;

  // Initialize from local storage
  haikuDraftStore.subscribe(draft => {
    line1 = draft.line1;
    line2 = draft.line2;
    line3 = draft.line3;
  })(); // Immediately invoke to get initial value

  // Update store on changes
  $: {
    haikuDraftStore.set({ line1, line2, line3 });
  }

  let selectedWord: string = '';

  $: syllableCount1 = syllable(line1);
  $: syllableCount2 = syllable(line2);
  $: syllableCount3 = syllable(line3);

  function getSyllableClass(count: number, target: number): string {
    if (count < target) {
      return 'under-count';
    } else if (count === target) {
      return 'correct-count';
    } else {
      return 'over-count';
    }
  }

  function handleClick(event: MouseEvent) {
    const textarea = event.target as HTMLTextAreaElement;
    const cursorPosition = textarea.selectionStart;
    const text = textarea.value;

    // Find the start of the word
    let start = cursorPosition;
    while (start > 0 && /\S/.test(text[start - 1])) {
      start--;
    }

    // Find the end of the word
    let end = cursorPosition;
    while (end < text.length && /\S/.test(text[end])) {
      end++;
    }

    selectedWord = text.substring(start, end).trim();
  }

  // --- Drag/Swipe Logic for Save/Clear ---
  let dragX = 0;
  let startX = 0;
  let isDragging = false;
  let editorElement: HTMLDivElement; // Bind to the editor element

  const SAVE_THRESHOLD_PERCENT = 0.3; // 30%
  const CLEAR_THRESHOLD_PERCENT = 0.6; // 60%

  function handleStart(event: MouseEvent | TouchEvent) {
    // Only start dragging if the user is interacting with the editor area, not the word assistant
    if (event.target instanceof HTMLElement && event.target.closest('.haiku-editor-card')) {
      isDragging = true;
      startX = 'touches' in event ? event.touches[0].clientX : event.clientX;
      // Prevent text selection while dragging
      document.body.style.userSelect = 'none';
    }
  }

  function handleMove(event: MouseEvent | TouchEvent) {
    if (!isDragging) return;

    const currentX = 'touches' in event ? event.touches[0].clientX : event.clientX;
    dragX = currentX - startX;
  }

  function handleEnd() {
    if (!isDragging) return;
    isDragging = false;
    document.body.style.userSelect = '';

    const editorWidth = editorElement.offsetWidth;
    const saveThreshold = editorWidth * SAVE_THRESHOLD_PERCENT;
    const clearThreshold = editorWidth * CLEAR_THRESHOLD_PERCENT;

    if (dragX > saveThreshold) {
      // Save Action (Swipe Right)
      handleSaveHaiku();
      // Animate off-screen right and reset
      dragX = editorWidth;
      setTimeout(() => {
        dragX = 0;
      }, 300); // Reset after animation
    } else if (dragX < -clearThreshold) {
      // Clear Action (Swipe Left)
      // Animate off-screen left and reset
      dragX = -editorWidth;
      setTimeout(() => {
        handleClearHaiku();
        dragX = 0;
      }, 300); // Reset after animation
    } else {
      // Snap back
      dragX = 0;
    }
  }

  function handleSaveHaiku() {
    const newHaiku = {
      id: uuidv4(),
      line1,
      line2,
      line3,
      createdAt: new Date().toISOString()
    };
    saveHaiku(newHaiku);
    // Do NOT clear the current draft here, the swipe action handles the visual clear/reset
  }

  function handleClearHaiku() {
    // Clear the current draft
    line1 = '';
    line2 = '';
    line3 = '';
  }

  // Add global listeners for drag events
  onMount(() => {
    window.addEventListener('mousemove', handleMove as EventListener);
    window.addEventListener('mouseup', handleEnd);
    window.addEventListener('touchmove', handleMove as EventListener);
    window.addEventListener('touchend', handleEnd);

    return () => {
      window.removeEventListener('mousemove', handleMove as EventListener);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchmove', handleMove as EventListener);
      window.removeEventListener('touchend', handleEnd);
    };
  });
</script>

<div class="haiku-editor-container">
  <!-- Background for Save (Right Swipe) -->
  <div class="swipe-background save-bg" style="opacity: {dragX > 0 ? dragX / editorElement?.offsetWidth / SAVE_THRESHOLD_PERCENT : 0}">
    <span class="icon">💾</span> Save
  </div>

  <!-- Background for Clear (Left Swipe) -->
  <div class="swipe-background clear-bg" style="opacity: {dragX < 0 ? Math.abs(dragX) / editorElement?.offsetWidth / CLEAR_THRESHOLD_PERCENT : 0}">
    Clear <span class="icon">🗑️</span>
  </div>

  <div
    class="haiku-editor-card"
    bind:this={editorElement}
    style="transform: translateX({dragX}px); transition: {isDragging ? 'none' : 'transform 0.3s ease-out'};"
    on:mousedown={handleStart}
    on:touchstart={handleStart}
  >
    <div class="haiku-editor">
      <div class="line-input-group">
        <textarea
          bind:value={line1}
          placeholder="First line (5 syllables)"
          class={getSyllableClass(syllableCount1, 5)}
          on:click={handleClick}
        ></textarea>
        <span class="syllable-count">{syllableCount1}</span>
      </div>
      <div class="line-input-group">
        <textarea
          bind:value={line2}
          placeholder="Second line (7 syllables)"
          class={getSyllableClass(syllableCount2, 7)}
          on:click={handleClick}
        ></textarea>
        <span class="syllable-count">{syllableCount2}</span>
      </div>
      <div class="line-input-group">
        <textarea
          bind:value={line3}
          placeholder="Third line (5 syllables)"
          class={getSyllableClass(syllableCount3, 5)}
          on:click={handleClick}
        ></textarea>
        <span class="syllable-count">{syllableCount3}</span>
      </div>
    </div>
  </div>
</div>

<WordAssistant word={selectedWord} />

<style>
  .haiku-editor-container {
    position: relative;
    max-width: 400px;
    margin: 20px auto;
    padding: 0; /* Remove padding from container */
    border: 1px solid #eee;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    overflow: hidden; /* Hide the card when it slides off */
  }

  .haiku-editor-card {
    position: relative;
    width: 100%; /* Added to ensure card fills container width */
    z-index: 10; /* Ensure card is above background */
    background-color: white; /* Ensure card has a solid background */
    cursor: grab;
    touch-action: pan-y; /* Allow vertical scrolling, but handle horizontal drag */
    /* Initial transition for snap-back and slide-off */
    transition: transform 0.3s ease-out;
  }

  .haiku-editor {
    display: flex;
    flex-direction: column;
    gap: 10px;
    /* Increased padding for better touch input: 80px left, 60px right (to balance with counter) */
    padding: 20px 20px 20px 40px;
  }

  .swipe-background {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    font-size: 1.2em;
    font-weight: bold;
    color: white;
    z-index: 5;
    pointer-events: none; /* Ensure background doesn't interfere with drag */
    opacity: 0; /* Controlled by inline style */
  }

  .save-bg {
    background-color: #4CAF50; /* Green for Save */
    justify-content: flex-start;
  }

  .clear-bg {
    background-color: #F44336; /* Red for Clear */
    justify-content: flex-end;
  }

  .swipe-background .icon {
    font-size: 1.5em;
    margin: 0 10px;
  }

  .line-input-group {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  textarea {
    flex-grow: 1;
    min-width: 0; /* Fix for flex item not expanding correctly */
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1.1em;
    line-height: 1.5;
    resize: vertical;
    min-height: 60px;
    box-sizing: border-box;
  }

  textarea:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
  }

  .syllable-count {
    font-size: 0.9em;
    color: #777;
    min-width: 20px; /* Ensure consistent spacing */
    text-align: right;
  }

  /* Color-blind friendly feedback styles */
  .under-count {
    background-color: #f0f0f0; /* Light gray */
  }

  .correct-count {
    background-color: #e0f7fa; /* A pleasant, calm blue */
  }

  .over-count {
    background-color: #ffebee; /* A subtle, non-jarring red */
  }
</style>