import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../src/lib/mongodb';
import TrainingPlan from '../../../src/models/TrainingPlan';

// GET /api/training-plan/[id] - Get training plan by ID
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const { id } = req.query;

  if (method === 'GET') {
    try {
      await dbConnect();
      const plan = await TrainingPlan.findById(id);
      if (!plan) return res.status(404).json({ error: 'Training plan not found' });
      res.status(200).json(plan);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  } else if (method === 'PUT') {
    // Update training plan
    try {
      const data = req.body;
      await dbConnect();
      const updated = await TrainingPlan.findByIdAndUpdate(id, data, { new: true });
      res.status(200).json(updated);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  } else if (method === 'DELETE') {
    // Delete training plan
    try {
      await dbConnect();
      await TrainingPlan.findByIdAndDelete(id);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
