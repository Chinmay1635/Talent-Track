import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../src/lib/mongodb';
import Academy from '../../../src/models/Academy';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const academies = await Academy.find({});
      return res.status(200).json(academies);
    } catch (err) {
      return res.status(500).json({ error: 'Failed to fetch academies.' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed.' });
}
