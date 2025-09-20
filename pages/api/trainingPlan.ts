import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../lib/dbConnect';
import TrainingPlan from '../../src/models/TrainingPlan';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  
  if (req.method === 'POST') {
    try {
      const data = req.body;
      // Defensive: Only allow expected fields and types
      console.log('Incoming training plan data:', data);
      if (!data.coach || !data.title || !data.sport || !data.level || !Array.isArray(data.exercises)) {
        console.log('Validation failed:', {
          coach: data.coach,
          title: data.title,
          sport: data.sport,
          level: data.level,
          exercises: data.exercises
        });
        return res.status(400).json({ error: 'Missing required fields', details: {
          coach: data.coach,
          title: data.title,
          sport: data.sport,
          level: data.level,
          exercises: data.exercises
        }});
      }
      const plan = await TrainingPlan.create({
        // athlete: data.athlete, // Remove athlete assignment
        coach: data.coach,
        title: data.title,
        description: data.description,
        sport: data.sport,
        level: data.level,
        exercises: Array.isArray(data.exercises) ? data.exercises : [],
        duration: data.duration,
        createdAt: data.createdAt,
        status: data.status
      });
      console.log(plan);
      return res.status(201).json({ success: true, plan });
    } catch (err) {
      console.error('TrainingPlan creation error:', err);
      return res.status(500).json({ error: 'Failed to create training plan', details: err?.message || err });
    }
  }
  
  if (req.method === 'GET') {
    try {
      const plans = await TrainingPlan.find({});
      return res.status(200).json({ success: true, plans });
    } catch (err) {
      return res.status(500).json({ error: 'Failed to fetch training plans' });
    }
  }
  
  if (req.method === 'PUT') {
    try {
      const data = req.body;
      if (!data._id) {
        return res.status(400).json({ error: 'Plan ID is required for update' });
      }
      
      const updatedPlan = await TrainingPlan.findByIdAndUpdate(
        data._id,
        {
          title: data.title,
          description: data.description,
          sport: data.sport,
          level: data.level,
          exercises: data.exercises,
          duration: data.duration,
        },
        { new: true }
      );
      
      if (!updatedPlan) {
        return res.status(404).json({ error: 'Training plan not found' });
      }
      
      return res.status(200).json({ success: true, plan: updatedPlan });
    } catch (err) {
      console.error('TrainingPlan update error:', err);
      return res.status(500).json({ error: 'Failed to update training plan', details: err?.message || err });
    }
  }
  
  if (req.method === 'DELETE') {
    try {
      const { _id } = req.body;
      if (!_id) {
        return res.status(400).json({ error: 'Plan ID is required for deletion' });
      }
      
      const deletedPlan = await TrainingPlan.findByIdAndDelete(_id);
      
      if (!deletedPlan) {
        return res.status(404).json({ error: 'Training plan not found' });
      }
      
      return res.status(200).json({ success: true, message: 'Training plan deleted successfully' });
    } catch (err) {
      console.error('TrainingPlan deletion error:', err);
      return res.status(500).json({ error: 'Failed to delete training plan', details: err?.message || err });
    }
  }
  
  return res.status(405).json({ error: 'Method not allowed' });
}
