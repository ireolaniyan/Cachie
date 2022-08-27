import appRoot from 'app-root-path';
import dotenv from 'dotenv';
import app from './app';
import { logger } from './util/logger';
import { initialize } from 'express-openapi';
import swaggerUi from 'swagger-ui-express';
import apiV1Doc from './api-doc';

dotenv.config({ path: `${appRoot.path}/.env` });

const NODE_ENV = process.env.NODE_ENV;

const port = NODE_ENV && NODE_ENV.toLowerCase() === "local" ? process.env.PORT : process.env.TEST_PORT;

initialize({
  app,
  apiDoc: apiV1Doc,
  paths: `${appRoot.path}/src/paths`,
  routesGlob: '**/*.{ts,js}',
  routesIndexFileRegExp: /(?:index)?\.[tj]s$/
});

app.use(
  "/api-documentation",
  swaggerUi.serve,
  swaggerUi.setup({}, {
    swaggerOptions: {
      url: "http://localhost:3000/api/v1/api-docs",
    },
  })
);

app.listen(port, () => logger.info(`App listening on PORT: ${port}`));