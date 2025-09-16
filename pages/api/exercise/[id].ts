import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../src/lib/prisma';

// GET /api/exercise/[id] - Get exercise by ID
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const { id } = req.query;

  if (method === 'GET') {
    try {
      const exercise = await prisma.exercise.findUnique({
        where: { id: id as string },
        include: {
          trainingPlan: true,
        },
      });
      if (!exercise) return res.status(404).json({ error: 'Exercise not found' });
      res.status(200).json(exercise);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  } else if (method === 'PUT') {
    // Update exercise
    try {
      const data = req.body;
      const updated = await prisma.exercise.update({
        where: { id: id as string },
        data,
      });
      res.status(200).json(updated);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  } else if (method === 'DELETE') {
    // Delete exercise
    try {
      await prisma.exercise.delete({ where: { id: id as string } });
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
