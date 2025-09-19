// This file is not used since exercises are embedded in TrainingPlan model
import type { NextApiRequest, NextApiResponse } from 'next';

// Simple placeholder to prevent build errors
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(404).json({ error: 'Exercises are managed within training plans' });
}
