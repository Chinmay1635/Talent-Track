import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../src/lib/prisma';

// GET /api/coach - List all coaches
// POST /api/coach - Create new coach
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  if (method === 'GET') {
    try {
      const coaches = await prisma.coach.findMany({
        include: {
          user: true,
          academy: true,
          athletes: true,
          trainingPlans: true,
          athleteProgress: true,
        },
      });
      res.status(200).json(coaches);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  } else if (method === 'POST') {
    // Create coach
    try {
      const data = req.body;
      const created = await prisma.coach.create({ data });
      res.status(201).json(created);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
