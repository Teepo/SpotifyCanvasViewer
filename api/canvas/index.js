import fs from 'fs'
import path from 'path'

import * as http from 'http';
import * as https from 'https';

import { createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';

import cors from 'cors';
import yargs from 'yargs';

const privateKey  = fs.readFileSync('selfsigned.key', 'utf8');
const certificate = fs.readFileSync('selfsigned.crt', 'utf8');

import express from 'express';
import dotenv from 'dotenv';

import { getCanvases } from './services/spotifyCanvasService.js';

dotenv.config();

const app = express();
const router = express.Router();

const PORT = 3001;

const argv = yargs(process.argv).parse();

const isDev = argv.env === 'dev';

if (isDev) {
    app.use(cors());
}

app.use('/api/canvas', async (req, res) => {

    const { trackId } = req.query;

    if (!trackId) {
        return res.status(400).json({
            error: 'Missing trackId parameter'
        });
    }

    const canvasData = await getCanvases(`spotify:track:${trackId}`);

    if (!canvasData) {
        return res.status(500).json({
            error: 'Failed to fetch canvas data'
        });
    }

    await downloadCanvas(trackId, canvasData);

    res.json(canvasData);
});

app.use('/api/canvas_list', async (req, res) => {

    res.json(
        fs
            .readdirSync(process.env.API_CANVAS_VIDEO_OUTPUT_DIR)
            .filter(file => path.extname(file).toLowerCase() === '.mp4')
    );
});

async function downloadCanvas(trackId, canvasData) {

    if (canvasData?.canvasesList.length <= 0) {
        return;
    }

    const canvas = canvasData.canvasesList[0];

    const request = await fetch(canvas.canvasUrl);

    const outputPath = `${process.env.API_CANVAS_VIDEO_OUTPUT_DIR}/${trackId}.mp4`;

    if (fs.existsSync(outputPath)) {
        return;
    }

    const stream = createWriteStream(outputPath);

    await pipeline(request.body, stream);
}

app.listen(PORT);

if (isDev) {

    const credentials = {
        key  : privateKey,
        cert : certificate
    };

    const httpServer  = http.createServer(app);
    const httpsServer = https.createServer(credentials, app);

    httpServer.listen(8080);
    httpsServer.listen(8443);
}