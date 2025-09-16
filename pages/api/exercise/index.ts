import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../src/lib/prisma';

// GET /api/exercise - List all exercises
// POST /api/exercise - Create new exercise
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  if (method === 'GET') {
    try {
      const exercises = await prisma.exercise.findMany({
        include: {
          trainingPlan: true,
        },
      });
      res.status(200).json(exercises);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  } else if (method === 'POST') {
    // Create exercise
    try {
      const data = req.body;
      const created = await prisma.exercise.create({ data });
      res.status(201).json(created);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
