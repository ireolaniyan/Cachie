import express from 'express';
import cachie from './routes/cachie';
import { logger } from './util/logger';

const app = express();
app.use(express.json());
app.use('/api/v1', cachie);

app.get('/', (req, res) => {
  res.send('Hello from Cachie API');
});

const port = process.env.PORT || 3000;

app.listen(port, () => logger.info(`App listening on PORT ${port}`));