/**
 * Privacy-respecting click counter.
 *
 * Records ONLY: which program was clicked + total count.
 * Does NOT record: who clicked, when, IP address, user agent, or any PII.
 * Uses Vercel Blob to store a single clicks.json file.
 */

import { put, list } from '@vercel/blob';

const BLOB_NAME = 'clicks.json';

async function getClicks() {
  try {
    const { blobs } = await list({ prefix: BLOB_NAME });
    if (blobs.length === 0) return {};
    const res = await fetch(blobs[0].url);
    return await res.json();
  } catch {
    return {};
  }
}

async function saveClicks(clicks) {
  await put(BLOB_NAME, JSON.stringify(clicks), {
    access: 'public',
    addRandomSuffix: false,
  });
}

export default async function handler(req, res) {
  // GET = read all click counts (for you to review)
  if (req.method === 'GET') {
    const clicks = await getClicks();
    return res.status(200).json(clicks);
  }

  // POST = record a click (from the frontend)
  if (req.method === 'POST') {
    try {
      const { id } = req.body || {};

      if (!id || typeof id !== 'string' || !/^[a-zA-Z0-9_-]+$/.test(id)) {
        return res.status(204).end();
      }

      const clicks = await getClicks();
      clicks[id] = (clicks[id] || 0) + 1;
      await saveClicks(clicks);

      res.status(204).end();
    } catch {
      // Fail silently — never break the user experience
      res.status(204).end();
    }
    return;
  }

  res.status(405).end();
}
