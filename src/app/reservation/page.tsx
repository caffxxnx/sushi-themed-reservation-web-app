'use client';

import moment from 'moment';

import NativeSelectContainer from '@/components/native-select-container';
import RadioCardContainer from '@/components/radio-card-container';
import FieldContainer from '@/components/field-container';

import { Flex, Button, ButtonGroup, Input, Box } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { useContext } from 'react';
import { ReservationContext } from '@/components/reservationProvider';
import { z } from 'zod';
import useSWRMutation from 'swr/mutation';

const formSchema = z.object({
  date: z.string().min(1, { message: 'Date is required' }),
  time: z.string({ message: 'Time is required' }),
  name: z.string().nonempty({ message: 'Name is required' }),
  phone: z.string().nonempty({ message: 'Phone is required' }),
});

type FormValues = z.infer<typeof formSchema>;

export default function Reservation() {
  const router = useRouter();
  const reservation = useContext(ReservationContext);

  function submitReservation(url: string | URL | Request) {
    const DATE_TIME_TEXT = `${getValues('date')} ${getValues('time')}`;

    return fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        reservationDateTime: +moment(DATE_TIME_TEXT).format('x'),
        name: getValues('name'),
        phone: getValues('phone'),
      }),
    });
  }

  const { trigger: apiTrigger, isMutating: apiIsLoading } = useSWRMutation(
    '/api/reservation',
    submitReservation
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    getValues,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = handleSubmit(
    async (data) => {
      console.log(data);
      try {
        const resp = await apiTrigger();
        const respData = await resp.json();

        window.localStorage.setItem('reservation-id', respData.reservationID);
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

  const onDateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log('Selected date:', e.target.value);
  };

  const formDate = watch('date');
  const formTime = watch('time');

  return (
    <>
      <Box w="100%" maxW="450px">
        <form onSubmit={onSubmit}>
          <Flex gap="20px" direction="column" alignItems="center">
            <FieldContainer label="Date" prop="date" errors={errors}>
              <NativeSelectContainer
                register={register('date')}
                placeholder="Select a date"
                remoteUrl="/api/getAvailableDate"
                onChange={onDateChange}
              />
            </FieldContainer>

            {formDate && (
              <FieldContainer label="Time" prop="time" errors={errors}>
                <RadioCardContainer
                  register={register('time')}
                  align="center"
                  remoteUrl={`/api/getAvailableTimeByDate?date=${formDate}`}
                />
              </FieldContainer>
            )}

            {formTime && (
              <>
                <FieldContainer label="Name" prop="name" errors={errors}>
                  <Input placeholder="Yamada Mahito" {...register('name')} />
                </FieldContainer>

                <FieldContainer label="Phone" prop="phone" errors={errors}>
                  <Input placeholder="07012345678" {...register('phone')} />
                </FieldContainer>
              </>
            )}

            <ButtonGroup size="sm" variant="outline" mt="4" gap="6">
              <Button onClick={onBack}>Back</Button>
              <Button colorPalette="blue" type="submit" loading={apiIsLoading}>
                Next
              </Button>
            </ButtonGroup>
          </Flex>
        </form>
      </Box>
    </>
  );
}
