import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../src/lib/mongodb';
import Athlete from '../../../src/models/Athlete';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const { id } = req.query;
  await dbConnect();

  if (method === 'GET') {
    try {
      const athlete = await Athlete.findById(id)
        .populate('user')
        .populate('academy')
        .populate('coach')
        .populate('badges')
        .populate('trainingPlans')
        .populate('progress')
        .populate('registrations');
      if (!athlete) return res.status(404).json({ error: 'Athlete not found' });
      res.status(200).json(athlete);
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
      if (data.coachId) {
        data.coach = data.coachId;
        delete data.coachId;
      }
      const updated = await Athlete.findByIdAndUpdate(id, data, { new: true });
      res.status(200).json(updated);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  } else if (method === 'DELETE') {
    try {
      await Athlete.findByIdAndDelete(id);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
