import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../src/lib/mongodb';
import Athlete from '../../../src/models/Athlete';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const { id } = req.query;
  await dbConnect();

  if (method === 'GET') {
    try {
      const athlete = await Athlete.findById(id)
        .populate('user')
        .populate('academy')
        .populate('coach')
        .populate('badges')
        .populate('trainingPlans')
        .populate('registrations');
      if (!athlete) return res.status(404).json({ error: 'Athlete not found' });
      res.status(200).json(athlete);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  } else if (method === 'PUT') {
    try {
      let data = req.body;
      // Convert string IDs to ObjectIds if present
      if (data.userId) {
        data.user = data.userId;
        delete data.userId;
      }
      if (data.academyId) {
        data.academy = data.academyId;
        delete data.academyId;
      }
      if (data.coachId) {
        data.coach = data.coachId;
        delete data.coachId;
      }
      
      // Ensure disability fields are properly formatted
      if (data.accommodationsNeeded && typeof data.accommodationsNeeded === 'string') {
        data.accommodationsNeeded = data.accommodationsNeeded.split(',').map((item: string) => item.trim()).filter((item: string) => item.length > 0);
      }
      
      // Explicitly handle disability fields to prevent them from being overwritten
      const updateFields: any = {
        name: data.name,
        age: data.age,
        sport: data.sport,
        region: data.region,
        level: data.level,
        bio: data.bio,
        contactEmail: data.contactEmail,
        isDisabled: data.isDisabled === true || data.isDisabled === 'true',
        disabilityType: data.disabilityType || '',
        disabilityDescription: data.disabilityDescription || '',
        accommodationsNeeded: data.accommodationsNeeded || [],
        medicalCertification: data.medicalCertification || ''
      };
      
      console.log('Processed data before update:', updateFields);
      
      const updated = await Athlete.findByIdAndUpdate(
        id, 
        { $set: updateFields }, 
        { 
          new: true,
          runValidators: true,
          strict: false // Allow updates to fields not in schema
        }
      );
      
      console.log('Update result:', {
        id: updated._id,
        name: updated.name,
        isDisabled: updated.isDisabled,
        disabilityType: updated.disabilityType,
        disabilityDescription: updated.disabilityDescription,
        accommodationsNeeded: updated.accommodationsNeeded,
        medicalCertification: updated.medicalCertification
      });
      
      res.status(200).json(updated);
    } catch (error) {
      console.error('Update error:', error);
      res.status(500).json({ error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' });
    }
  } else if (method === 'DELETE') {
    try {
      await Athlete.findByIdAndDelete(id);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
