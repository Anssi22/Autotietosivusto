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
         imageUrl: 'https://file.kelleybluebookimages.com/kbb/base/evox/StJ/12601/2018-Volkswagen-Golf%20GTI-front-view_12601_118_640x480.jpg',
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
         imageUrl: 'https://crdms.images.consumerreports.org/c_lfill,w_768,q_auto,f_auto/prod/cars/chrome/white/2022TSC030003_1280_03',
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
         imageUrl: 'https://hips.hearstapps.com/hmg-prod/images/2020-toyota-corolla-hybrid-104-1543343423.jpg?crop=1.00xw:0.918xh;0,0.0816xh',
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
         imageUrl: 'https://images.hgmsites.net/lrg/2019-audi-a4-premium-plus-3-0-tfsi-quattro-angular-front-exterior-view_100733976_l.jpg',
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
         imageUrl: 'https://www.cnet.com/a/img/resize/1fa71aefd2f431b5f667394866b0b9fc5149eb6c/hub/2017/01/26/dd289887-a8ec-4d3e-870b-860f1cebd380/2017-honda-civic-hatchback-sport-11.jpg?auto=webp&fit=crop&height=675&width=1200',
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
         imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Skoda_Octavia_IV_liftback_%28cropped%29.jpg/1280px-Skoda_Octavia_IV_liftback_%28cropped%29.jpg',
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
        imageUrl: 'https://images.hgmsites.net/med/2016-ford-fiesta-5dr-hb-st-front-exterior-view_100514942_m.jpg',
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
        imageUrl: 'https://images.dealer.com/ddc/vehicles/2020/Volvo/XC60%20Hybrid/SUV/perspective/front-left/2020_24.png',
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
        imageUrl: 'https://www.gtplanet.net/wp-content/uploads/2019/10/2019-Toyota-Yaris-Review-GTPlanet-01.jpg',
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
        imageUrl: 'https://e7.pngegg.com/pngimages/78/101/png-clipart-2017-volkswagen-e-golf-2017-volkswagen-golf-gti-2015-volkswagen-golf-car-volkswagen-compact-car-sedan-thumbnail.png',
        comments: [
          { user: 'Johanna', text: 'Lyhyemmät matkat menee helposti sähköllä.', rating: 4 },
          { user: 'Ville', text: 'Toimintamatka voisi olla pidempi.', rating: 3 }
        ]
      },

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