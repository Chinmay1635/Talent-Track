import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../src/lib/mongodb';
import Notification from '../../../src/models/Notification';

// GET /api/notification - List all notifications
// POST /api/notification - Create new notification
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  if (method === 'GET') {
    try {
      await dbConnect();
      const notifications = await Notification.find();
      res.status(200).json(notifications);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  } else if (method === 'POST') {
    // Create notification
    try {
      const data = req.body;
      await dbConnect();
      const created = await Notification.create(data);
      res.status(201).json(created);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
