import type { Reservation } from '@/types/global';

import _ from 'lodash';
import moment from 'moment';
import { NextRequest } from 'next/server';
import { delaySimulator, getReservationCount } from '@/util';
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

// EDIT
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!params) {
    return new Response(JSON.stringify({ error: 'ID parameter is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  if (!request) {
    return new Response(JSON.stringify({ error: 'data is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
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
    console.log('Editing reservation with ID:', id);
    const target = reservations[targetIndex];
    const body = await request.json();
    const { reservationDateTime, name, phone } = body;

    const editedReservation: Reservation = {
      reservationID: id,
      reservationDateTime: reservationDateTime,
      name,
      phone,
      number: await getReservationCount(reservationDateTime, id),
      createDateTime: target.createDateTime,
      updateDateTime: +moment().format('x'),
    };
    reservations.splice(targetIndex, 1, editedReservation);

    await DB.writeReservationDb(reservations);

    return new Response(JSON.stringify(editedReservation), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e) {
    console.log(e);
  }
}
