import express from 'express';
import db from './config/connection.js';
import { fileURLToPath } from 'node:url';
import routes from './routes/index.js';
import path from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Register API routes **before** serving static files
app.use(routes);

// Serve static files for React app **after** API routes
app.use(express.static(path.join(__dirname, '../client/dist')));

// Catch-all route for React (must be **after** API routes)
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

db.once('open', () => {
  app.listen(PORT, '0.0.0.0', () => console.log(`🌍 Now listening on http://0.0.0.0:${PORT}`));
});
