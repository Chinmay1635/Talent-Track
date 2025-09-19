import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../src/lib/mongodb';
import Sponsor from '../../../src/models/Sponsor';

// GET /api/sponsor/[id] - Get sponsor by ID
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const { id } = req.query;

  if (method === 'GET') {
    try {
      await dbConnect();
      const sponsor = await Sponsor.findById(id).populate('user').populate('tournamentWinners');
      if (!sponsor) return res.status(404).json({ error: 'Sponsor not found' });
      res.status(200).json(sponsor);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  } else if (method === 'PUT') {
    // Update sponsor
    try {
      const data = req.body;
      await dbConnect();
      const updated = await Sponsor.findByIdAndUpdate(id, data, { new: true });
      res.status(200).json(updated);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  } else if (method === 'DELETE') {
    // Delete sponsor
    try {
      await dbConnect();
      await Sponsor.findByIdAndDelete(id);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
