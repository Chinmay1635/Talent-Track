import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../src/lib/mongodb';
import Badge from '../../../src/models/Badge';

// GET /api/badge - List all badges
// POST /api/badge - Create new badge
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  if (method === 'GET') {
    try {
      await dbConnect();
      const badges = await Badge.find();
      res.status(200).json(badges);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  } else if (method === 'POST') {
    // Create badge
    try {
      const data = req.body;
      await dbConnect();
      const created = await Badge.create(data);
      res.status(201).json(created);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
