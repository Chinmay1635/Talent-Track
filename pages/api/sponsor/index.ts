import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../src/lib/prisma';

// GET /api/sponsor - List all sponsors
// POST /api/sponsor - Create new sponsor
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  if (method === 'GET') {
    try {
      const sponsors = await prisma.sponsor.findMany({
        include: {
          user: true,
          tournamentWinners: true,
        },
      });
      res.status(200).json(sponsors);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  } else if (method === 'POST') {
    // Create sponsor
    try {
      const data = req.body;
      const created = await prisma.sponsor.create({ data });
      res.status(201).json(created);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
