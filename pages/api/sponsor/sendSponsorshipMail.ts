import type { NextApiRequest, NextApiResponse } from 'next';
import { google } from 'googleapis';

const oAuth2Client = new google.auth.OAuth2(
  process.env.GMAIL_CLIENT_ID,
  process.env.GMAIL_CLIENT_SECRET,
  process.env.GMAIL_REDIRECT_URI
);

// Set your refresh token
oAuth2Client.setCredentials({ refresh_token: process.env.GMAIL_REFRESH_TOKEN });

const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });

function makeBody(to: string, from: string, subject: string, message: string) {
  const str = [
    `Content-Type: text/plain; charset=\"UTF-8\"\n`,
    `MIME-Version: 1.0\n`,
    `Content-Transfer-Encoding: 7bit\n`,
    `to: ${to}\n`,
    `from: ${from}\n`,
    `subject: ${subject}\n\n`,
    message,
  ].join('');
  return Buffer.from(str).toString('base64').replace(/\+/g, '-').replace(/\//g, '_');
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { athleteEmail, sponsorName } = req.body;

  if (!athleteEmail || !sponsorName) {
    return res.status(400).json({ error: 'Missing athleteEmail or sponsorName' });
  }

  const raw = makeBody(
    athleteEmail,
    process.env.EMAIL_USER,
  `Congratulations! You have been sponsored by ${sponsorName}.`,
  `🌟 Congratulations On your Spnsership! 🌟

We've been incredibly impressed with your dedication and performance! Your hard work is paying off, and we're excited to support you on your journey to greatness.

Keep pushing your limits and chasing your dreams! Remember, every champion was once a contender who refused to give up. We believe in you and can't wait to see what you'll achieve next!

Let's make this season your best one yet! 🏆💪

With excitement for your future,
The Sponsership Team`
  );

  try {
    await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw,
      },
    });
    res.status(200).json({ message: 'Sponsorship mail sent successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send sponsorship mail' });
  }
}
