import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../src/lib/prisma';

// GET /api/athlete - List all athletes
// POST /api/athlete - Create new athlete
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  if (method === 'GET') {
    try {
      const athletes = await prisma.athlete.findMany({
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
      res.status(200).json(athletes);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  } else if (method === 'POST') {
    // Create athlete
    try {
      const data = req.body;
      // Ensure userId is present (should be sent from frontend)
      if (!data.userId) {
        return res.status(400).json({ error: 'userId is required' });
      }
      // Convert age to number if present
      if (data.age) data.age = Number(data.age);
      // Convert level to proper enum case
      if (data.level) data.level =
        data.level.charAt(0).toUpperCase() + data.level.slice(1).toLowerCase();
      const created = await prisma.athlete.create({ data });
      res.status(201).json(created);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
