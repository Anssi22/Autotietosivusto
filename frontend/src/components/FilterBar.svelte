<script>
  export let filters;
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  function update(key, value) {
    const newFilters = { ...filters, [key]: value };
    dispatch('changeFilters', newFilters);
  }
</script>

<div class="filter-bar">
  <input
    class="filter-input"
    placeholder="Haku (nimi, valmistaja...)"
    value={filters.search}
    on:input={(e) => update('search', e.target.value)} />

  <input
    class="filter-input"
    placeholder="Valmistaja"
    value={filters.manufacturer}
    on:input={(e) => update('manufacturer', e.target.value)} />

  <input
    class="filter-input"
    placeholder="Vuosi"
    type="number"
    value={filters.year}
    on:input={(e) => update('year', e.target.value)} />

  <select
    class="filter-select"
    class:placeholder={filters.fuelType === ''}
    bind:value={filters.fuelType}
    on:change={(e) => update('fuelType', e.target.value)}>
    <option value="">Polttoainetyyppi</option>
    <option value="Bensiini">Bensiini</option>
    <option value="Diesel">Diesel</option>
    <option value="Sähkö">Sähkö</option>
    <option value="Hybridi">Hybridi</option>
  </select>
</div>

<style>
  .filter-input,
  .filter-select {
    background-color: #1f2937; /* tumma tausta */
    color: #f9fafb;            /* vaalea teksti */
    border: 1px solid #374151;
    border-radius: 8px;
    padding: 0.5rem 0.6rem;
  }

  .filter-input::placeholder {
    color: #9ca3af;
  }

  .filter-input:focus,
  .filter-select:focus {
    outline: 2px solid #60a5fa;
    outline-offset: 2px;
  }

  .filter-select.placeholder {
    color: #9ca3af; /* sama kuin input placeholder */
  }
  .filter-select {
    color: #f9fafb; /* normaali valittu arvo */
  }

</style>
