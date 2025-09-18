
import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/dbConnect';
import User from '../../../src/models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import * as cookie from 'cookie';

const JWT_SECRET = process.env.JWT_SECRET || 'changeme';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  await dbConnect();
  const { email, password, name, role } = req.body;
  if (!email || !password || !name || !role) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const existing = await User.findOne({ email });
  if (existing) {
    return res.status(409).json({ error: 'User already exists' });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ email, password: hashedPassword, name, role, createdAt: new Date() });
  // If academy admin, create academy document
  if (role === 'academy') {
    try {
      const Academy = require('../../../src/models/Academy').default;
      if (!Academy) {
        console.error('Academy model not found');
      }
      const academyDoc = await Academy.create({
        name: `${name}'s Academy`,
        userId: user._id.toString(),
        location: '',
        sports: [],
        createdAt: new Date(),
      });
      if (!academyDoc) {
        console.error('Academy creation returned null/undefined');
      } else {
        console.log('Academy created:', academyDoc);
      }
    } catch (err) {
      console.error('Failed to create academy:', err);
      // Optionally, you can return an error here or continue
      res.status(500).json({ error: 'Failed to create academy', details: err?.message || err });
      return;
    }
  }
  // Create JWT
  const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
  // Set cookie
  res.setHeader('Set-Cookie', cookie.serialize('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 7 * 24 * 60 * 60,
    path: '/',
    sameSite: 'lax',
  }));
  res.status(201).json({ id: user._id, email: user.email, name: user.name, role: user.role, createdAt: user.createdAt });
}
