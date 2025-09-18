import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../src/lib/mongodb';
import Coach from '../../../src/models/Coach';

// GET /api/coach - List all coaches
// POST /api/coach - Create new coach
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  if (method === 'GET') {
    try {
        await dbConnect();
        const coaches = await Coach.find()
          .populate('user')
          .populate('academy');
        res.status(200).json(coaches);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  } else if (method === 'POST') {
    // Create coach
    try {
        await dbConnect();
        let data = req.body;
        // Convert string IDs to ObjectIds if present
        if (data.userId) {
          data.user = data.userId;
          delete data.userId;
        }
        if (data.academyId) {
          data.academy = data.academyId;
          delete data.academyId;
        }
        const created = await Coach.create(data);
        res.status(201).json(created);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
