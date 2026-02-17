<script>
  import { createEventDispatcher } from 'svelte';

  /** @typedef {{ user: string, text: string, rating: number }} CommentPayload */

  const dispatch = createEventDispatcher();

  let user = '';
  let text = '';
  let rating = 5;

  // Näytetään pieni virheviesti (ei pakollinen, mutta hyödyllinen)
  let error = '';

  function clampRating(n) {
    return Math.min(5, Math.max(1, n));
  }

  function submitComment() {
    error = '';

    const cleanedUser = user.trim();
    const cleanedText = text.trim();
    const cleanedRating = clampRating(Number(rating));

    // required-attribuutti estää submitin yleensä, mutta trim-validointi
    // estää myös tapaukset "   " (pelkät välilyönnit).
    if (!cleanedUser) {
      error = 'Anna nimi.';
      return;
    }
    if (!cleanedText) {
      error = 'Kirjoita kommentti.';
      return;
    }

    /** @type {CommentPayload} */
    const payload = {
      user: cleanedUser,
      text: cleanedText,
      rating: cleanedRating
    };

    dispatch('addComment', payload);

    // Nollaa formi
    user = '';
    text = '';
    rating = 5;
  }
</script>

<form on:submit|preventDefault={submitComment} class="comment-form">
  {#if error}
    <p class="error">{error}</p>
  {/if}

  <input placeholder="Nimi" bind:value={user} required />
  <textarea placeholder="Kommentti" bind:value={text} required rows="3" ></textarea>

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

<style>
  .comment-form {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-top: 0.75rem;
  }

  .error {
    margin: 0;
    color: #b00020;
  }
</style>
