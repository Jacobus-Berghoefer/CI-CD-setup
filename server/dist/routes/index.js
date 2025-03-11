import express from 'express';
const router = express.Router();
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import apiRoutes from './api/index.js';
router.get('/test', (_req, res) => {
    console.log('✅ Test route hit!');
    res.json({ message: 'Server is reachable' });
});
router.use('/api', apiRoutes);
// serve up react front-end in production
router.use((_req, res) => {
    res.sendFile(path.join(__dirname, '../../../client/dist/index.html'));
});
export default router;
