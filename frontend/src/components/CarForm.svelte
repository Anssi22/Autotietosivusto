<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  let name = '';
  let manufacturer = '';
  let year = '';
  let fuelType = '';
  let horsepower = '';
  let description = '';
  let imageUrl = '';

  function submitForm() {
    const car = {
      name,
      manufacturer,
      year: Number(year),
      fuelType,
      horsepower: horsepower ? Number(horsepower) : undefined,
      description,
      imageUrl
    };
    dispatch('addCar', car);

    name = manufacturer = fuelType = description = imageUrl = '';
    year = horsepower = '';
  }
</script>

<form on:submit|preventDefault={submitForm} class="form">
  <input placeholder="Auton nimi" bind:value={name} required />
  <input placeholder="Valmistaja" bind:value={manufacturer} required />
  <input placeholder="Vuosimalli" type="number" bind:value={year} required />
  <input placeholder="Polttoainetyyppi" bind:value={fuelType} />
  <input placeholder="Hevosvoimat" type="number" bind:value={horsepower} />
  <input placeholder="Kuvan URL" bind:value={imageUrl} />
  <textarea
    placeholder="Kuvaus"
    bind:value={description}
    rows="3">
  </textarea>
  <button type="submit">Lisää auto</button>
</form>

<style>
  .form {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  input, textarea {
    padding: 0.4rem 0.6rem;
  }
</style>