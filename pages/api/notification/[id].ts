import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../src/lib/mongodb';
import Notification from '../../../src/models/Notification';

// GET /api/notification/[id] - Get notification by ID
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const { id } = req.query;

  if (method === 'GET') {
    try {
      await dbConnect();
      const notification = await Notification.findById(id);
      if (!notification) return res.status(404).json({ error: 'Notification not found' });
      res.status(200).json(notification);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  } else if (method === 'PUT') {
    // Update notification
    try {
      const data = req.body;
      await dbConnect();
      const updated = await Notification.findByIdAndUpdate(id, data, { new: true });
      res.status(200).json(updated);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  } else if (method === 'DELETE') {
    // Delete notification
    try {
      await dbConnect();
      await Notification.findByIdAndDelete(id);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
