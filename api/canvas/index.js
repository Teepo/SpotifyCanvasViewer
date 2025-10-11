import * as fs from 'fs';

import * as http from 'http';
import * as https from 'https';

import cors from 'cors';

const privateKey  = fs.readFileSync('selfsigned.key', 'utf8');
const certificate = fs.readFileSync('selfsigned.crt', 'utf8');

import express from 'express';
import canvasRoutes from './routes/canvasRoutes.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3001;

app.use(cors());

app.use('/api/canvas', canvasRoutes);

app.listen(PORT, function () {
    console.log("Listening on PORT: ", PORT);
    if (PORT == 3001) {
        console.log('Running on local: https://localhost:8443');
    }
});

const credentials = { key : privateKey, cert : certificate };

const httpServer  = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

httpServer.listen(8080);
httpsServer.listen(8443);

