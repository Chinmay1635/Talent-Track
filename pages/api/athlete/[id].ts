import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../src/lib/prisma';

// GET /api/athlete/[id] - Get athlete by ID
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const { id } = req.query;

  if (method === 'GET') {
    try {
      const athlete = await prisma.athlete.findUnique({
        where: { id: id as string },
        include: {
          user: true,
          academy: true,
          coach: true,
          badges: { include: { badge: true } },
          trainingPlans: true,
          progress: true,
          registrations: true,
        },
      });
      if (!athlete) return res.status(404).json({ error: 'Athlete not found' });
      res.status(200).json(athlete);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  } else if (method === 'PUT') {
    // Update athlete
    try {
      const data = req.body;
      const updated = await prisma.athlete.update({
        where: { id: id as string },
        data,
      });
      res.status(200).json(updated);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  } else if (method === 'DELETE') {
    // Delete athlete
    try {
      await prisma.athlete.delete({ where: { id: id as string } });
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
