import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../src/lib/mongodb';
import Sponsor from '../../../src/models/Sponsor';

// GET /api/sponsor - List all sponsors
// POST /api/sponsor - Create new sponsor
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  if (method === 'GET') {
    try {
        await dbConnect();
        const sponsors = await Sponsor.find().populate('user').populate('tournamentWinners');
        res.status(200).json(sponsors);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  } else if (method === 'POST') {
    // Create sponsor
    try {
      const data = req.body;
        await dbConnect();
        const created = await Sponsor.create(data);
        res.status(201).json(created);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
