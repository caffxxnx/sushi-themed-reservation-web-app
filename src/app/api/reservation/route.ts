import type { Reservation } from '@/types/global';
import moment from 'moment';
import { getReservationCount } from '@/util';
import { v4 as uuidv4 } from 'uuid';
import DB from '@/util/dbAdaptor';

// ADD
export async function POST(request: Request) {
  if (!request) {
    return new Response(JSON.stringify({ error: 'data is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const body = await request.json();
    const { reservationDateTime, name, phone } = body;

    const newReservation: Reservation = {
      reservationID: uuidv4(),
      reservationDateTime,
      name,
      phone,
      number: await getReservationCount(reservationDateTime),
      createDateTime: +moment().format('x'),
      updateDateTime: null
    };

    const db = await DB.readReservationDb();
    const reservations = JSON.parse(db).reservations;
    reservations.push(newReservation);

    await DB.writeReservationDb(reservations);

    return new Response(JSON.stringify(newReservation), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e) {
    console.log(e);
  }
}
