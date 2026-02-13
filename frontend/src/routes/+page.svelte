<script>
  // onMount = suorita koodi kun komponentti on renderöity selaimen DOMiin.
  // Hyvä paikka tehdä ensimmäinen datan haku clientissä.
  import { onMount } from 'svelte';

  // UI-komponentit
  import CarList from "../components/CarList.svelte";
  import CarForm from '../components/CarForm.svelte';
  import FilterBar from '../components/FilterBar.svelte';
  import CarDetail from '../components/CarDetail.svelte';

  // Sovelluksen tila (state)
  let cars = [];                 // Lista autoista (backendistä haettu)
  let selectedCar = null;        // Tällä hetkellä valittu auto detail-näkymään

  // Suodattimet, jotka lähetetään backendille query-parametreina
  let filters = { manufacturer: '', year: '', fuelType: '', search: '' };

  // Vite-proxy: selain kutsuu samaa originia (5173) -> /api/...,
  // ja Vite välittää pyynnön backendille (3000) konfigun mukaan.
  const API_URL = "/api";

   // Viite dialog-elementtiin, Tällä saadaan kutsuttua detailDialog.showModal() ja detailDialog.close().
  let detailDialog;

  async function loadCars() {
    // URLSearchParams rakentaa query stringin oikein (enkoodaa välilyönnit ym.).
    // Lopputulos on tyyliin: manufacturer=Toyota&fuelType=hybrid&search=corolla
    const params = new URLSearchParams();

    // Lisätään vain ne filtterit, joilla on arvo
    // (ettei URL:iin tule turhia manufacturer= jne).
    if (filters.manufacturer) params.append('manufacturer', filters.manufacturer);
    if (filters.year) params.append('year', filters.year);
    if (filters.fuelType) params.append('fuelType', filters.fuelType);
    if (filters.search) params.append('search', filters.search);

    // params.toString() palauttaa query string -osion ILMAN '?' merkkiä.
    // Siksi URL rakennetaan näin: /cars? + querystring
    const res = await fetch(`${API_URL}/cars?${params.toString()}`);

    // Parsitaan JSON ja tallennetaan lista tilaan
    cars = await res.json();

    // Jos joku auto oli valittuna, “synkataan” selectedCar uuteen listaan.
    // Tämä on hyödyllinen esim. poiston tai päivityksen jälkeen.
    if (selectedCar) {
      selectedCar = cars.find(c => c._id === selectedCar._id) || null;
    }
  }

  function openCarDetail(car) {
    selectedCar = car;
    // Avaa modal popup
    detailDialog?.showModal();
  }

  function closeCarDetail() {
    detailDialog?.close();
    selectedCar = null;
  }
  
  async function handleAddCar(carData) {
    // Lähetä uusi auto backendille JSONina
    await fetch(`${API_URL}/cars`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(carData)
    });

    // Hae lista uusiksi, jotta lisätty auto näkyy
    await loadCars();
  }

  async function handleDeleteCar(id) {
    // Poista auto backendistä
    await fetch(`${API_URL}/cars/${id}`, { method: 'DELETE' });

    // Jos poistettiin juuri valittuna ollut auto, sulje detail
   if (selectedCar && selectedCar._id === id) closeCarDetail();

    // Päivitä lista
    await loadCars();
  }

  async function handleAddComment(carId, comment) {
    // Lisää kommentti valitulle autolle
    await fetch(`${API_URL}/cars/${carId}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(comment)
    });

    // Päivitä lista/detail (jos palautat kommentit auton mukana)
    await loadCars();
  }

  function handleFilterChange(newFilters) {
    // FilterBar lähettää uudet filtterit eventin detailissä
    filters = newFilters;

    // Hae lista uusilla suodattimilla
    loadCars();
  }

  // Ensimmäinen haku kun sivu mountataan
  onMount(loadCars);
</script>

<main>
  <!-- Sivun otsikko -->
  <h1>Autotietosivusto</h1>

  <!-- Suodatinpalkki: lähettää changeFilters-eventin, jossa uudet filtterit e.detailissä -->
  <FilterBar {filters} on:changeFilters={(e) => handleFilterChange(e.detail)} />
    
<!--   {#if selectedCar}
    <section aria-labelledby="selected-car-title">
      <h2 id="selected-car-title">Valittu auto</h2>
      <CarDetail
        {selectedCar}
        on:addComment={(e) => handleAddComment(selectedCar._id, e.detail)}
      />
    </section>
  {/if} -->

    <div class="layout">
      <section>
        <h2>Autot</h2>

      <!-- CarList:
           - saa propsina cars
           - lähettää select-eventin kun auto valitaan
           - lähettää delete-eventin kun poisto painetaan -->
      <CarList
        {cars}
        on:select={(e) => openCarDetail(e.detail)}
        on:delete={(e) => handleDeleteCar(e.detail)}
      />
    </section>

    <section>
      <h2>Lisää auto</h2>

      <!-- CarForm lähettää addCar-eventin ja e.detail sisältää formidatan -->
      <CarForm on:addCar={(e) => handleAddCar(e.detail)} />
    </section>
  </div>

  <!-- Popup -->
  <dialog
    bind:this={detailDialog}
    aria-labelledby="car-dialog-title"
    on:close={closeCarDetail}
  >
    <header class="dialog-header">
      <h2 id="car-dialog-title">Auton tiedot</h2>
      <button type="button" on:click={closeCarDetail}>Sulje</button>
    </header>

    {#if selectedCar}
      <CarDetail
        {selectedCar}
        on:addComment={(e) => handleAddComment(selectedCar._id, e.detail)}
      />
    {:else}
      <p>Ei valittua autoa.</p>
    {/if}
  </dialog>

</main>

<style>
  main {
    max-width: 1100px;
    margin: 0 auto;
    padding: 1.5rem;
    font-family: system-ui, sans-serif;
  }

  /* Kaksipalstainen layout: vasen lista, oikea lomake */
  .layout {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 1.5rem;
  }

  h1 {
    margin-bottom: 1rem;
  }
</style>
