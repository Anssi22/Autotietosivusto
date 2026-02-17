# Autotietosivusto - SvelteKit, Node.js & MongoDB

Autotietosivusto on moderni web-sovellus, jossa käyttäjät voivat selata, lisätä, muokata ja poistaa autojen tietoja sekä jättää kommentteja ja arvosteluja autoille. Frontend on toteutettu SvelteKitillä, backend Node.js/Expressillä ja tietokantana MongoDB.

---

## 📋 Sisällysluettelo

- [Ominaisuudet](#-ominaisuudet)
- [Teknologiat](#-teknologiat)
- [Projektin rakenne](#-projektin-rakenne)
- [Asennus](#-asennus)
  - [Esivaatimukset](#esivaatimukset)
  - [Vaiheittainen asennus](#vaiheittainen-asennus)
- [Käyttöohjeet](#-käyttöohjeet)
- [API-dokumentaatio](#-api-dokumentaatio)
- [Projektin rakenne](#-projektin-rakenne-1)
- [Ympäristömuuttujat](#-ympäristömuuttujat)
- [Tietokantarakenne](#-tietokantarakenne)
- [Troubleshooting](#-troubleshooting)
- [Jatkokehitysideoita](#-jatkokehitysideoita)
- [Lisenssi](#-lisenssi)

---

## ✨ Ominaisuudet

### Autojen hallinta
- ✅ Autojen listaaminen grid-näkymässä
- ✅ Auton lisääminen lomakkeella
- ✅ Auton tietojen muokkaus
- ✅ Auton poisto vahvistuksella
- ✅ Auton yksityiskohtainen näkymä popup-dialogissa

### Suodatus ja haku
- 🔍 Suodatus valmistajan mukaan
- 🔍 Suodatus vuosimallin mukaan
- 🔍 Suodatus polttoainetyypin mukaan (Bensiini, Diesel, Sähkö, Hybridi)
- 🔍 Tekstihaku auton nimeen, valmistajaan tai kuvaukseen

### Kommentit ja arvostelut
- 💬 Kommenttien lisääminen autoille
- ⭐ Arvostelujen antaminen (1-5 tähteä)
- 📝 Kommenttien listaaminen autokohtaisesti
- 👤 Kommenttien kirjoittajan nimi

### Käyttöliittymä
- 🎨 Moderni dark mode -teema
- 📱 Responsiivinen design
- 🖼️ Autojen kuvien näyttäminen
- 🎯 Intuitiivinen käyttöliittymä

---

## 🛠️ Teknologiat

### Frontend
- **SvelteKit** (v2.50+) - Moderni web-framework
- **Svelte** (v5.49+) - Reaktiivinen UI-kirjasto
- **Vite** (v7.3+) - Nopea build-työkalu ja dev-server
- **CSS3** - Modernit tyylit dark mode -teemalla

### Backend
- **Node.js** - JavaScript-runtime
- **Express** - Web-framework
- **Mongoose** (v9.2+) - MongoDB ODM (Object Document Mapper)
- **CORS** - Cross-Origin Resource Sharing
- **dotenv** - Ympäristömuuttujien hallinta

### Tietokanta
- **MongoDB** - NoSQL-tietokanta
- **MongoDB Atlas** (suositeltu) - Pilvipohjainen MongoDB-palvelu

### Kehitystyökalut
- **Nodemon** - Automaattinen serverin uudelleenkäynnistys
- **Concurrently** - Backendin ja frontendin samanaikainen käynnistys

---

## 📁 Projektin rakenne

```
Autotietosivusto/
├── backend/
│   ├── models/
│   │   └── Car.js          # Mongoose-malli autolle ja kommenteille
│   ├── server.js            # Express-palvelin ja API-reitit
│   ├── mock-data-seed.js    # Testidatan lisääminen tietokantaan
│   ├── package.json         # Backend-riippuvuudet
│   └── .env                 # Ympäristömuuttujat (ei versionhallinnassa)
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── CarList.svelte      # Autojen listaus
│   │   │   ├── CarForm.svelte      # Lomake lisäykseen/muokkaukseen
│   │   │   ├── CarDetail.svelte    # Auton yksityiskohdat
│   │   │   ├── FilterBar.svelte    # Suodatinpalkki
│   │   │   ├── CommentList.svelte   # Kommenttilista
│   │   │   └── CommentForm.svelte  # Kommenttilomake
│   │   ├── routes/
│   │   │   ├── +layout.svelte       # Päälayout
│   │   │   └── +page.svelte        # Päänäkymä
│   │   └── app.css                  # Globaalit tyylit
│   ├── package.json                 # Frontend-riippuvuudet
│   └── vite.config.js               # Vite-konfiguraatio
│
├── package.json             # Juuritaso: concurrently-skripti
└── README.md                # Tämä tiedosto
```

---

## 💾 Asennus

### Esivaatimukset

Ennen kuin aloitat, varmista että seuraavat työkalut on asennettuna:

- **Node.js** (v18+ suositeltu) ja **npm** (Node Package Manager)
- **MongoDB** (esim. MongoDB Atlas - pilvipalvelu)
- **Git** (lähdekoodin lataamista varten)

---

### Mitä Node.js ja npm ovat?

- **Node.js** on ohjelmisto, jolla JavaScript-koodia voidaan ajaa tietokoneella (backend-palvelin).
- **npm** (Node Package Manager) on työkalu, jolla ladataan projektin tarvitsemat lisäkirjastot (riippuvuudet).

### Tarkista, ovatko ne asennettu?

Avaa komentorivi (Windows: **Command Prompt** tai **PowerShell**, Mac/Linux: **Terminal**) ja kirjoita:

```bash
node --version
npm --version
```

Jos molemmat palauttavat versionumeron (esim. `v20.10.0` ja `10.2.3`), voit jatkaa.

### Jos niitä ei ole, ne täytyy asentaa:

1. Mene osoitteeseen https://nodejs.org
2. Lataa **LTS (Long Term Support)** -versio (suositeltu)
3. Asenna oletusasetuksilla
4. Sulje ja avaa komentokehote uudelleen
5. Varmista asennus komennoilla `node --version` ja `npm --version`

---

### MongoDB – mikä se on ja miksi sitä tarvitaan?

**MongoDB** on NoSQL-tietokanta, jota käytetään tiedon pysyvään tallentamiseen. Tässä sovelluksessa MongoDB:hen tallennetaan:

- Autojen tiedot (nimi, valmistaja, vuosimalli, polttoainetyyppi, hevosvoimat, kuvaus, kuva)
- Autokohtaiset kommentit ja arvostelut
- Kommenttien kirjoittajat ja ajat

Ilman MongoDB:tä sovellus kyllä käynnistyisi, mutta autojen tietoja ei voitaisi tallentaa pysyvästi.

---

### MongoDB Atlas (suositeltu aloittelijalle)

**MongoDB Atlas** on pilvipalvelu, jossa:

- Tietokantaa ei tarvitse asentaa omalle koneelle
- Saat ilmaisen testikäyttöön sopivan tietokannan (M0-tier)
- Yhteys toimii internetin yli
- Automaattiset varmuuskopiot
- Helppo skaalautuvuus

### MongoDB-yhteys (URI)

MongoDB antaa käyttöön yhteysosoitteen, jota kutsutaan nimellä **MongoDB URI** (tai Connection String).

URI näyttää esimerkiksi tältä:
```
mongodb+srv://kayttajanimi:salasana@cluster0.xxxxx.mongodb.net/autotietosivusto
```

**⚠️ TÄRKEÄÄ:** Tämä URI on henkilökohtainen ja sisältää salasanan. **Älä koskaan jaa sitä julkisesti!**

URI tallennetaan ympäristömuuttujana `.env`-tiedostoon, joka ei kuulu versionhallintaan.

---

### Git – lähdekoodin lataamista varten

Avaa komentokehote ja kirjoita:

```bash
git --version
```

Jos saat vastaukseksi versionumeron (esim. `git version 2.44.0`), Git on asennettu.

**Jos Git ei ole asennettu:**
- Windows: Lataa osoitteesta https://git-scm.com
- Mac: `brew install git` (jos Homebrew on asennettuna)
- Linux: `sudo apt-get install git` (Debian/Ubuntu) tai `sudo yum install git` (RedHat/CentOS)

---

## 📦 Vaiheittainen asennus

### 1. Kloonaa repositorio (lataa projektin koodi koneellesi)

Ennen kuin sovellusta voi käyttää, projektin lähdekoodi täytyy kopioida omalle tietokoneelle Gitin avulla.

1. Avaa komentorivi (esim. Command Prompt tai PowerShell Windowsissa, Terminal Mac/Linuxissa).

2. Siirry kansioon, johon haluat projektin:

```bash
cd C:\Users\Käyttäjänimi\Desktop
# tai Mac/Linux:
cd ~/Desktop
```

3. Kloonaa (lataa) GitHub-repositorio:

```bash
git clone https://github.com/Anssi22/Autotietosivusto.git
```

4. Siirry projektikansioon:

```bash
cd Autotietosivusto
```

---

### 2. Riippuvuuksien asennus

#### Mitä ovat riippuvuudet?

Riippuvuudet ovat valmiita ohjelmakirjastoja, joita sovellus käyttää. Ilman niitä:

- Backend ei käynnisty
- Frontend ei avaudu selaimessa
- Sovellus ei toimi oikein

Ne määritellään tiedostossa `package.json`, ja ne asennetaan automaattisesti npm:n avulla komennolla `npm install`.

---

#### Backend-riippuvuudet

1. Siirry backend-kansioon:

```bash
cd backend
```

2. Asenna riippuvuudet:

```bash
npm install
```

Komentorivi lataa nyt kaikki backendin tarvitsemat kirjastot:
- `express` - Web-framework
- `mongoose` - MongoDB ODM
- `cors` - Cross-Origin Resource Sharing
- `dotenv` - Ympäristömuuttujien hallinta
- `nodemon` (dev) - Automaattinen uudelleenkäynnistys

Odota kunnes asennus valmistuu. Näet viestin kuten "added 50 packages".

---

#### Frontend-riippuvuudet

1. Siirry frontend-kansioon (jos olet backend-kansiossa, palaa juureen):

```bash
cd ../frontend
```

2. Asenna riippuvuudet:

```bash
npm install
```

Komentorivi lataa nyt kaikki frontendin tarvitsemat kirjastot:
- `@sveltejs/kit` - SvelteKit framework
- `svelte` - Svelte-kirjasto
- `vite` - Build-työkalu ja dev-server
- `@sveltejs/vite-plugin-svelte` - Vite-plugin Svelteille

Odota kunnes asennus valmistuu.

---

### 3. Ympäristömuuttujat – henkilökohtaiset asetukset

#### Mitä ovat ympäristömuuttujat?

Ympäristömuuttujat ovat asetuksia, jotka:

- Sisältävät käyttäjäkohtaisia tietoja (esim. tietokantayhteydet)
- Eivät kuulu suoraan lähdekoodiin
- Eivät saa päätyä GitHubiin tietoturvasyistä
- Tallennetaan `.env`-tiedostoon, joka on `.gitignore`-listalla

---

#### .env-tiedoston luominen

1. Mene backend-kansioon:

```bash
cd backend
```

2. Luo uusi tiedosto nimeltä `.env` (huom: piste alussa!)

**Windows (PowerShell):**
```bash
New-Item -Path .env -ItemType File
```

**Windows (CMD):**
```bash
type nul > .env
```

**Mac/Linux:**
```bash
touch .env
```

Tai luo tiedosto tekstieditorilla (esim. Visual Studio Code, Notepad++).

3. Avaa `.env`-tiedosto tekstieditorilla ja lisää seuraavat rivit:

```env
MONGODB_URI=mongodb+srv://kayttajanimi:salasana@cluster0.xxxxx.mongodb.net/autotietosivusto
PORT=3000
```

**⚠️ TÄRKEÄÄ:** Korvaa `mongodb+srv://kayttajanimi:salasana@cluster0.xxxxx.mongodb.net/autotietosivusto` omalla MongoDB URI:llasi!

---

#### Mistä löydän MongoDB URI -osoitteen (Atlas-esimerkki)

1. Mene osoitteeseen https://www.mongodb.com/cloud/atlas ja kirjaudu sisään / luo ilmainen tili.

2. Luo **Free Cluster** (esim. `M0`-tasoinen, riittää hyvin testikäyttöön):
   - Valitse cloud provider (AWS, Google Cloud, Azure)
   - Valitse alue (esim. Europe - Frankfurt)
   - Valitse cluster tier: **M0 Sandbox** (ilmainen)
   - Anna clusterille nimi (esim. `Cluster0`)

3. Kun klusteri on luotu (kestää 1-3 minuuttia):
   - Valitse ylävalikosta **Database**
   - Klikkaa omaa klusteria (esim. `Cluster0`)
   - Klikkaa painiketta **Connect**

4. Määritä käyttäjätunnus ja salasana:
   - Valitse **Create a database user**
   - Anna käyttäjätunnus (esim. `admin`)
   - Anna vahva salasana (tallenna se turvalliseen paikkaan!)
   - Klikkaa **Create Database User**

5. Valitse yhteysmenetelmä:
   - Valitse **Connect your application**
   - Valitse driver: **Node.js** ja versio: **5.5 or later**

6. Atlas näyttää sinulle yhteysosoitteen (Connection string), joka näyttää esim. tältä:

```
mongodb+srv://admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

7. Kopioi yhteysosoite ja korvaa `<password>` omalla salasanallasi.

8. Lisää tietokannan nimi yhteysosoitteen loppuun:

```
mongodb+srv://admin:salasanasi@cluster0.xxxxx.mongodb.net/autotietosivusto?retryWrites=true&w=majority
```

9. Kopioi tämä URI `.env`-tiedostoon `MONGODB_URI`-muuttujan arvoksi.

10. **Varmista että IP-osoitteesi on sallittu:**
    - Atlas-valikossa: **Network Access** → **Add IP Address**
    - Valitse **Allow Access from Anywhere** (tai lisää oma IP-osoitteesi)
    - Klikkaa **Confirm**

---

### 4. Tietokannan alustaminen (valinnainen)

Jos haluat lisätä testidataa tietokantaan, voit käyttää seed-skriptiä:

```bash
cd backend
npm run seed
```

Tämä lisää esimerkkiautoja tietokantaan testausta varten.

---

### 5. Backendin käynnistäminen

Siirry backend-kansioon ja käynnistä palvelin:

```bash
cd backend
npm run dev
```

Jos kaikki toimii oikein, näet konsolissa viestit:
```
MongoDB connected
Server running on port 3000
```

**⚠️ TÄRKEÄÄ:** Jätä tämä komentokehoteikkuna auki! Backend-palvelin pitää olla käynnissä, jotta frontend voi kommunikoida sen kanssa.

---

### 6. Frontendin käynnistäminen

Avaa **uusi komentorivi-ikkuna** (backendin pitää jäädä käyntiin) ja suorita:

```bash
cd frontend
npm run dev
```

Jos kaikki toimii oikein, näet konsolissa viestin:
```
VITE v7.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
```

**⚠️ TÄRKEÄÄ:** Jätä myös tämä komentokehoteikkuna auki!

---

### 7. Molempien käynnistäminen yhdellä komennolla (vaihtoehto)

Jos haluat käynnistää backendin ja frontendin samanaikaisesti yhdellä komennolla:

1. Siirry projektin juurikansioon:

```bash
cd ..
```

2. Asenna juuritaso-riippuvuus (jos ei ole asennettuna):

```bash
npm install
```

3. Käynnistä molemmat:

```bash
npm run dev
```

Tämä käynnistää backendin portissa 3000 ja frontendin portissa 5173.

---

### 8. Sovelluksen avaaminen

Avaa selaimella osoite:

```
http://localhost:5173
```

Sovelluksen pitäisi nyt avautua selaimessa! 🎉

---

## 🎮 Käyttöohjeet

### Autojen listaaminen

- Autot näkyvät automaattisesti etusivulla grid-näkymässä
- Jokainen auto näyttää kuvan (jos saatavilla), nimen, valmistajan, vuosimallin ja kuvauksen

### Auton lisääminen

1. Klikkaa **"Lisää auto"** -nappia sivun yläosassa
2. Täytä lomake:
   - **Nimi** (pakollinen) - esim. "Golf"
   - **Valmistaja** (pakollinen) - esim. "Volkswagen"
   - **Vuosimalli** (pakollinen) - esim. 2020
   - **Polttoainetyyppi** (valinnainen) - Bensiini, Diesel, Sähkö, Hybridi
   - **Hevosvoimat** (valinnainen) - esim. 150
   - **Kuvaus** (valinnainen) - autosta
   - **Kuvan URL** (valinnainen) - auton kuvan URL-osoite
3. Klikkaa **"Tallenna"** tai **"Lisää auto"**
4. Auto lisätään listaan ja dialogi sulkeutuu

### Auton muokkaus

1. Etsi auto listasta
2. Klikkaa auton kortin **"Muokkaa"** -nappia (vihreä nappi)
3. Muokkaa haluamiasi kenttiä lomakkeessa
4. Klikkaa **"Tallenna"**
5. Muutokset tallennetaan ja dialogi sulkeutuu

### Auton poisto

1. Etsi auto listasta
2. Klikkaa auton kortin **"Poista"** -nappia (punainen nappi)
3. Vahvista poisto vahvistusikkunassa
4. Auto poistetaan tietokannasta ja listasta

### Auton tietojen tarkastelu

1. Klikkaa auton kortin **"Näytä tiedot"** -nappia
2. Avautuu popup-dialogi, jossa näkyvät:
   - Auton kaikki tiedot
   - Auton kuva (jos saatavilla)
   - Kommentit ja arvostelut
   - Kommentin lisäyslomake

### Suodatus ja haku

1. Käytä suodatinpalkkia sivun yläosassa
2. **Valmistaja**: Valitse valmistaja pudotusvalikosta
3. **Vuosimalli**: Syötä vuosimalli (esim. 2020)
4. **Polttoainetyyppi**: Valitse polttoainetyyppi pudotusvalikosta
5. **Haku**: Syötä hakusana (hakee nimestä, valmistajasta tai kuvauksesta)
6. Autot suodatetaan reaaliajassa

### Kommentin lisääminen

1. Avaa auton tiedot (klikkaa "Näytä tiedot")
2. Täytä kommenttilomake:
   - **Nimi** - kommentoijan nimi
   - **Kommentti** - kommentin teksti
   - **Arvostelu** - valitse tähtien määrä (1-5)
3. Klikkaa **"Lisää kommentti"**
4. Kommentti lisätään autolle ja näkyy listassa

---

## 📡 API-dokumentaatio

Backend tarjoaa REST API:n, jota frontend käyttää. API:n perusosoite on:

```
http://localhost:3000
```

### Autojen hallinta

#### GET /cars
Hakee kaikki autot. Tukee suodatusta query-parametreilla.

**Query-parametrit:**
- `manufacturer` (string) - Suodata valmistajan mukaan
- `year` (number) - Suodata vuosimallin mukaan
- `fuelType` (string) - Suodata polttoainetyypin mukaan
- `search` (string) - Tekstihaku (nimi, valmistaja, kuvaus)

**Esimerkkejä:**
```bash
# Kaikki autot
GET http://localhost:3000/cars

# Toyota-autot
GET http://localhost:3000/cars?manufacturer=Toyota

# Vuosimalli 2020
GET http://localhost:3000/cars?year=2020

# Hybridi-autot
GET http://localhost:3000/cars?fuelType=Hybridi

# Tekstihaku "Golf"
GET http://localhost:3000/cars?search=Golf

# Yhdistetty suodatus
GET http://localhost:3000/cars?manufacturer=Volkswagen&year=2020&fuelType=Bensiini
```

**Vastaus:**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Golf",
    "manufacturer": "Volkswagen",
    "year": 2020,
    "fuelType": "Bensiini",
    "horsepower": 150,
    "description": "Luotettava perheauto",
    "imageUrl": "https://example.com/golf.jpg",
    "comments": [],
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
]
```

---

#### GET /cars/:id
Hakee yhden auton tiedot ID:n perusteella.

**Parametrit:**
- `id` (string) - Auton MongoDB ID

**Esimerkki:**
```bash
GET http://localhost:3000/cars/507f1f77bcf86cd799439011
```

**Vastaus:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "Golf",
  "manufacturer": "Volkswagen",
  "year": 2020,
  "fuelType": "Bensiini",
  "horsepower": 150,
  "description": "Luotettava perheauto",
  "imageUrl": "https://example.com/golf.jpg",
  "comments": [],
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

**Virheet:**
- `404` - Autoa ei löydy
- `400` - Virheellinen ID

---

#### POST /cars
Lisää uuden auton tietokantaan.

**Pyyntö:**
```json
{
  "name": "Golf",
  "manufacturer": "Volkswagen",
  "year": 2020,
  "fuelType": "Bensiini",
  "horsepower": 150,
  "description": "Luotettava perheauto",
  "imageUrl": "https://example.com/golf.jpg"
}
```

**Pakolliset kentät:**
- `name` (string)
- `manufacturer` (string)
- `year` (number)

**Valinnaiset kentät:**
- `fuelType` (string)
- `horsepower` (number)
- `description` (string)
- `imageUrl` (string)

**Esimerkki:**
```bash
POST http://localhost:3000/cars
Content-Type: application/json

{
  "name": "Golf",
  "manufacturer": "Volkswagen",
  "year": 2020,
  "fuelType": "Bensiini",
  "horsepower": 150,
  "description": "Luotettava perheauto",
  "imageUrl": "https://example.com/golf.jpg"
}
```

**Vastaus:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "Golf",
  "manufacturer": "Volkswagen",
  "year": 2020,
  "fuelType": "Bensiini",
  "horsepower": 150,
  "description": "Luotettava perheauto",
  "imageUrl": "https://example.com/golf.jpg",
  "comments": [],
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

**Virheet:**
- `400` - Virheellinen data (esim. puuttuva pakollinen kenttä)

---

#### PUT /cars/:id
Päivittää auton tiedot.

**Parametrit:**
- `id` (string) - Auton MongoDB ID

**Pyyntö:**
```json
{
  "name": "Golf GTI",
  "horsepower": 245
}
```

Voit päivittää vain osan kentistä - muut kentät säilyvät ennallaan.

**Esimerkki:**
```bash
PUT http://localhost:3000/cars/507f1f77bcf86cd799439011
Content-Type: application/json

{
  "name": "Golf GTI",
  "horsepower": 245
}
```

**Vastaus:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "Golf GTI",
  "manufacturer": "Volkswagen",
  "year": 2020,
  "fuelType": "Bensiini",
  "horsepower": 245,
  "description": "Luotettava perheauto",
  "imageUrl": "https://example.com/golf.jpg",
  "comments": [],
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-16T14:20:00.000Z"
}
```

**Virheet:**
- `404` - Autoa ei löydy
- `400` - Virheellinen data

---

#### DELETE /cars/:id
Poistaa auton tietokannasta.

**Parametrit:**
- `id` (string) - Auton MongoDB ID

**Esimerkki:**
```bash
DELETE http://localhost:3000/cars/507f1f77bcf86cd799439011
```

**Vastaus:**
```json
{
  "message": "Deleted"
}
```

**Virheet:**
- `404` - Autoa ei löydy
- `400` - Virheellinen ID

---

### Kommentit

#### POST /cars/:id/comments
Lisää kommentin ja arvostelun autolle.

**Parametrit:**
- `id` (string) - Auton MongoDB ID

**Pyyntö:**
```json
{
  "user": "Matti Meikäläinen",
  "text": "Erinomainen auto! Suosittelen.",
  "rating": 5
}
```

**Pakolliset kentät:**
- `user` (string) - Kommentoijan nimi
- `text` (string) - Kommentin teksti
- `rating` (number) - Arvostelu 1-5 tähteä

**Esimerkki:**
```bash
POST http://localhost:3000/cars/507f1f77bcf86cd799439011/comments
Content-Type: application/json

{
  "user": "Matti Meikäläinen",
  "text": "Erinomainen auto! Suosittelen.",
  "rating": 5
}
```

**Vastaus:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "Golf",
  "manufacturer": "Volkswagen",
  "year": 2020,
  "comments": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "user": "Matti Meikäläinen",
      "text": "Erinomainen auto! Suosittelen.",
      "rating": 5,
      "createdAt": "2024-01-16T15:30:00.000Z",
      "updatedAt": "2024-01-16T15:30:00.000Z"
    }
  ],
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-16T15:30:00.000Z"
}
```

**Virheet:**
- `404` - Autoa ei löydy
- `400` - Virheellinen data (esim. rating < 1 tai > 5)

---

## 🗄️ Tietokantarakenne

### Car (Auto)

```javascript
{
  _id: ObjectId,              // MongoDB:n luoma yksilöllinen ID
  name: String,               // Auton nimi (pakollinen)
  manufacturer: String,       // Valmistaja (pakollinen)
  year: Number,               // Vuosimalli (pakollinen)
  fuelType: String,          // Polttoainetyyppi (valinnainen)
  horsepower: Number,         // Hevosvoimat (valinnainen)
  description: String,        // Kuvaus (valinnainen)
  imageUrl: String,           // Kuvan URL (valinnainen)
  comments: [Comment],        // Kommenttien lista
  createdAt: Date,            // Luontiaika (automaattinen)
  updatedAt: Date             // Päivitysaika (automaattinen)
}
```

### Comment (Kommentti)

```javascript
{
  _id: ObjectId,              // MongoDB:n luoma yksilöllinen ID
  user: String,               // Kommentoijan nimi (pakollinen)
  text: String,               // Kommentin teksti (pakollinen)
  rating: Number,             // Arvostelu 1-5 (pakollinen, min: 1, max: 5)
  createdAt: Date,            // Luontiaika (automaattinen)
  updatedAt: Date             // Päivitysaika (automaattinen)
}
```

**Huom:** Kommentit tallennetaan osana autoa (embedded documents), eivät erillisinä dokumentteina.

---

## 🔧 Projektin rakenne (yksityiskohtainen)

### Backend (`backend/`)

#### `server.js`
Express-palvelimen pääsovellus:
- MongoDB-yhteyden muodostaminen
- CORS-määritykset
- API-reittien määrittely
- Palvelimen käynnistäminen

#### `models/Car.js`
Mongoose-malli autolle:
- Auton skeeman määrittely
- Kommenttien aliskeema
- Validointisäännöt
- Timestampit (createdAt, updatedAt)

#### `mock-data-seed.js`
Testidatan lisääminen:
- Luodaan esimerkkiautoja
- Lisätään kommentteja
- Käytetään komennolla `npm run seed`

---

### Frontend (`frontend/src/`)

#### `routes/+layout.svelte`
Päälayout-komponentti:
- Globaalit tyylit (`app.css`)
- App-shell ja app-container -layoutit
- Kaikille sivuille yhteinen rakenne

#### `routes/+page.svelte`
Päänäkymä:
- Autojen listaaminen
- Suodattimien hallinta
- Dialogien hallinta (lisäys, muokkaus, tiedot)
- API-kutsut backendille

#### `components/CarList.svelte`
Autojen listauskomponentti:
- Grid-näkymä autoille
- Auton valinta, muokkaus ja poisto
- Eventtien lähettäminen parent-komponentille

#### `components/CarForm.svelte`
Lomakekomponentti:
- Auton lisäys- ja muokkauslomake
- Validointi
- Eventtien lähettäminen parent-komponentille

#### `components/CarDetail.svelte`
Auton yksityiskohtien komponentti:
- Auton tietojen näyttäminen
- Kommenttilistan näyttäminen
- Kommenttilomakkeen integraatio

#### `components/FilterBar.svelte`
Suodatinpalkki:
- Valmistajan suodatus
- Vuosimallin suodatus
- Polttoainetyypin suodatus
- Tekstihaku
- Eventtien lähettäminen parent-komponentille

#### `components/CommentList.svelte`
Kommenttilista:
- Kommenttien näyttäminen
- Arvostelujen näyttäminen (tähdet)

#### `components/CommentForm.svelte`
Kommenttilomake:
- Kommentin lisääminen
- Arvostelun antaminen
- Eventtien lähettäminen parent-komponentille

#### `app.css`
Globaalit tyylit:
- CSS-muuttujat (värit, varjot, säteet)
- Dark mode -teema
- Komponenttien tyylit
- Responsiivinen design

---

## 🌍 Ympäristömuuttujat

### Backend `.env`-tiedosto

```env
MONGODB_URI=mongodb+srv://kayttajanimi:salasana@cluster0.xxxxx.mongodb.net/autotietosivusto
PORT=3000
```

#### MONGODB_URI
- **Kuvaus:** MongoDB-tietokantayhteyden URI
- **Pakollinen:** Kyllä
- **Muoto:** `mongodb+srv://käyttäjä:salasana@klusteri.mongodb.net/tietokanta`
- **Esimerkki:** `mongodb+srv://admin:salasana123@cluster0.abc123.mongodb.net/autotietosivusto`

#### PORT
- **Kuvaus:** Portti, jossa backend-palvelin kuuntelee
- **Pakollinen:** Ei (oletus: 3000)
- **Muoto:** Numero
- **Esimerkki:** `3000`

---

## 🐛 Troubleshooting

### Backend ei käynnisty

**Ongelma:** `Error connecting to MongoDB`

**Ratkaisut:**
1. Tarkista että `.env`-tiedosto on olemassa `backend/`-kansiossa
2. Tarkista että `MONGODB_URI` on oikein `.env`-tiedostossa
3. Varmista että MongoDB Atlas -klusteri on käynnissä
4. Tarkista että IP-osoitteesi on sallittu MongoDB Atlasissa (Network Access)
5. Tarkista että käyttäjätunnus ja salasana ovat oikein URI:ssa

---

### Frontend ei saa yhteyttä backendiin

**Ongelma:** `Failed to fetch` tai `Network error`

**Ratkaisut:**
1. Varmista että backend on käynnissä (`npm run dev` backend-kansiossa)
2. Tarkista että backend kuuntelee portissa 3000 (tai `.env`-tiedostossa määritelty portti)
3. Tarkista että frontendin Vite-konfiguraatio välittää `/api`-pyynnöt backendille
4. Tarkista selaimen konsoli virheilmoituksista

---

### Autot eivät näy

**Ongelma:** Lista on tyhjä vaikka tietokannassa on autoja

**Ratkaisut:**
1. Tarkista selaimen konsoli virheilmoituksista
2. Tarkista että backend-palvelin on käynnissä
3. Tarkista että MongoDB-yhteys toimii (backend-konsolissa pitäisi näkyä "MongoDB connected")
4. Testaa API:ta suoraan selaimella: `http://localhost:3000/cars`
5. Tarkista että CORS on käytössä backendissä

---

### Portti on jo käytössä

**Ongelma:** `Port 3000 is already in use` tai `Port 5173 is already in use`

**Ratkaisut:**
1. Sulje muut sovellukset, jotka käyttävät samaa porttia
2. Tai vaihda portti:
   - Backend: Muuta `PORT`-muuttuja `.env`-tiedostossa
   - Frontend: Muuta `vite.config.js`-tiedostossa tai käytä `npm run dev -- --port 5174`

---

### Riippuvuuksien asennus epäonnistuu

**Ongelma:** `npm install` epäonnistuu

**Ratkaisut:**
1. Tarkista että Node.js ja npm ovat asennettuna (`node --version`, `npm --version`)
2. Päivitä npm: `npm install -g npm@latest`
3. Poista `node_modules`-kansio ja `package-lock.json`-tiedosto
4. Yritä uudelleen: `npm install`
5. Jos ongelma jatkuu, tarkista internet-yhteys

---

### MongoDB Atlas -yhteys ei toimi

**Ongelma:** `MongoServerError: Authentication failed`

**Ratkaisut:**
1. Tarkista että käyttäjätunnus ja salasana ovat oikein URI:ssa
2. Varmista että MongoDB-käyttäjä on luotu Atlasissa
3. Tarkista että IP-osoitteesi on sallittu (Network Access → Add IP Address)
4. Jos käytät erityismerkkejä salasanassa, URL-enkoodaa ne (esim. `@` → `%40`)

---

### Dialogit eivät aukea

**Ongelma:** Popup-dialogit eivät avaudu

**Ratkaisut:**
1. Tarkista selaimen konsoli virheilmoituksista
2. Tarkista että `bind:this` on oikein määritelty dialog-elementeissä
3. Tarkista että `showModal()`-metodia kutsutaan oikein
4. Testaa selaimen developer tools -konsolissa: `document.querySelector('dialog').showModal()`

---

### Kuvat eivät näy

**Ongelma:** Autojen kuvat eivät lataudu

**Ratkaisut:**
1. Tarkista että `imageUrl` on oikein muodostettu (alkaa `http://` tai `https://`)
2. Tarkista että kuva-URL on julkisesti saatavilla (ei vaadi autentikointia)
3. Tarkista selaimen Network-välilehti, latautuuko kuva
4. Jos käytät paikallisia kuvia, kopioi ne `frontend/public/`-kansioon ja käytä polkua `/kuva.jpg`

---

## 🚀 Jatkokehitysideoita

### Toiminnallisuus
- ✅ **Käyttäjätunnukset ja autentikointi** - Rekisteröityminen, kirjautuminen, käyttäjäkohtaiset autot
- ✅ **Autojen suosikkilista** - Käyttäjät voivat merkitä autoja suosikeiksi
- ✅ **Autojen vertailu** - Vertaa kahta autoa rinnakkain
- ✅ **Autojen jakaminen** - Jaa auto sosiaaliseen mediaan
- ✅ **Hakuhistoria** - Näytä käyttäjän viimeisimmät haut
- ✅ **Autojen kategorisointi** - Kategoriat kuten "Perheautot", "Urheiluautot", "Sähköautot"
- ✅ **Autojen hinnat** - Lisää hintatieto autolle
- ✅ **Autojen myynti-ilmoitukset** - Linkki myynti-ilmoitukseen
- ✅ **Autojen tilastot** - Näytä tilastoja (esim. suosituimmat autot, keskimääräinen arvostelu)

### Tekninen
- ✅ **Kuvien upload** - Lataa kuvat suoraan palvelimelle (esim. Multer + Cloudinary)
- ✅ **Pagination** - Sivutettu lista kun autoja on paljon
- ✅ **Lazy loading** - Lataa kuvat vasta kun ne näkyvät
- ✅ **Caching** - Välimuisti API-kutsuille
- ✅ **API-rate limiting** - Rajoita API-kutsujen määrää
- ✅ **Validoinnin parantaminen** - Parempi validointi sekä frontendissä että backendissä
- ✅ **Error handling** - Parempi virheenkäsittely ja käyttäjäystävälliset virheilmoitukset
- ✅ **Loading states** - Näytä latausanimaatioita
- ✅ **Optimistic updates** - Päivitä UI heti, vahvista backendistä myöhemmin

### UI/UX
- ✅ **Light mode** - Vaihtoehtoinen vaalea teema
- ✅ **Animaatiot** - Lisää siirtymäanimaatioita
- ✅ **Parempi responsiivisuus** - Optimoi mobiilinäytöille
- ✅ **Accessibility** - Paranna saavutettavuutta (ARIA-labels, näppäimistönavigointi)
- ✅ **Dark mode toggle** - Vaihda teemaa dynaamisesti
- ✅ **Autojen järjestäminen** - Järjestä nimen, vuosimallin, arvostelun mukaan
- ✅ **Autojen suodatus tallentaminen** - Tallenna suodattimet URL-parametreihin
- ✅ **Breadcrumbs** - Näytä navigointipolku

### Testaus
- ✅ **Yksikkötestit** - Testaa komponentteja ja funktioita
- ✅ **Integraatiotestit** - Testaa API-reittejä
- ✅ **E2E-testit** - Testaa koko käyttöliittymää (esim. Playwright, Cypress)
- ✅ **Testikattavuus** - Mittaa testikattavuutta

### Dokumentaatio
- ✅ **API-dokumentaatio** - Swagger/OpenAPI-dokumentaatio
- ✅ **Komponenttien dokumentaatio** - Storybook tai vastaava
- ✅ **Koodin dokumentaatio** - JSDoc-kommentit

### DevOps
- ✅ **CI/CD** - Automaattinen testaus ja deploy
- ✅ **Docker** - Kontainerisointi sovellukselle
- ✅ **Production build** - Optimoi production-build
- ✅ **Environment variables** - Eri ympäristöt (dev, staging, production)

---

## 📝 Lisenssi

Tämä projekti on lisensoitu ISC-lisenssillä.

---

## 👥 Tekijät

- **Anssi22** - Alkuperäinen kehittäjä
  - GitHub: [@Anssi22](https://github.com/Anssi22)

---

## 🙏 Kiitokset

- SvelteKit-yhteisö
- MongoDB-yhteisö
- Kaikki avoimen lähdekoodin yhteisöt, joiden työkaluja tässä projektissa käytetään

---

## 📞 Tuki

Jos kohtaat ongelmia tai sinulla on kysymyksiä:

1. Tarkista [Troubleshooting](#-troubleshooting) -osion
2. Avaa issue GitHubissa: https://github.com/Anssi22/Autotietosivusto/issues
3. Tarkista projektin dokumentaatio

---

## 📚 Hyödyllisiä linkkejä

- [SvelteKit dokumentaatio](https://kit.svelte.dev/docs)
- [Svelte dokumentaatio](https://svelte.dev/docs)
- [Express dokumentaatio](https://expressjs.com/)
- [Mongoose dokumentaatio](https://mongoosejs.com/docs/)
- [MongoDB dokumentaatio](https://www.mongodb.com/docs/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Node.js dokumentaatio](https://nodejs.org/docs)
