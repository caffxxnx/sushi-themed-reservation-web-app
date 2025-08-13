'use client';

import type { FormValues } from '@/components/reservation/formSchema';

import moment from 'moment';

import ReservationForm from '@/components/reservation/ReservationForm';
import { formSchema } from '@/components/reservation/formSchema';
import { Flex, Button, ButtonGroup, Box, Spinner } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useContext, useEffect } from 'react';
import { ReservationContext } from '@/components/ReservationProvider';
import useSWRMutation from 'swr/mutation';

export default function Reservation() {
  const router = useRouter();
  const reservation = useContext(ReservationContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    getValues,
    setValue,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    if (reservation.info) {
      setValue(
        'date',
        moment(reservation.info.reservationDateTime).format('YYYY-MM-DD')
      );
      setValue(
        'time',
        moment(reservation.info.reservationDateTime).format('HH:mm')
      );
      setValue('name', reservation.info.name ?? '');
      setValue('phone', reservation.info.phone ?? '');
      setValue('guests', String(reservation.info.guests ?? 0));
    }
  }, [reservation.info, setValue]);

  function submitReservation(url: string | URL | Request) {
    const DATE_TIME_TEXT = `${getValues('date')} ${getValues('time')}`;

    return fetch(url, {
      method: 'PUT',
      body: JSON.stringify({
        reservationDateTime: +moment(DATE_TIME_TEXT).format('x'),
        name: getValues('name'),
        phone: getValues('phone'),
        guests: getValues('guests'),
      }),
    });
  }

  const { trigger: apiTrigger, isMutating: apiIsLoading } = useSWRMutation(
    `/api/reservation/${reservation.info?.reservationID || ''}`,
    submitReservation
  );

  const onSubmit = handleSubmit(
    async (data) => {
      console.log(data);
      try {
        const resp = await apiTrigger();
        const respData = await resp.json();

        reservation.setup(respData);
        router.push('/confirmation');
      } catch (e) {
        console.log(e);
      }
    },
    (error) => {
      console.error('Form submission error:', error);
    }
  );

  const onBack = () => router.back();

  return (
    <>
      <Box w="100%" h="100%" maxW="450px">
        {reservation.isLoading ? (
          <Spinner m="auto" display="block" />
        ) : (
          <form style={{ height: '100%' }} onSubmit={onSubmit}>
            <Flex
              gap="20px"
              h="100%"
              direction="column"
              alignItems="center"
              justifyContent="space-between"
            >
              <ReservationForm
                errors={errors}
                register={register}
                setValue={setValue}
                watch={watch}
              />
              <ButtonGroup size="sm" variant="outline" mt="4" gap="6">
                <Button
                  onClick={onBack}
                  _hover={{ bg: 'brand.500', color: 'brand.300' }}
                >
                  Back
                </Button>
                <Button
                  bg="brand.400"
                  color="brand.300"
                  _hover={{ bg: 'brand.500' }}
                  type="submit"
                  loading={apiIsLoading}
                >
                  Next
                </Button>
              </ButtonGroup>
            </Flex>
          </form>
        )}
      </Box>
    </>
  );
}
