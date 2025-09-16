import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../src/lib/prisma';

// GET /api/sponsor/[id] - Get sponsor by ID
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const { id } = req.query;

  if (method === 'GET') {
    try {
      const sponsor = await prisma.sponsor.findUnique({
        where: { id: id as string },
        include: {
          user: true,
          tournamentWinners: true,
        },
      });
      if (!sponsor) return res.status(404).json({ error: 'Sponsor not found' });
      res.status(200).json(sponsor);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  } else if (method === 'PUT') {
    // Update sponsor
    try {
      const data = req.body;
      const updated = await prisma.sponsor.update({
        where: { id: id as string },
        data,
      });
      res.status(200).json(updated);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  } else if (method === 'DELETE') {
    // Delete sponsor
    try {
      await prisma.sponsor.delete({ where: { id: id as string } });
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
