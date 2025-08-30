<script lang="ts">
  let line1: string = '';
  let line2: string = '';
  let line3: string = '';
</script>

<div class="haiku-editor">
  <textarea bind:value={line1} placeholder="First line (5 syllables)"></textarea>
  <textarea bind:value={line2} placeholder="Second line (7 syllables)"></textarea>
  <textarea bind:value={line3} placeholder="Third line (5 syllables)"></textarea>
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

  textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1.1em;
    line-height: 1.5;
    resize: vertical;
    min-height: 60px;
    box-sizing: border-box; /* Include padding and border in the element's total width and height */
  }

  textarea:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
  }
</style>