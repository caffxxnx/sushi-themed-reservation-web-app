import fs from 'fs';
import { Reservation } from '@/types/global';
import { getReservationCount } from '@/util';
import { v4 as uuidv4 } from 'uuid';

// ADD
export async function POST(request: Request) {
  if (!request) {
    return new Response(
      JSON.stringify({ error: 'data is required' }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      }
    );
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
    };

    const db = await fs.promises.readFile('./db/data.json', 'utf-8');
    const reservations = JSON.parse(db).reservations;
    reservations.push(newReservation);

    await fs.promises.writeFile(
      './db/data.json',
      JSON.stringify({ reservations }),
      'utf8'
    );

    return new Response(JSON.stringify(newReservation), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e) {
    console.log(e);
  }
}
