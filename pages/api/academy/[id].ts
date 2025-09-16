import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../src/lib/prisma';

// GET /api/academy/[id] - Get academy by ID
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const { id } = req.query;

  if (method === 'GET') {
    try {
      const academy = await prisma.academy.findUnique({
        where: { id: id as string },
        include: {
          user: true,
          athletes: true,
          coaches: true,
          tournaments: true,
        },
      });
      if (!academy) return res.status(404).json({ error: 'Academy not found' });
      res.status(200).json(academy);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  } else if (method === 'PUT') {
    // Update academy
    try {
      const data = req.body;
      const updated = await prisma.academy.update({
        where: { id: id as string },
        data,
      });
      res.status(200).json(updated);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  } else if (method === 'DELETE') {
    // Delete academy
    try {
      await prisma.academy.delete({ where: { id: id as string } });
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
