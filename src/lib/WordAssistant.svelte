<script lang="ts">
  import thesaurus from 'thesaurus';

  export function getSynonyms(word: string): string[] {
    // The thesaurus package returns an array of synonyms
    // or an empty array if no synonyms are found.
    return thesaurus.find(word);
  }
</script>

<!-- The UI for the WordAssistant will be built in a later task -->