<script lang="ts">
  import thesaurus from 'thesaurus';
  import { syllable } from 'syllable';

  export let word: string = '';

  interface SynonymData {
    text: string;
    syllables: number;
  }

  $: synonymsData = getSynonyms(word).map(s => ({
    text: s,
    syllables: syllable(s)
  }));

  function getSynonyms(word: string): string[] {
    // The thesaurus package returns an array of synonyms
    // or an empty array if no synonyms are found.
    return thesaurus.find(word);
  }
</script>

{#if word}
  <div class="word-assistant-panel">
    <h3>Synonyms for "{word}"</h3>
    {#if synonymsData.length > 0}
      <ul>
        {#each synonymsData as syn}
          <li>{syn.text} ({syn.syllables})</li>
        {/each}
      </ul>
    {:else}
      <p>No synonyms found.</p>
    {/if}
  </div>
{/if}

<style>
  .word-assistant-panel {
    max-width: 300px;
    width: 100%;
    border: 1px solid #eee;
    border-radius: 8px;
    padding: 15px;
    background-color: #f9f9f9;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    margin: 20px auto;
    box-sizing: border-box;
  }

  .word-assistant-panel h3 {
    margin-top: 0;
    color: #333;
  }

  .word-assistant-panel ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .word-assistant-panel li {
    padding: 5px 0;
    border-bottom: 1px dotted #ddd;
  }

  .word-assistant-panel li:last-child {
    border-bottom: none;
  }

  .word-assistant-panel p {
    color: #777;
  }
</style>