'use client';

import moment from 'moment';

import {
  Flex,
  Button,
  ButtonGroup,
  Grid,
  GridItem,
  Box,
  Text,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { ReservationContext } from '@/components/ReservationProvider';
import type { Reservation } from '@/types/global';
import { Spinner } from '@chakra-ui/react';
import useSWRMutation from 'swr/mutation';

function ConfirmationInfo({
  reservationInfo,
}: {
  reservationInfo: Reservation;
}) {
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

        <GridItem>
          <Box>Guests</Box>
        </GridItem>
        <GridItem>
          <Box>{reservationInfo.guests}</Box>
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
    guests: null,
    createDateTime: null,
    updateDateTime: null,
  };

  function onBackToTop() {
    router.push('/');
  }

  function onEdit(id: string | null) {
    if (!id) return;
    router.push('/reservation/edit');
  }

  async function onCancel() {
    if (!reservationInfo.reservationID) {
      return;
    }

    try {
      const isConfirmed = window.confirm(
        `Are you sure you want to cancel the reservation for ${reservationInfo.name}?`
      );

      if (isConfirmed) {
        await apiTrigger();
        window.localStorage.removeItem('reservation-id');
        reservation.clear();
        onBackToTop();
      } else return;
    } catch (e) {
      console.log(e);
    }
  }

  function cancelReservation(url: string | URL | Request) {
    return fetch(url, { method: 'DELETE' });
  }

  const { trigger: apiTrigger, isMutating: apiIsLoading } = useSWRMutation(
    `/api/reservation/${reservationInfo.reservationID}`,
    cancelReservation
  );

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
          <>
            <ConfirmationInfo reservationInfo={reservationInfo} />
            <ButtonGroup size="sm" variant="outline" mt="4" gap="6">
              <Button
                bg="brand.600"
                color="brand.300"
                _hover={{ bg: 'brand.500' }}
                loading={apiIsLoading}
                onClick={onCancel}
              >
                Cancel
              </Button>
              <Button
                bg="brand.400"
                color="brand.300"
                _hover={{ bg: 'brand.500' }}
                loading={apiIsLoading}
                onClick={() => onEdit(reservationInfo.reservationID)}
              >
                Edit
              </Button>
            </ButtonGroup>
          </>
        )}

        <Button
          variant="outline"
          _hover={{ bg: 'brand.500', color: 'brand.300' }}
          onClick={onBackToTop}
        >
          Back to top
        </Button>
      </Flex>
    </Flex>
  );
}
