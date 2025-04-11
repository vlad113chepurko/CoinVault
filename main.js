const express = require('express');
const mongoose = require('mongoose');
const Money = require('./models/Money');
 
const app = express();
app.use(express.json());

const uri = `mongodb+srv://Alevice:8%3CtAyi%2225yQd@cluster0.wa0ajam.mongodb.net/?appName=Cluster0`;
 
mongoose.connect(uri, {
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));
 
// GET: Получить пользователя по ID
app.get('/moneys/:id', async (req, res) => {
  try {
    const money = await Money.findById(req.params.id);
    if (!money) return res.status(404).send('Money not found');
    res.json(money);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.get('/moneys/', async (req, res) => {
  try {
    const money = await Money.find();
    if (!money) return res.status(404).send('Money not found');
    res.json(money);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// POST: Создать монету
app.post('/moneys', async (req, res) => {
  try {
    const { name } = req.body;
    const money = new Money({ name });
    await money.save();
    res.status(201).json(money);
  } catch (err) {
    res.status(500).send(err.message);
  }
});
 
// PUT: Обновить имя монеты
app.put('/money/:id', async (req, res) => {
  try {
    const { name } = req.body;
    const money = await Money.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true }
    );
    if (!money) return res.status(404).send('Money not found');
    res.json(money);
  } catch (err) {
    res.status(500).send(err.message);
  }
});
 
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});