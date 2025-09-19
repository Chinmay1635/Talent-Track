import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../src/lib/mongodb';
import Application from '../../../src/models/Application';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === 'POST') {
    // Coach applies to an academy
    const { coachId, academyId, message } = req.body;
    if (!coachId || !academyId) {
      return res.status(400).json({ error: 'coachId and academyId are required.' });
    }
    // Prevent duplicate applications
    const existing = await Application.findOne({ coachId, academyId }).exec();
    if (existing) {
      return res.status(409).json({ error: 'Application already exists.' });
    }
    const app = await new Application({ coachId, academyId, message }).save();
    return res.status(201).json(app);
  }

  if (req.method === 'GET') {
    const { academyId, coachId } = req.query;
    if (academyId) {
      // Get all applications for an academy
      const apps = await Application.find({ academyId })
        .populate('coachId', 'name email')
        .sort({ createdAt: -1 })
        .exec();
      return res.status(200).json(apps);
    }
    if (coachId) {
      // Get all applications submitted by a coach
      const apps = await (Application as any).find({ coachId })
        .populate('academyId', 'name')
        .sort({ createdAt: -1 })
        .exec();
      return res.status(200).json(apps);
    }
    return res.status(400).json({ error: 'academyId or coachId required.' });
  }

  return res.status(405).json({ error: 'Method not allowed.' });
}
