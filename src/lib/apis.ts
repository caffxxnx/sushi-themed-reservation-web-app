import type { reservation } from '@/types/global';

export function getReservation(): reservation {
  console.log('CALL API');
  return {
    reservationID: 'asdfasdf',
    reservationDateTime: 1726222425007,
    Name: 'Caffxxmx',
    Phone: '070070070',
    Number: 1,
  };
}
