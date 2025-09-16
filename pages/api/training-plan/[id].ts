import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../src/lib/prisma';

// GET /api/training-plan/[id] - Get training plan by ID
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const { id } = req.query;

  if (method === 'GET') {
    try {
      const plan = await prisma.trainingPlan.findUnique({
        where: { id: id as string },
        include: {
          athlete: true,
          coach: true,
          exercises: true,
        },
      });
      if (!plan) return res.status(404).json({ error: 'Training plan not found' });
      res.status(200).json(plan);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  } else if (method === 'PUT') {
    // Update training plan
    try {
      const data = req.body;
      const updated = await prisma.trainingPlan.update({
        where: { id: id as string },
        data,
      });
      res.status(200).json(updated);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  } else if (method === 'DELETE') {
    // Delete training plan
    try {
      await prisma.trainingPlan.delete({ where: { id: id as string } });
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
