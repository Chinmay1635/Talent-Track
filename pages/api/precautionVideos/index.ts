import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/dbConnect';
import PrecautionVideo from '../../../src/models/PrecautionVideo';
import Coach from '../../../src/models/Coach';
import jwt from 'jsonwebtoken';
import User from '../../../src/models/User';
import * as cookie from 'cookie';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

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
        const { coachId } = req.query;
        
        let query = {};
        if (coachId) {
          // If coachId is provided, filter by specific coach
          query = { coach: coachId };
        } else if (user.role === 'coach') {
          // If current user is a coach and no coachId specified, get their videos
          const coach = await Coach.findOne({ user: user._id });
          if (!coach) {
            return res.status(404).json({ success: false, error: 'Coach not found' });
          }
          query = { coach: coach._id };
        }
        // If no coachId and user is not coach (e.g., athlete), return all videos

        const videos = await PrecautionVideo.find(query)
          .populate('coach', 'name')
          .sort({ createdAt: -1 });

        res.status(200).json({ success: true, data: videos });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    case 'POST':
      try {
        // Only coaches can create videos
        if (user.role !== 'coach') {
          return res.status(403).json({ success: false, error: 'Only coaches can add videos' });
        }

        const coach = await Coach.findOne({ user: user._id });
        if (!coach) {
          return res.status(404).json({ success: false, error: 'Coach not found' });
        }

        const { title, videoId, videoUrl, description } = req.body;

        if (!title || !videoId || !videoUrl) {
          return res.status(400).json({ 
            success: false, 
            error: 'Title, videoId, and videoUrl are required' 
          });
        }

        const video = await PrecautionVideo.create({
          coach: coach._id,
          title,
          videoId,
          videoUrl,
          description
        });

        const populatedVideo = await PrecautionVideo.findById(video._id)
          .populate('coach', 'name');

        res.status(201).json({ success: true, data: populatedVideo });
      } catch (error) {
        if (error.code === 11000) {
          res.status(400).json({ 
            success: false, 
            error: 'This video has already been added by you' 
          });
        } else {
          res.status(400).json({ success: false, error: error.message });
        }
      }
      break;

    default:
      res.status(400).json({ success: false, error: 'Method not allowed' });
      break;
  }
}