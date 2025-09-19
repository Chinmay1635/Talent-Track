import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/dbConnect';
import Registration from '../../../src/models/Registration';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const { academyId } = req.query;
  try {
    let registrations = [];
    if (academyId) {
  // Import Tournament model
  const Tournament = require('../../../src/models/Tournament').default;
      // Find tournaments for this academy
      const tournaments = await Tournament.find({ academyId }).select('_id').lean();
      const tournamentIds = tournaments.map(t => t._id.toString());
      registrations = await Registration.find({ tournamentId: { $in: tournamentIds } }).lean();
    } else {
      registrations = await Registration.find({}).lean();
    }
    return res.status(200).json({ registrations });
  } catch (err) {
    return res.status(500).json({ error: 'Server error' });
  }
}
