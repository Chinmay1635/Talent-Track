import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../src/lib/mongodb';
import Coach from '../../../src/models/Coach';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const { id } = req.query;
  await dbConnect();

  if (method === 'GET') {
    try {
      const coach = await Coach.findById(id)
        .populate('user')
        .populate('academy')
        .populate('athletes')
        .populate('trainingPlans')
        .populate('athleteProgress');
      if (!coach) return res.status(404).json({ error: 'Coach not found' });
      res.status(200).json(coach);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  } else if (method === 'PUT') {
    try {
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
      const updated = await Coach.findByIdAndUpdate(id, data, { new: true });
      res.status(200).json(updated);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  } else if (method === 'DELETE') {
    try {
      await Coach.findByIdAndDelete(id);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
