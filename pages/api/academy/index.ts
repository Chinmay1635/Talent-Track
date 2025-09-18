import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../src/lib/mongodb';
import Academy from '../../../src/models/Academy';

// GET /api/academy - List all academies
// POST /api/academy - Create new academy
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  if (method === 'GET') {
    try {
      await dbConnect();
      const academies = await Academy.find();
      res.status(200).json(academies);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  } else if (method === 'POST') {
    // Create academy
    try {
      await dbConnect();
      const data = req.body;
      const created = await Academy.create(data);
      res.status(201).json(created);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
