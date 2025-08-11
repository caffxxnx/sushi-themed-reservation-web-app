'use client';

import type { Reservation } from '@/types/global';

import Link from 'next/link';
import { useContext } from 'react';
import { ReservationContext } from '@/components/reservationProvider';
import { Box, Button, SimpleGrid, Spinner, Text } from '@chakra-ui/react';
import BackgroundCanvas from '@/components/home/background-canvas';

function ClickAction({ info }: { info: Reservation | null }) {
  return (
    <Button asChild bg="brand.400" _hover={{ bg: 'brand.500' }}>
      {info ? (
        <Link href="/confirmation">Check Reservation</Link>
      ) : (
        <Link href="/reservation">Make a reservation</Link>
      )}
    </Button>
  );
}

function IconAttribution() {
  return (
    <Text textStyle="xs" position="absolute" right="0" bottom="0" mb="4" mr="4">
      <a href="https://www.flaticon.com/free-icons/sushi" title="sushi icons">
        Sushi icons created by Freepik - Flaticon
      </a>
    </Text>
  );
}

export default function Home() {
  const reservation = useContext(ReservationContext);
  return (
    <>
      <BackgroundCanvas />
      <SimpleGrid
        columns={1}
        alignItems="center"
        justifyItems="center"
        h="100%"
      >
        <Text
          as="h1"
          textTransform="capitalize"
          fontSize="4xl"
          color="brand.400"
          fontWeight="bold"
          textAlign="center"
        >
          welcom to{' '}
          <Text as="span" hideFrom="md">
            <br />
          </Text>{' '}
          sushi bar
        </Text>

        <Box height="40px">
          {reservation.isLoading ? (
            <Spinner />
          ) : (
            <ClickAction info={reservation.info} />
          )}
        </Box>
      </SimpleGrid>

      <IconAttribution />
    </>
  );
}
