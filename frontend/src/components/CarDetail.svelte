<script>
  import { createEventDispatcher } from 'svelte';
  export let selectedCar;
  const dispatch = createEventDispatcher();

  let user = '';
  let text = '';
  let rating = 5;

  function submitComment() {
    dispatch('addComment', { user, text, rating: Number(rating) });
    user = '';
    text = '';
    rating = 5;
  }

  $: avgRating = selectedCar?.comments?.length
    ? (selectedCar.comments.reduce((sum, c) => sum + (c.rating || 0), 0) /
       selectedCar.comments.length).toFixed(1)
    : null;
</script>

<aside class="detail">
  <h2>{selectedCar.name}</h2>
  <p><strong>{selectedCar.manufacturer}</strong> · {selectedCar.year}</p>
  {#if selectedCar.fuelType}<p>Polttoainetyyppi: {selectedCar.fuelType}</p>{/if}
  {#if selectedCar.horsepower}<p>Teho: {selectedCar.horsepower} hv</p>{/if}
  <p>{selectedCar.description}</p>

  {#if avgRating}
    <p>Keskiarvoarvosana: {avgRating} / 5</p>
  {/if}

  <h3>Kommentit</h3>
  {#if !selectedCar.comments || selectedCar.comments.length === 0}
    <p>Ei kommentteja vielä.</p>
  {:else}
    <ul>
      {#each selectedCar.comments as c}
        <li>
          <strong>{c.user}</strong> ({c.rating}/5): {c.text}
        </li>
      {/each}
    </ul>
  {/if}

  <form on:submit|preventDefault={submitComment} class="comment-form">
    <input placeholder="Nimi" bind:value={user} required />
    <textarea placeholder="Kommentti" bind:value={text} required rows="3" />
    <label>
      Arvosana:
      <select bind:value={rating}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
    </label>
    <button type="submit">Lähetä kommentti</button>
  </form>
</aside>

<style>
  .detail {
    margin-top: 1.5rem;
    padding-top: 1rem;
    border-top: 1px solid #ddd;
  }
  .comment-form {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-top: 0.75rem;
  }
</style>