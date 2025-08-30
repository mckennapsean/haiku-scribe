<script lang="ts">
  import { savedHaikusStore, deleteHaiku, loadHaikuToEditor, type SavedHaiku } from '$lib/utils/localStore';
  import { goto } from '$app/navigation';

  let savedHaikus: SavedHaiku[] = [];

  savedHaikusStore.subscribe(haikus => {
    savedHaikus = haikus;
  });

  function handleLoadToEditor(haiku: SavedHaiku) {
    loadHaikuToEditor(haiku);
    goto('/'); // Navigate to the editor page
  }

  async function handleCopyToClipboard(haiku: SavedHaiku) {
    const haikuText = `${haiku.line1}\n${haiku.line2}\n${haiku.line3}`;
    try {
      await navigator.clipboard.writeText(haikuText);
      alert('Haiku copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy haiku: ', err);
      alert('Failed to copy haiku.');
    }
  }

  function handleDeleteHaiku(id: string) {
    if (confirm('Are you sure you want to delete this haiku?')) {
      deleteHaiku(id);
    }
  }
</script>

<h1>My Haikus</h1>

{#if savedHaikus.length > 0}
  <div class="haiku-list">
    {#each savedHaikus as haiku (haiku.id)}
      <div class="haiku-item">
        <p>{haiku.line1}</p>
        <p>{haiku.line2}</p>
        <p>{haiku.line3}</p>
        <small>Saved on: {new Date(haiku.createdAt).toLocaleString()}</small>
        <div class="haiku-actions">
          <button on:click={() => handleLoadToEditor(haiku)}>Load to Editor</button>
          <button on:click={() => handleCopyToClipboard(haiku)}>Copy to Clipboard</button>
          <button on:click={() => handleDeleteHaiku(haiku.id)}>Delete</button>
        </div>
      </div>
    {/each}
  </div>
{:else}
  <p>You haven\'t saved any haikus yet.</p>
{/if}

<style>
  .haiku-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
    margin-top: 20px;
  }

  .haiku-item {
    border: 1px solid #eee;
    border-radius: 8px;
    padding: 15px;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    display: flex;
    flex-direction: column;
    justify-content: space-between; /* Pushes actions to the bottom */
  }

  .haiku-item p {
    margin: 0 0 5px 0;
    font-size: 1.1em;
    line-height: 1.4;
  }

  .haiku-item small {
    color: #777;
    font-size: 0.8em;
    margin-bottom: 10px; /* Space between date and buttons */
    display: block; /* Ensures margin-bottom works */
  }

  .haiku-actions {
    display: flex;
    gap: 5px;
    margin-top: 10px; /* Space between haiku text and buttons */
    flex-wrap: wrap; /* Allow buttons to wrap on smaller screens */
  }

  .haiku-actions button {
    padding: 8px 12px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9em;
    transition: background-color 0.2s ease-in-out;
    flex-grow: 1; /* Allow buttons to grow and fill space */
  }

  .haiku-actions button:hover {
    background-color: #0056b3;
  }

  .haiku-actions button:last-child {
    background-color: #dc3545; /* Red for delete */
  }

  .haiku-actions button:last-child:hover {
    background-color: #c82333;
  }
</style>
