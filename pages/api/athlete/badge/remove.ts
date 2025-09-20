import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../../src/lib/mongodb';
import Athlete from '../../../../src/models/Athlete';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  if (method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${method} Not Allowed`);
  }

  try {
    await dbConnect();
    const { athleteId, badgeId } = req.body;

    if (!athleteId || !badgeId) {
      return res.status(400).json({ error: 'athleteId and badgeId are required' });
    }

    // Remove badge from athlete
    const athlete = await Athlete.findByIdAndUpdate(
      athleteId,
      { $pull: { badges: badgeId } }, // $pull removes the badgeId from the badges array
      { new: true }
    ).populate('badges');

    if (!athlete) {
      return res.status(404).json({ error: 'Athlete not found' });
    }

    res.status(200).json({ success: true, athlete });
  } catch (error) {
    console.error('Error removing badge from athlete:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}