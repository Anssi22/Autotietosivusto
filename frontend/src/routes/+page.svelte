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
  
  // Viite dialog-elementteihin, Tällä saadaan kutsuttua detailDialog.showModal() ja detailDialog.close().
  let autoLisatietoDialog;
  let lisaaTaiMuokkaaAutoDialog;

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
  
  let editingCar = null;
  
  function avaaAutoLisatietoDialog(car) {
    selectedCar = car;
    autoLisatietoDialog?.showModal();
  }
  
  function suljeAutoLisatietoDialog() {
    autoLisatietoDialog?.close();
    selectedCar = null;
  }
  
  function openCreateForm() {
    editingCar = null;
    lisaaTaiMuokkaaAutoDialog?.showModal();
  }

  function startEdit(car) {
    editingCar = car; // tämä saa muokkauslomakkeen esitäytettyä
    lisaaTaiMuokkaaAutoDialog?.showModal();
  }

  function suljeLisaaTaiMuokkaaAutoPopup() {
    lisaaTaiMuokkaaAutoDialog?.close()
    editingCar = null;
  }

  function onAddEditDialogClosed() {
    editingCar = null;
  }

  async function handleAddCar(payload) {
    await fetch(`${API_URL}/cars`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    editingCar = null;
    await loadCars();
  }

  async function handleUpdateCar(payload) {
    await fetch(`${API_URL}/cars/${payload.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    editingCar = null;
    await loadCars();
  }

  async function handleDeleteCar(id) {
    // Poista auto backendistä
    await fetch(`${API_URL}/cars/${id}`, { method: 'DELETE' });

    // Jos poistettiin juuri valittuna ollut auto, sulje detail
    if (selectedCar && selectedCar._id === id) suljeAutoLisatietoDialog();

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

  <button type="button" class="btn-add-car" on:click={openCreateForm}>Lisää auto</button>
    <div class="main-layout">
      <section>
        <h2>Autot</h2>

        <!-- Vanhempi kuuntelee eventin ja saa datan e.detailistä
        +page.svelte kuuntelee CarListin eventtejä:
           - saa propsina cars
           - lähettää select-eventin kun auto valitaan
           - lähettää edit-eventin kun muokataan
           - lähettää delete-eventin kun poisto painetaan 
           Svelte tekee tässä automaattisesti niin, että se payload jonka dispatchasit (car) löytyy parentissa e.detail-kentästä.-->
      <CarList
        {cars}
        on:select={(e) => avaaAutoLisatietoDialog(e.detail)}
        on:edit={(e) => startEdit(e.detail)}
        on:delete={(e) => handleDeleteCar(e.detail)}
      />
    </section>

    <!-- Popup -->
    <dialog bind:this={lisaaTaiMuokkaaAutoDialog} on:close={onAddEditDialogClosed}>
      <header class="dialog-header">
        <h2>{editingCar ? 'Muokkaa autoa' : 'Lisää auto'}</h2>
        <button type="button" on:click={suljeLisaaTaiMuokkaaAutoPopup}>Sulje</button>
      </header>

      <CarForm
        mode={editingCar ? 'edit' : 'create'}
        initialData={editingCar}
        on:addCar={(e) => { handleAddCar(e.detail); suljeLisaaTaiMuokkaaAutoPopup(); }}
        on:updateCar={(e) => { handleUpdateCar(e.detail); suljeLisaaTaiMuokkaaAutoPopup(); }}
        on:cancelEdit={suljeLisaaTaiMuokkaaAutoPopup}
      />
    </dialog>

  </div>

  <!-- Popup -->
  <dialog
    bind:this={autoLisatietoDialog}
    aria-labelledby="car-dialog-title"
    on:close={suljeAutoLisatietoDialog}
  >
    <header class="dialog-header">
      <h2 id="car-dialog-title">Auton tiedot</h2>
      <button type="button" on:click={suljeAutoLisatietoDialog}>Sulje</button>
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

