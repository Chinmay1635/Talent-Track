import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/dbConnect';
import PrecautionVideo from '../../../src/models/PrecautionVideo';
import Coach from '../../../src/models/Coach';
import jwt from 'jsonwebtoken';
import User from '../../../src/models/User';
import * as cookie from 'cookie';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query } = req;
  const { id } = query;

  await dbConnect();

  // Authentication middleware - use cookies like /api/auth/me
  const cookies = req.headers.cookie ? cookie.parse(req.headers.cookie) : {};
  const token = cookies.token;
  if (!token) {
    return res.status(401).json({ success: false, error: 'No token provided' });
  }

  let user;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
    user = await User.findById(decoded.id); // Note: using 'id' to match /api/auth/me
    if (!user) {
      return res.status(401).json({ success: false, error: 'User not found' });
    }
  } catch (error) {
    return res.status(401).json({ success: false, error: 'Invalid token' });
  }

  switch (method) {
    case 'GET':
      try {
        const video = await PrecautionVideo.findById(id).populate('coach', 'name');
        if (!video) {
          return res.status(404).json({ success: false, error: 'Video not found' });
        }
        res.status(200).json({ success: true, data: video });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    case 'DELETE':
      try {
        // Only coaches can delete their own videos
        if (user.role !== 'coach') {
          return res.status(403).json({ success: false, error: 'Only coaches can delete videos' });
        }

        const coach = await Coach.findOne({ user: user._id });
        if (!coach) {
          return res.status(404).json({ success: false, error: 'Coach not found' });
        }

        const video = await PrecautionVideo.findById(id);
        if (!video) {
          return res.status(404).json({ success: false, error: 'Video not found' });
        }

        // Check if the video belongs to the current coach
        if (video.coach.toString() !== coach._id.toString()) {
          return res.status(403).json({ success: false, error: 'You can only delete your own videos' });
        }

        await PrecautionVideo.findByIdAndDelete(id);
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    case 'PUT':
      try {
        // Only coaches can update their own videos
        if (user.role !== 'coach') {
          return res.status(403).json({ success: false, error: 'Only coaches can update videos' });
        }

        const coach = await Coach.findOne({ user: user._id });
        if (!coach) {
          return res.status(404).json({ success: false, error: 'Coach not found' });
        }

        const video = await PrecautionVideo.findById(id);
        if (!video) {
          return res.status(404).json({ success: false, error: 'Video not found' });
        }

        // Check if the video belongs to the current coach
        if (video.coach.toString() !== coach._id.toString()) {
          return res.status(403).json({ success: false, error: 'You can only update your own videos' });
        }

        const { title, description } = req.body;
        
        const updatedVideo = await PrecautionVideo.findByIdAndUpdate(
          id,
          { title, description, updatedAt: new Date() },
          { new: true }
        ).populate('coach', 'name');

        res.status(200).json({ success: true, data: updatedVideo });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    default:
      res.status(400).json({ success: false, error: 'Method not allowed' });
      break;
  }
}