import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../src/lib/mongodb';
import Badge from '../../../src/models/Badge';

// GET /api/badge/[id] - Get badge by ID
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const { id } = req.query;

  if (method === 'GET') {
    try {
      await dbConnect();
      const badge = await Badge.findById(id);
      if (!badge) return res.status(404).json({ error: 'Badge not found' });
      res.status(200).json(badge);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  } else if (method === 'PUT') {
    // Update badge
    try {
      const data = req.body;
      await dbConnect();
      const updated = await Badge.findByIdAndUpdate(id, data, { new: true });
      res.status(200).json(updated);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  } else if (method === 'DELETE') {
    // Delete badge
    try {
      await dbConnect();
      await Badge.findByIdAndDelete(id);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
