import fs from 'fs'

import { createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';

import { getCanvases } from '../services/spotifyCanvasService.js';

export const fetchCanvas = async (req, res) => {
  const { trackId } = req.query;
  if (!trackId) {
    return res.status(400).json({ error: 'Missing trackId parameter' });
  }

  const canvasData = await getCanvases(`spotify:track:${trackId}`);
  if (!canvasData) {
    return res.status(500).json({ error: 'Failed to fetch canvas data' });
  }

  await downloadCanvas(trackId, canvasData);

  res.json(canvasData);
};

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