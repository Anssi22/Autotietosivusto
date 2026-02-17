<script>
  export let comments = [];

  // Lasketaan vain niistä kommenteista, joilla on numeerinen rating
  $: rated = (comments || []).filter(c => typeof c?.rating === 'number');

  $: avgRating = rated.length
    ? (rated.reduce((sum, c) => sum + c.rating, 0) / rated.length).toFixed(1)
    : null;
</script>

<section class="comments">
  
  <h3>Kommentit</h3>
  
  {#if avgRating}
    <p>Keskiarvoarvosana: {avgRating} / 5</p>
  {/if}
  
  {#if !comments || comments.length === 0}
    <p>Ei kommentteja vielä.</p>
  {:else}
    <ul>
      {#each comments as c}
        <li>
          <strong>{c.user}</strong> ({c.rating}/5): {c.text}
        </li>
      {/each}
    </ul>
  {/if}
</section>

<style>

</style>
