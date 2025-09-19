import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../src/lib/mongodb';
import Athlete from '../../../src/models/Athlete';

// GET /api/athlete - List all athletes
// POST /api/athlete - Create new athlete
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  if (method === 'GET') {
    try {
        await dbConnect();
        const athletes = await Athlete.find()
          .populate('user')
          .populate('coach')
          .populate('academy');
        res.status(200).json(athletes);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  } else if (method === 'POST') {
    // Create athlete
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
        if (data.coachId) {
          data.coach = data.coachId;
          delete data.coachId;
        }
        if (!data.user) {
          return res.status(400).json({ error: 'user is required' });
        }
        if (data.age) data.age = Number(data.age);
        if (data.level) data.level = data.level.charAt(0).toUpperCase() + data.level.slice(1).toLowerCase();
        const created = await Athlete.create(data);
        res.status(201).json(created);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
