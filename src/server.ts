import express, { type Application } from 'express';
import { pinoHttp } from 'pino-http';
import fileUpload from 'express-fileupload';

import { logger } from './utils';
import { APP_PORT } from './constants';
import { routes } from './routes';
import getDatabaseConnection from './config/database.config';
import { getCloudinaryConnection } from './config/cloudinary.config';

export const app: Application = express();

app.use(express.json());
app.use(pinoHttp({ logger }));
app.use(fileUpload());
app.use(routes);

(async () => {
  await getDatabaseConnection();
  getCloudinaryConnection();
})();

export const server = () => {
  app.listen(APP_PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Question Service Server is listening on port ${APP_PORT}!`);
  });
};
