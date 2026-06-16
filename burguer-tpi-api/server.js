import express from 'express';
import sequelize from './models/index.js';
import productsRouter from './routes/products.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use('/api/products', productsRouter);

app.get('/api', (req, res) => {
  res.json({ status: 'ok', message: 'Burguer API running' });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

async function start() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log(`Server listening on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
}

start();
