import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../src/lib/prisma';

// GET /api/training-plan - List all training plans
// POST /api/training-plan - Create new training plan
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  if (method === 'GET') {
    try {
      const plans = await prisma.trainingPlan.findMany({
        include: {
          athlete: true,
          coach: true,
          exercises: true,
        },
      });
      res.status(200).json(plans);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  } else if (method === 'POST') {
    // Create training plan
    try {
      const data = req.body;
      const created = await prisma.trainingPlan.create({ data });
      res.status(201).json(created);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
