'use client';

import moment from 'moment';

import { Flex, Button, Grid, GridItem, Box, Text } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { ReservationContext } from '@/components/ReservationProvider';
import type { Reservation } from '@/types/global';
import { Spinner } from '@chakra-ui/react';

function ConfirmationInfo(reservationInfo: Reservation) {
  return (
    <>
      <Text fontSize="xl" fontWeight="bold">
        Your reservation has completed
      </Text>
      <Grid templateColumns="100px 1fr" gap="4">
        <GridItem>
          <Box>Reservation</Box>
        </GridItem>
        <GridItem>
          <Box>
            {reservationInfo.reservationDateTime
              ? moment(reservationInfo.reservationDateTime).format(
                  'YYYY-MM-DD HH:mm'
                )
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
    </>
  );
}

export default function Confirmation() {
  const router = useRouter();
  const reservation = useContext(ReservationContext);

  const reservationInfo = reservation.info || {
    reservationID: '',
    reservationDateTime: null,
    name: '',
    phone: '',
    number: null,
    createDateTime: null,
    updateDateTime: null,
  };

  function onClick() {
    router.push('/');
  }

  return (
    <Flex
      gap="20px"
      h="100%"
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Flex gap="20px" direction="column" alignItems="center">
        {reservation.isLoading ? (
          <Spinner />
        ) : (
          ConfirmationInfo(reservationInfo)
        )}
        <Button
          bg="brand.400"
          color="brand.300"
          _hover={{ bg: 'brand.500' }}
          onClick={onClick}
        >
          Back to top
        </Button>
      </Flex>
    </Flex>
  );
}
