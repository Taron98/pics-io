/** @format */
import express, { Response as ExResponse, Request as ExRequest } from 'express';
import { RegisterRoutes } from '../generated/routes';
import path from 'path';
import fs from 'fs';
import cors from 'cors';
import { GenericErrorMiddleware } from './common';
import swaggerUi from 'swagger-ui-express';

const openapiHtml = fs.readFileSync(
  path.resolve(process.cwd(), './generated/openapi.html'),
  'utf-8',
);
const swaggerDocument = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../generated/swagger.json'), 'utf-8'),
);

export const app = express();

app.use(
  express.urlencoded({
    extended: true,
    limit: '100mb',
  }),
);
app.use(express.json({ limit: '100mb' }));

if (process.env.NODE_ENV === 'development') {
  app.use(cors());
}

// Serve OpenAPI UI
app.get('/docs', (_req: ExRequest, res: ExResponse) => {
  res.set('Content-Type', 'text/html');
  return res.send(openapiHtml);
});

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Health check
app.get('/health', (_, res) => res.send('Healthy'));

// Register tsoa
RegisterRoutes(app);

// Register custom error middleware
GenericErrorMiddleware(app);
