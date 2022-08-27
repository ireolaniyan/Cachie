import express from 'express';
import cachie from './routes/cachie';

const app = express();
app.use(express.json());
app.use('/api/v1', cachie);

app.get('/', (req, res) => {
  res.send('Hello from Cachie API');
});

export default app;