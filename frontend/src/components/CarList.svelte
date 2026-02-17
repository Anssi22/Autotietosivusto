<script>
  import { createEventDispatcher } from 'svelte';
  // Tarkoittaa: “tää komponentti ottaa vastaan propin nimeltä cars”, ja =[] on default jos sitä ei anneta.
  export let cars = [];
  const dispatch = createEventDispatcher();

  function selectCar(car) {
    dispatch('select', car);
  }
  // Lisätään editCar-funktio, dispatch: CarList “huutaa ylöspäin” vanhemmalle:
  // eventin nimi on 'edit'
  // mukana tuleva data on car (tai vaihtoehtoisesti pelkkä car._id)
  function editCar(car) {
    dispatch("edit", car);
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
      <article class="car-card">
        <div class="card-body">
          {#if car.imageUrl}
            <img src={car.imageUrl} alt={car.name} />
          {/if}
          <h3>{car.name}</h3>
          <p>{car.manufacturer} · {car.year}</p>
          {#if car.fuelType}<p>{car.fuelType}</p>{/if}
          <p>{car.description}</p>
        </div>
        <div class="card-actions">
          <button on:click={() => selectCar(car)}>Näytä tiedot</button>
          <button class="edit" on:click={() => editCar(car)}>Muokkaa</button>
          <button class="danger" on:click={() => deleteCar(car._id)}>Poista</button>
        </div>
      </article>
    {/each}
  {/if}
</div>
