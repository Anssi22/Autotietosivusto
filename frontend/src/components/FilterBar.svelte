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
    placeholder="Haku (nimi, valmistaja...)"
    value={filters.search}
    on:input={(e) => update('search', e.target.value)} />

  <input
    placeholder="Valmistaja"
    value={filters.manufacturer}
    on:input={(e) => update('manufacturer', e.target.value)} />

  <input
    placeholder="Vuosi"
    type="number"
    value={filters.year}
    on:input={(e) => update('year', e.target.value)} />

  <select
    bind:value={filters.fuelType}
    on:change={(e) => update('fuelType', e.target.value)}>
    <option value="">Polttoainetyyppi</option>
    <option value="Bensiini">Bensiini</option>
    <option value="Diesel">Diesel</option>
    <option value="Sähkö">Sähkö</option>
    <option value="Hybridi">Hybridi</option>
  </select>
</div>