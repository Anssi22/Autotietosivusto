require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Car = require('./models/Car');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Mongo-yhteys
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error);
    process.exit(1);
  });
  
/**
 * GET /cars
 * Suodatus query-parametrien avulla:
 *   ?manufacturer=Toyota&year=2020&fuelType=Diesel
 */
app.get('/cars', async (req, res) => {
  try {
    const { manufacturer, year, fuelType, search } = req.query;
    const filter = {};

    if (manufacturer) filter.manufacturer = manufacturer;
    if (year) filter.year = Number(year);
    if (fuelType) filter.fuelType = fuelType;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { manufacturer: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const cars = await Car.find(filter).sort({ createdAt: -1 });
    res.json(cars);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

/**
 * GET /cars/:id
 */
app.get('/cars/:id', async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ error: 'Not found' });
    res.json(car);
  } catch {
    res.status(400).json({ error: 'Invalid id' });
  }
});

/**
 * POST /cars
 * Uuden auton lisääminen
 */
app.post('/cars', async (req, res) => {
  try {
    const car = new Car(req.body);
    const saved = await car.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: 'Bad data', details: err.message });
  }
});

/**
 * PUT /cars/:id
 * Auton muokkaus
 */
app.put('/cars/:id', async (req, res) => {
  try {
    const updated = await Car.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updated) return res.status(404).json({ error: 'Not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: 'Bad data', details: err.message });
  }
});

/**
 * DELETE /cars/:id
 * Auton poisto
 */
app.delete('/cars/:id', async (req, res) => {
  try {
    const deleted = await Car.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch {
    res.status(400).json({ error: 'Invalid id' });
  }
});

/**
 * POST /cars/:id/comments
 * Kommentin + arvostelun lisääminen
 */
app.post('/cars/:id/comments', async (req, res) => {
  try {
    const { user, text, rating } = req.body;
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ error: 'Not found' });

    car.comments.push({ user, text, rating });
    await car.save();
    res.status(201).json(car);
  } catch (err) {
    res.status(400).json({ error: 'Bad data', details: err.message });
  }
});