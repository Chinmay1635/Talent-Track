import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../src/lib/prisma';

// GET /api/tournament - List all tournaments
// POST /api/tournament - Create new tournament
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  if (method === 'GET') {
    try {
      const tournaments = await prisma.tournament.findMany({
        include: {
          academy: true,
          registrations: true,
          winners: true,
        },
      });
      res.status(200).json(tournaments);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  } else if (method === 'POST') {
    // Create tournament
    try {
      const data = req.body;
      const created = await prisma.tournament.create({ data });
      res.status(201).json(created);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
