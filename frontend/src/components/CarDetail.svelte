<script>
  import { createEventDispatcher } from 'svelte';
  import CommentList from './CommentList.svelte';
  import CommentForm from './CommentForm.svelte';

  export let selectedCar;

  // Koska createEventDispatcher() palauttaa funktion, jolla tämä komponentti voi lähettää “component eventtejä” 
  // ylöspäin vanhemmalle komponentille. Kun teet const dispatch = createEventDispatcher();, 
  // talletat sen palauttaman funktion muuttujaan dispatch, jotta voit myöhemmin kutsua sitä näin: 
  // dispatch('addComment', payload).
  const dispatch = createEventDispatcher();

  function forwardAddComment(e) {
    // Välitetään sama eventti vanhemmalle komponentille
    dispatch('addComment', e.detail);
  }
</script>

{#if selectedCar}
  <aside class="detail">
    {#if selectedCar.imageUrl}
    <img
      src={selectedCar.imageUrl}
      alt={`${selectedCar.manufacturer} ${selectedCar.name}`}
      class="car-image"
      />
    {/if}
    <h2>{selectedCar.name}</h2>
    <p><strong>{selectedCar.manufacturer}</strong> · {selectedCar.year}</p>

    {#if selectedCar.fuelType}
      <p>Polttoainetyyppi: {selectedCar.fuelType}</p>
    {/if}

    {#if selectedCar.horsepower}
      <p>Teho: {selectedCar.horsepower} hv</p>
    {/if}

    <p>{selectedCar.description}</p>

    <CommentList comments={selectedCar.comments} />
    <CommentForm on:addComment={forwardAddComment} />
  </aside>
{:else}
  <p>Ei valittua autoa.</p>
{/if}

<style>
  .detail {
    margin-top: 1.5rem;
    padding-top: 1rem;
    border-top: 1px solid #ddd;
  }

  .car-image {
    width: 100%;
    max-width: 500px;
    height: auto;
    border-radius: 8px;
    display: block;
    margin: 0.75rem 0;
  }
</style>
