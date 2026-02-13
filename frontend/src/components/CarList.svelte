<script>
  import { createEventDispatcher } from 'svelte';
  export let cars = [];
  const dispatch = createEventDispatcher();

  function selectCar(car) {
    dispatch('select', car);
  }

  function deleteCar(id) {
    if (confirm('Poistetaanko auto?')) {
      dispatch('delete', id);
    }
  }
</script>

<div class="car-list">
  {#if cars.length === 0}
    <p>Ei autoja.</p>
  {:else}
    {#each cars as car}
      <article class="card">
        {#if car.imageUrl}
          <img src={car.imageUrl} alt={car.name} />
        {/if}
        <h3>{car.name}</h3>
        <p>{car.manufacturer} · {car.year}</p>
        {#if car.fuelType}<p>{car.fuelType}</p>{/if}
        <p>{car.description}</p>
        <button on:click={() => selectCar(car)}>Näytä tiedot</button>
        <button class="danger" on:click={() => deleteCar(car._id)}>Poista</button>
      </article>
    {/each}
  {/if}
</div>

<style>
  .car-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 1rem;
  }
  .card {
    border: 1px solid #ddd;
    border-radius: 6px;
    padding: 0.75rem;
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
  }
  .card img {
    max-width: 100%;
    border-radius: 4px;
  }
  .danger {
    background: #c0392b;
    color: white;
  }
</style>