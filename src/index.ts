import appRoot from 'app-root-path';
import dotenv from 'dotenv';
import app from './app';
import { logger } from './util/logger';

dotenv.config({ path: `${appRoot.path}/.env` });

const NODE_ENV = process.env.NODE_ENV;

const port = NODE_ENV && NODE_ENV.toLowerCase() === "local" ? process.env.PORT : process.env.TEST_PORT;

app.listen(port, () => logger.info(`App listening on PORT: ${port}`));