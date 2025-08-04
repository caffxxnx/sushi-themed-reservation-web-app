'use client';

import NativeSelectContainer from '@/components/native-select-container';
import RadioCardContainer from '@/components/radio-card-container';
import FieldContainer from '@/components/field-container';

import { Flex, Button, ButtonGroup, Input, Box } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const FAKE_DATE_OPTIONS = [
  { label: '2025/08/04', value: '2025/08/04' },
  { label: '2025/08/05', value: '2025/08/05' },
  { label: '2025/08/06', value: '2025/08/06' },
  { label: '2025/08/07', value: '2025/08/07' },
];

const FAKE_TIME_OPTIONS = [
  { label: '10:00', value: '10:00' },
  { label: '11:00', value: '11:00', disabled: true },
  { label: '12:00', value: '12:00' },
  { label: '13:00', value: '13:00' },
  { label: '14:00', value: '14:00' },
  { label: '15:00', value: '15:00' },
  { label: '16:00', value: '16:00' },
  { label: '17:00', value: '17:00' },
];

const formSchema = z.object({
  date: z.string().min(1, { message: 'Date is required' }),
  time: z.string({ message: 'Time is required' }),
  name: z.string().nonempty({ message: 'Name is required' }),
  phone: z.string().nonempty({ message: 'Phone is required' }),
});

type FormValues = z.infer<typeof formSchema>;

export default function Reservation() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = handleSubmit(
    (data) => console.log(data),
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
                options={FAKE_DATE_OPTIONS}
                placeholder="Select a date"
                onChange={onDateChange}
              />
            </FieldContainer>

            {formDate && (
              <FieldContainer label="Time" prop="time" errors={errors}>
                <RadioCardContainer
                  register={register('time')}
                  options={FAKE_TIME_OPTIONS}
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
              <Button colorPalette="blue" type="submit">
                Next
              </Button>
            </ButtonGroup>
          </Flex>
        </form>
      </Box>
    </>
  );
}
