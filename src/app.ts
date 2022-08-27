import express from 'express';
import { initialize } from 'express-openapi';
import cachie from './routes/cachie';
import appRoot from 'app-root-path';
import swaggerUi from 'swagger-ui-express';
import apiV1Doc from './api-doc';

const app = express();
app.use(express.json());
app.use('/api/v1', cachie);

app.get('/', (req, res) => {
  res.send('Hello from Cachie API');
});

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

export default app;