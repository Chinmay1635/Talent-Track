import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../src/lib/mongodb';
import TrainingPlan from '../../../src/models/TrainingPlan';

// GET /api/training-plan - List all training plans
// POST /api/training-plan - Create new training plan
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  if (method === 'GET') {
    try {
        await dbConnect();
        const plans = await TrainingPlan.find()
          .populate('athlete')
          .populate('coach')
          .populate('exercises');
        res.status(200).json(plans);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  } else if (method === 'POST') {
    // Create training plan
    try {
      const data = req.body;
        await dbConnect();
        const created = await TrainingPlan.create(data);
        res.status(201).json(created);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
