import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../src/lib/prisma';

// POST /api/user - Create user in Prisma with Clerk userId
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
  try {
    const { clerkUserId, email, name, role } = req.body;
    if (!clerkUserId || !email || !name || !role) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    // Upsert user by clerkUserId
    const user = await prisma.user.upsert({
      where: { clerkUserId },
      update: { email, name, role },
      create: { clerkUserId, email, name, role },
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}
