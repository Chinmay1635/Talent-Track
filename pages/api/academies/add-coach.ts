import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../src/lib/mongodb';
import Academy from '../../../src/models/Academy';
import Coach from '../../../src/models/Coach';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  const { id } = req.query;

  if (req.method === 'POST') {
    // Add coach to academy (alternative route)
    const { coachId } = req.body;
    if (!coachId) {
      return res.status(400).json({ error: 'coachId is required.' });
    }
    try {
      // Add coach to academy's coaches array
      await Academy.updateOne(
        { _id: id },
        { $addToSet: { coaches: coachId } }
      );
      // Update coach's academy field
      await Coach.updateOne(
        { _id: coachId },
        { academy: id }
      );
      // Return updated academy with populated coaches
      const academy = await Academy.findById(id).populate({
        path: 'coaches',
        model: 'Coach',
        select: '-password',
      }).exec();
      return res.status(200).json(academy);
    } catch (err) {
      return res.status(500).json({ error: 'Failed to add coach to academy.' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed.' });
}
