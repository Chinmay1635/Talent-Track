import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../src/lib/prisma';

// GET /api/coach/[id] - Get coach by ID
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const { id } = req.query;

  if (method === 'GET') {
    try {
      const coach = await prisma.coach.findUnique({
        where: { id: id as string },
        include: {
          user: true,
          academy: true,
          athletes: true,
          trainingPlans: true,
          athleteProgress: true,
        },
      });
      if (!coach) return res.status(404).json({ error: 'Coach not found' });
      res.status(200).json(coach);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  } else if (method === 'PUT') {
    // Update coach
    try {
      const data = req.body;
      const updated = await prisma.coach.update({
        where: { id: id as string },
        data,
      });
      res.status(200).json(updated);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  } else if (method === 'DELETE') {
    // Delete coach
    try {
      await prisma.coach.delete({ where: { id: id as string } });
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
