import express from 'express';
const router = express.Router();
import apiRoutes from './api/index.js';
router.get('/test', (_req, res) => {
    console.log('✅ Test route hit!');
    res.json({ message: 'Server is reachable' });
});
router.use('/', apiRoutes);
export default router;
