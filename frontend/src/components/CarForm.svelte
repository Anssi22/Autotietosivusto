<script>
  import { createEventDispatcher } from 'svelte';

  // Parent antaa nämä:
  export let mode = 'create';      // 'create' | 'edit'
  export let initialData = null;   // auton data kun muokataan

  const dispatch = createEventDispatcher();

  // Lomakekentät
  let name = '';
  let manufacturer = '';
  let year = '';
  let fuelType = '';
  let horsepower = '';
  let description = '';
  let imageUrl = '';

  // Kun initialData/mode muuttuu, täytetään lomake (edit) tai tyhjennetään (create)
  $: if (mode === 'edit' && initialData) {
    name = initialData.name ?? '';
    manufacturer = initialData.manufacturer ?? '';
    year = initialData.year ?? '';
    fuelType = initialData.fuelType ?? '';
    horsepower = initialData.horsepower ?? '';
    description = initialData.description ?? '';
    imageUrl = initialData.imageUrl ?? '';
  }

  $: if (mode === 'create') {
    // jos vaihdat edit -> create, tyhjennä kentät
    // (tämä triggeröityy aina kun mode = 'create')
    name = '';
    manufacturer = '';
    year = '';
    fuelType = '';
    horsepower = '';
    description = '';
    imageUrl = '';
  }

  function submit() {
    const payload = {
      name: name.trim(),
      manufacturer: manufacturer.trim(),
      year: Number(year),
      fuelType: fuelType.trim(),
      horsepower: horsepower ? Number(horsepower) : undefined,
      description: description.trim(),
      imageUrl: imageUrl.trim()
    };

    if (mode === 'edit' && initialData?._id) {
      dispatch('updateCar', { id: initialData._id, ...payload });
    } else {
      dispatch('addCar', payload);
    }
  }

  function cancelEdit() {
    dispatch('cancelEdit');
  }
</script>

<form on:submit|preventDefault={submit} class="form">
  <h3>{mode === 'edit' ? 'Muokkaa autoa' : 'Lisää auto'}</h3>

  <input placeholder="Auton nimi" bind:value={name} required />
  <input placeholder="Valmistaja" bind:value={manufacturer} required />

  <input type="number" placeholder="Vuosimalli" bind:value={year} required />

  <select
  bind:value={fuelType}
  class:placeholder={fuelType === ''}
  class="form-select">
    <option value="">Polttoainetyyppi</option>
    <option value="Bensiini">Bensiini</option>
    <option value="Diesel">Diesel</option>
    <option value="Sähkö">Sähkö</option>
    <option value="Hybridi">Hybridi</option>
  </select>
 
  <input type="number" placeholder="Teho (hv)" bind:value={horsepower} />

  <input placeholder="Kuvan URL" bind:value={imageUrl} />
  <textarea placeholder="Kuvaus" bind:value={description} rows="4"></textarea>

  <div class="buttons">
    <button type="submit">
      {mode === 'edit' ? 'Tallenna muutokset' : 'Lisää auto'}
    </button>

    {#if mode === 'edit'}
      <button type="button" class="secondary" on:click={cancelEdit}>
        Peruuta
      </button>
    {/if}
  </div>
</form>

<style>
  .form {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  .buttons {
    display: flex;
    gap: 0.5rem;
    margin-top: 0.5rem;
  }
  .secondary {
    background: #c90606;
  }

  .form-select {
    background-color: rgba(15, 23, 42, 0.9); /* sama kuin inputit */
    color: #f9fafb;            /* vaalea teksti */
    border: 1px solid rgba(55, 65, 81, 0.9);
    border-radius: 999px;
    padding: 0.45rem 0.65rem;
    font-size: 0.85rem;
    appearance: none; /* poistaa selaimen oletusnuolen */
    -webkit-appearance: none;
    -moz-appearance: none;
  }

  .form-select:focus {
    outline: none;
    border-color: rgba(59, 130, 246, 0.85);
    box-shadow: 0 0 0 1px rgba(59, 130, 246, 0.5);
    background: radial-gradient(circle at top, rgba(30, 64, 175, 0.3) 0, #020617 60%);
  }

  .form-select.placeholder {
    color: rgba(148, 163, 184, 0.7); /* sama kuin input placeholder */
  }

  /* Option-elementtien tyylit - poistaa vaalean taustan */
  .form-select option {
    background-color: rgba(15, 23, 42, 0.95);
    color: #f9fafb;
    padding: 0.5rem;
  }

  /* Valitun optionin tyyli */
  .form-select option:checked {
    background-color: rgba(59, 130, 246, 0.3);
    color: #f9fafb;
  }
</style>
