<script lang="ts">
  import { syllable } from 'syllable';

  let line1: string = '';
  let line2: string = '';
  let line3: string = '';

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
</script>

<div class="haiku-editor">
  <div class="line-input-group">
    <textarea
      bind:value={line1}
      placeholder="First line (5 syllables)"
      class={getSyllableClass(syllableCount1, 5)}
    ></textarea>
    <span class="syllable-count">{syllableCount1}</span>
  </div>
  <div class="line-input-group">
    <textarea
      bind:value={line2}
      placeholder="Second line (7 syllables)"
      class={getSyllableClass(syllableCount2, 7)}
    ></textarea>
    <span class="syllable-count">{syllableCount2}</span>
  </div>
  <div class="line-input-group">
    <textarea
      bind:value={line3}
      placeholder="Third line (5 syllables)"
      class={getSyllableClass(syllableCount3, 5)}
    ></textarea>
    <span class="syllable-count">{syllableCount3}</span>
  </div>
</div>

<style>
  .haiku-editor {
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-width: 500px;
    margin: 20px auto;
    padding: 20px;
    border: 1px solid #eee;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }

  .line-input-group {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  textarea {
    flex-grow: 1;
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