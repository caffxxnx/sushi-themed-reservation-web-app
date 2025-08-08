import _ from 'lodash';
import fs from 'fs';
import { NextRequest } from 'next/server';
import { delaySimulator } from '@/util';

// GET
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;

  const db = await fs.promises.readFile('./db/data.json', 'utf-8');
  const reservations = JSON.parse(db).reservations;
  const target = _.find(reservations, ['reservationID', id]);

  await delaySimulator(2000);

  return new Response(JSON.stringify(target), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
