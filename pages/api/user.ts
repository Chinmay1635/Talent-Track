import type { NextApiRequest, NextApiResponse } from 'next';

import dbConnect from '../../src/lib/mongodb';
import User from '../../src/models/User';

// POST /api/user - Create user in MongoDB with Clerk userId
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Get all users with role 'coach'
    try {
      await dbConnect();
      const coaches = await User.find({ role: 'coach' });
      res.status(200).json(coaches);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  } else if (req.method === 'POST') {
    try {
      await dbConnect();
      const { clerkUserId, email, name, role } = req.body;
      if (!clerkUserId || !email || !name || !role) {
        return res.status(400).json({ error: 'Missing required fields' });
      }
      // Upsert user by clerkUserId
      let user = await User.findOne({ clerkUserId });
      if (user) {
        user.email = email;
        user.name = name;
        user.role = role;
        await user.save();
      } else {
        user = await User.create({ clerkUserId, email, name, role });
      }
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
