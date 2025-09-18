import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/dbConnect';
import User from '../../../src/models/User';
import jwt from 'jsonwebtoken';
import * as cookie from 'cookie';

const JWT_SECRET = process.env.JWT_SECRET || 'changeme';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  await dbConnect();
  const cookies = req.headers.cookie ? cookie.parse(req.headers.cookie) : {};
  const token = cookies.token;
  if (!token) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string; email: string; role: string };
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ id: user._id, email: user.email, name: user.name, role: user.role, createdAt: user.createdAt });
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}
