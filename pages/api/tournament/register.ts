import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/dbConnect';
import Tournament from '../../../src/models/Tournament';
import Athlete from '../../../src/models/Athlete';

// Registration model (create if not exists)
import Registration from '../../../src/models/Registration';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const { tournamentId, athleteId, contact, additionalInfo } = req.body;
  if (!tournamentId || !athleteId || !contact) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  try {
    // Check if tournament exists
    const tournament = await Tournament.findById(tournamentId);
    if (!tournament) {
      return res.status(404).json({ error: 'Tournament not found' });
    }
    // Check participant limit
    if (tournament.currentParticipants >= tournament.maxParticipants) {
      return res.status(409).json({ error: 'Tournament is full' });
    }
    // Check if already registered
  const existing = await Registration.findOne({ tournamentId, athleteId }).exec();
    if (existing) {
      return res.status(409).json({ error: 'Already registered' });
    }
    // Create registration and update participant count atomically
    const session = await Registration.startSession();
    session.startTransaction();
    try {
      const registration = await Registration.create({
        tournamentId,
        athleteId,
        contact,
        additionalInfo
      }, { session });
      await Tournament.findByIdAndUpdate(
        tournamentId,
        { $inc: { currentParticipants: 1 } },
        { session }
      );
      await session.commitTransaction();
      session.endSession();
      return res.status(201).json({ success: true, registration });
    } catch (err) {
      await session.abortTransaction();
      session.endSession();
      return res.status(500).json({ error: 'Registration failed' });
    }
  } catch (err) {
    return res.status(500).json({ error: 'Server error' });
  }
}
