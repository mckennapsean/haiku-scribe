<script lang="ts">
  import { savedHaikusStore, type SavedHaiku } from '$lib/utils/localStore';

  let savedHaikus: SavedHaiku[] = [];

  savedHaikusStore.subscribe(haikus => {
    savedHaikus = haikus;
  });
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
      </div>
    {/each}
  </div>
{:else}
  <p>You haven't saved any haikus yet.</p>
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
  }

  .haiku-item p {
    margin: 0 0 5px 0;
    font-size: 1.1em;
    line-height: 1.4;
  }

  .haiku-item small {
    color: #777;
    font-size: 0.8em;
  }
</style>