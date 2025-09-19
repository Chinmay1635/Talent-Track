import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../src/lib/mongodb';
import Academy from '../../../src/models/Academy';
import Coach from '../../../src/models/Coach';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  const { id } = req.query;
  const populate = req.query.populate;

  if (req.method === 'GET') {
    try {
      let academy;
      if (populate === 'coaches') {
        academy = await Academy.findById(id).populate({
          path: 'coaches',
          model: 'Coach',
          select: '-password', // exclude password if present
        }).exec();
      } else {
        academy = await Academy.findById(id);
      }
      if (!academy) return res.status(404).json({ error: 'Academy not found.' });
      return res.status(200).json(academy);
    } catch (err) {
      return res.status(500).json({ error: 'Failed to fetch academy.' });
    }
  }

  // Add PATCH for updating coaches collection if needed
  if (req.method === 'PATCH') {
    // Accepts { coachId, action } in body
    const { coachId, action } = req.body;
    if (!coachId || !['add', 'remove'].includes(action)) {
      return res.status(400).json({ error: 'Invalid request.' });
    }
    try {
      let update;
      if (action === 'add') {
        update = await Academy.updateOne(
          { _id: id },
          { $addToSet: { coaches: coachId } }
        );
        await Coach.updateOne(
          { _id: coachId },
          { academy: id }
        );
      } else if (action === 'remove') {
        update = await Academy.updateOne(
          { _id: id },
          { $pull: { coaches: coachId } }
        );
        await Coach.updateOne(
          { _id: coachId },
          { $unset: { academy: '' } }
        );
      }
      return res.status(200).json({ success: true, update });
    } catch (err) {
      return res.status(500).json({ error: 'Failed to update coaches.' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed.' });
}
