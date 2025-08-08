'use client';

import Link from 'next/link';
import { useContext } from 'react';
import { ReservationContext } from '@/components/reservationProvider';
import { Flex, Spinner } from '@chakra-ui/react';

export default function Home() {
  const reservation = useContext(ReservationContext);

  function ClickAction() {
    return (
      <div>
        {reservation.info ? (
          <Link href="/confirmation">Check Reservation</Link>
        ) : (
          <Link href="/reservation">Make a reservation</Link>
        )}
      </div>
    );
  }
  
  return (
    <Flex className='hi' direction='column' alignItems='center' justifyContent='space-between' h='100%'>
      <h1>WELCOME</h1>
      {reservation.isLoading ? <Spinner /> : <ClickAction />}
    </Flex>
  );
}
