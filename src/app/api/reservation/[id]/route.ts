import _ from 'lodash';
import { NextRequest } from 'next/server';
import { delaySimulator } from '@/util';
import DB from '@/util/dbAdaptor';

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

  const db = await DB.readReservationDb();
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

// CANCEL
export async function DELETE(
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

  const db = await DB.readReservationDb();
  const reservations = JSON.parse(db).reservations;
  const targetIndex = _.findIndex(reservations, ['reservationID', id]);

  if (targetIndex === -1) {
    return new Response(JSON.stringify({ error: 'Reservation not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  reservations.splice(targetIndex, 1);

  await DB.writeReservationDb(reservations);
  return new Response(null, { status: 204 });
}
