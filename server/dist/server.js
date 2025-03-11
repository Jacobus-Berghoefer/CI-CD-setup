import express from 'express';
// import path from 'node:path';
import db from './config/connection.js';
import routes from './routes/index.js';
const app = express();
const PORT = Number(process.env.PORT) || 3001;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serves static files in the entire client's dist folder
app.use(express.static('../client/dist'));
app.use(routes);
db.once('open', () => {
    app.listen(PORT, '0.0.0.0', () => console.log(`🌍 Now listening on http://0.0.0.0:${PORT}`));
});
