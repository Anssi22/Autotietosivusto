require('dotenv').config();
const mongoose = require('mongoose');
const Car = require('./models/Car');

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB connected');

    // Tyhjennä vanhat datat
    await Car.deleteMany({});
    console.log('🧹 Old cars removed');

    const cars = [
      {
        name: 'Golf',
        manufacturer: 'Volkswagen',
        year: 2018,
        fuelType: 'Bensiini',
        horsepower: 115,
        description: 'Kompakti perheauto kaupungin ja maantien ajoon.',
        imageUrl: 'https://example.com/golf.jpg',
        comments: [
          { user: 'Matti', text: 'Hyvä kulkupeli, pieni kulutus.', rating: 4 },
          { user: 'Liisa', text: 'Mukava ajaa, mutta melko pieni tavaratila.', rating: 3 }
        ]
      },
      {
        name: 'Model 3',
        manufacturer: 'Tesla',
        year: 2022,
        fuelType: 'Sähkö',
        horsepower: 325,
        description: 'Sähköinen sedan pitkällä toimintamatkalla.',
        imageUrl: 'https://example.com/model3.jpg',
        comments: [
          { user: 'Antti', text: 'Hiljainen ja nopea.', rating: 5 },
          { user: 'Sara', text: 'Latausverkosto hyvä, mutta hinta kova.', rating: 4 }
        ]
      },
      {
        name: 'Corolla',
        manufacturer: 'Toyota',
        year: 2020,
        fuelType: 'Hybridi',
        horsepower: 122,
        description: 'Luotettava ja taloudellinen arki-auto.',
        imageUrl: 'https://example.com/corolla.jpg',
        comments: [
          { user: 'Pekka', text: 'Erittäin pieni kulutus.', rating: 5 },
          { user: 'Aino', text: 'Sisusta voisi olla modernimpi.', rating: 3 }
        ]
      },
      {
        name: 'A4',
        manufacturer: 'Audi',
        year: 2019,
        fuelType: 'Diesel',
        horsepower: 150,
        description: 'Premium-sedan mukavalla jousituksella.',
        imageUrl: 'https://example.com/a4.jpg',
        comments: [
          { user: 'Janne', text: 'Hyvä ajotuntuma ja laatu.', rating: 4 },
          { user: 'Veera', text: 'Huoltokulut melko korkeat.', rating: 3 }
        ]
      },
      {
        name: 'Civic',
        manufacturer: 'Honda',
        year: 2017,
        fuelType: 'Bensiini',
        horsepower: 182,
        description: 'Sporttinen kompaktiauto nuorekkaalla ilmeellä.',
        imageUrl: 'https://example.com/civic.jpg',
        comments: [
          { user: 'Miro', text: 'Hauska ajaa mutkatiellä.', rating: 5 },
          { user: 'Noora', text: 'Melutaso moottoritiellä vähän korkea.', rating: 3 }
        ]
      },
      {
        name: 'Octavia',
        manufacturer: 'Škoda',
        year: 2021,
        fuelType: 'Diesel',
        horsepower: 150,
        description: 'Tilava farmari perhekäyttöön.',
        imageUrl: 'https://example.com/octavia.jpg',
        comments: [
          { user: 'Kalle', text: 'Erinomainen tavaratila.', rating: 5 },
          { user: 'Emma', text: 'Perusvarustelu voisi olla parempi.', rating: 4 }
        ]
      },
      {
        name: 'Fiesta',
        manufacturer: 'Ford',
        year: 2016,
        fuelType: 'Bensiini',
        horsepower: 100,
        description: 'Ketterä pikkuauto kaupunkiliikenteeseen.',
        imageUrl: 'https://example.com/fiesta.jpg',
        comments: [
          { user: 'Olli', text: 'Helppo parkkeerata.', rating: 4 },
          { user: 'Sini', text: 'Takapenkkitila ahdas.', rating: 2 }
        ]
      },
      {
        name: 'XC60',
        manufacturer: 'Volvo',
        year: 2020,
        fuelType: 'Hybridi',
        horsepower: 250,
        description: 'Turvallinen ja mukava SUV.',
        imageUrl: 'https://example.com/xc60.jpg',
        comments: [
          { user: 'Heikki', text: 'Erittäin mukavat penkit.', rating: 5 },
          { user: 'Laura', text: 'Kulutus hieman korkeampi kuin odotin.', rating: 3 }
        ]
      },
      {
        name: 'Yaris',
        manufacturer: 'Toyota',
        year: 2019,
        fuelType: 'Hybridi',
        horsepower: 100,
        description: 'Pieni mutta taloudellinen kaupunkihybridi.',
        imageUrl: 'https://example.com/yaris.jpg',
        comments: [
          { user: 'Tiina', text: 'Täydellinen kaupunkiauto.', rating: 5 },
          { user: 'Markus', text: 'Moottoritien ohituksissa tehoja voisi olla enemmän.', rating: 3 }
        ]
      },
      {
        name: 'E-Golf',
        manufacturer: 'Volkswagen',
        year: 2019,
        fuelType: 'Sähkö',
        horsepower: 136,
        description: 'Sähköinen versio suositusta Golfista.',
        imageUrl: 'https://example.com/egolf.jpg',
        comments: [
          { user: 'Johanna', text: 'Lyhyemmät matkat menee helposti sähköllä.', rating: 4 },
          { user: 'Ville', text: 'Toimintamatka voisi olla pidempi.', rating: 3 }
        ]
      }
    ];

    const created = await Car.insertMany(cars);
    console.log(`✅ Inserted ${created.length} cars`);

  } catch (err) {
    console.error('❌ Seed error:', err);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 MongoDB disconnected');
    process.exit(0);
  }
}

seed();