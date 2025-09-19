import dbConnect from '../../lib/dbConnect';
import Coach from '../../src/models/Coach';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    const { academyId } = req.query;
    if (!academyId) {
      return res.status(400).json({ error: 'academyId is required' });
    }
    try {
      const coaches = await Coach.find({ academy: academyId });
      return res.status(200).json(coaches);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch coaches' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
