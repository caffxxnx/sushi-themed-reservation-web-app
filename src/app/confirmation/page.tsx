'use client';

import moment from 'moment';

import { Flex, Button, Grid, GridItem, Box } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { ReservationContext } from '@/components/reservationProvider';

export default function Reservation() {
  const router = useRouter();
  const reservation = useContext(ReservationContext);

  const reservationInfo = reservation.info || {
    reservationID: '',
    reservationDateTime: null,
    name: '',
    phone: '',
    number: null,
  };

  function onClick() {
    router.push('/');
  }

  return (
    <>
      <Flex gap="20px" direction="column" alignItems="center">
        <h1>Your reservation has completed</h1>

        <Grid templateColumns="100px 1fr" gap="4">
          <GridItem>
            <Box>Reservation</Box>
          </GridItem>
          <GridItem>
            <Box>
              {reservationInfo.reservationDateTime
                ? moment(reservationInfo.reservationDateTime).format('YYYY-MM-DD HH:mm')
                : ''}
            </Box>
          </GridItem>

          <GridItem>
            <Box>Name</Box>
          </GridItem>
          <GridItem>
            <Box>{reservationInfo.name}</Box>
          </GridItem>

          <GridItem>
            <Box>Phone</Box>
          </GridItem>
          <GridItem>
            <Box>{reservationInfo.phone}</Box>
          </GridItem>

          <GridItem colSpan={2}>
            <Box textAlign="center" fontWeight="500" fontSize="50px">
              {reservationInfo.number
                ? reservationInfo.number.toString().padStart(3, '0')
                : '--'}
            </Box>
          </GridItem>
        </Grid>

        <Button colorPalette="blue" onClick={onClick}>
          Back to top
        </Button>
      </Flex>
    </>
  );
}
