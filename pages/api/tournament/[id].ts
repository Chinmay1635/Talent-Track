import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../src/lib/mongodb';
import Tournament from '../../../src/models/Tournament';

// GET /api/tournament/[id] - Get tournament by ID
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const { id } = req.query;

  if (method === 'GET') {
    try {
      await dbConnect();
      const tournament = await Tournament.findById(id);
      if (!tournament) return res.status(404).json({ error: 'Tournament not found' });
      res.status(200).json(tournament);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  } else if (method === 'PUT') {
    // Update tournament
    try {
      const data = req.body;
      await dbConnect();
      const updated = await Tournament.findByIdAndUpdate(id, data, { new: true });
      res.status(200).json(updated);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  } else if (method === 'DELETE') {
    // Delete tournament
    try {
      await dbConnect();
      await Tournament.findByIdAndDelete(id);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
