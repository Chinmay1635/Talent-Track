import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../src/lib/prisma';

// GET /api/badge/[id] - Get badge by ID
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const { id } = req.query;

  if (method === 'GET') {
    try {
      const badge = await prisma.badge.findUnique({
        where: { id: id as string },
        include: {
          athleteBadges: true,
        },
      });
      if (!badge) return res.status(404).json({ error: 'Badge not found' });
      res.status(200).json(badge);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  } else if (method === 'PUT') {
    // Update badge
    try {
      const data = req.body;
      const updated = await prisma.badge.update({
        where: { id: id as string },
        data,
      });
      res.status(200).json(updated);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  } else if (method === 'DELETE') {
    // Delete badge
    try {
      await prisma.badge.delete({ where: { id: id as string } });
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
