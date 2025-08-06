'use client';

import Link from 'next/link';
import { useContext } from 'react';
import { ReservationContext } from '@/components/reservationProvider';

export default function Home() {
  const reservation = useContext(ReservationContext);

  return (
    <>
      <h1>WELCOME</h1>
      <div>
        {reservation.info ? (
          <Link href="/confirmation">Check Reservation</Link>
        ) : (
          <Link href="/reservation">Make a reservation</Link>
        )}
      </div>
    </>
  );
}
