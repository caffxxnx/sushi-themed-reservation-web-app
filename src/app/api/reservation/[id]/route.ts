import _ from 'lodash';
import fs from 'fs';
import { NextRequest } from 'next/server';
import { delaySimulator } from '@/util';

// GET
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!params) {
    return new Response(JSON.stringify({ error: 'ID parameter is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const id = (await params).id;

  const db = await fs.promises.readFile('./db/data.json', 'utf-8');
  const reservations = JSON.parse(db).reservations;
  const target = _.find(reservations, ['reservationID', id]);

  if (!target) {
    return new Response(JSON.stringify({ error: 'Reservation not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  await delaySimulator(2000);

  return new Response(JSON.stringify(target), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
