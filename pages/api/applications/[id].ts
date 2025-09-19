import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/dbConnect';
import Application from '../../../src/models/Application';
import Academy from '../../../src/models/Academy';
import Coach from '../../../src/models/Coach';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  const { id } = req.query;

  if (req.method === 'PATCH') {
    // Academy updates application status
    const { status } = req.body;
    if (!['accepted', 'rejected'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status.' });
    }
    try {
      // Update the application status
      const app = await Application.findByIdAndUpdate(
        id as string,
        { status },
        { new: true }
      ).exec();
      if (!app) return res.status(404).json({ error: 'Application not found.' });

      if (status === 'accepted') {
        // Ensure coachId is an ObjectId for MongoDB queries
        const mongoose = require('mongoose');
        const coachObjectId = typeof app.coachId === 'string' ? new mongoose.Types.ObjectId(app.coachId) : app.coachId;
        // Reject all other pending applications for this coach
        await Application.updateMany(
          {
            coachId: coachObjectId,
            _id: { $ne: app._id },
            status: 'pending'
          },
          { status: 'rejected' }
        );
        // Add coach to academy (if not already)
        await Academy.updateOne(
          { _id: app.academyId },
          { $addToSet: { coaches: coachObjectId } }
        );
        // Update coach's academy field
        await Coach.updateOne(
          { _id: coachObjectId },
          { academy: app.academyId }
        );
      } else if (status === 'rejected') {
        // Ensure coachId is an ObjectId for MongoDB queries
        const mongoose = require('mongoose');
        const coachObjectId = typeof app.coachId === 'string' ? new mongoose.Types.ObjectId(app.coachId) : app.coachId;
        // Optionally, remove coach from academy if rejected
        await Academy.updateOne(
          { _id: app.academyId },
          { $pull: { coaches: coachObjectId } }
        );
        await Coach.updateOne(
          { _id: coachObjectId, academy: app.academyId },
          { $unset: { academy: '' } }
        );
      }
      return res.status(200).json(app);
    } catch (err) {
      return res.status(500).json({ error: 'Failed to update application.' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed.' });
}
