import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../src/lib/prisma';

// GET /api/tournament/[id] - Get tournament by ID
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const { id } = req.query;

  if (method === 'GET') {
    try {
      const tournament = await prisma.tournament.findUnique({
        where: { id: id as string },
        include: {
          academy: true,
          registrations: true,
          winners: true,
        },
      });
      if (!tournament) return res.status(404).json({ error: 'Tournament not found' });
      res.status(200).json(tournament);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  } else if (method === 'PUT') {
    // Update tournament
    try {
      const data = req.body;
      const updated = await prisma.tournament.update({
        where: { id: id as string },
        data,
      });
      res.status(200).json(updated);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  } else if (method === 'DELETE') {
    // Delete tournament
    try {
      await prisma.tournament.delete({ where: { id: id as string } });
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
