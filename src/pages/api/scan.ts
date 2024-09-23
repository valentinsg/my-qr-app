import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/mongodb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const client = await clientPromise;
    const db = client.db('busy');

    const { qrId, userAgent, timestamp, location } = req.body;

    if (!qrId || !timestamp) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Inserta el registro del escaneo en la colección "scans"
    const result = await db.collection('scans').insertOne({
      qrId,
      userAgent: userAgent || req.headers['user-agent'], // Si no se proporciona, lo obtenemos de la cabecera.
      timestamp: timestamp || new Date(),
      location: location || 'Unknown', // O puedes usar la geolocalización si lo implementas
    });

    res.status(201).json({ message: 'Scan registered successfully', scanId: result.insertedId });
  } catch (error) {
    console.error('Error saving scan:', error);
    res.status(500).json({ error: 'Unable to save scan' });
  }
}
