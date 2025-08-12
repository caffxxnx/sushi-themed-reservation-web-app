import { useContext } from 'react';
import { ReservationContext } from '@/components/ReservationProvider';
import NativeSelectContainer from '@/components/NativeSelectContainer';
import RadioCardContainer from '@/components/RadioCardContainer';
import FieldContainer from '@/components/FieldContainer';

import { Flex, Input } from '@chakra-ui/react';
import type {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';

import type { FormValues } from '@/components/reservation/formSchema';

export default function ReservationForm({
  errors,
  register,
  setValue,
  watch,
}: {
  errors: FieldErrors<FormValues>;
  register: UseFormRegister<FormValues>;
  setValue: UseFormSetValue<FormValues>;
  watch: UseFormWatch<FormValues>;
}) {
  const reservation = useContext(ReservationContext);
  const { info } = reservation;

  const onDateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue('time', ''); // Reset time when date changes
    console.log('Selected date:', e.target.value);
  };

  const formDate = watch('date');
  const formTime = watch('time');

  return (
    <Flex w="100%" gap="20px" direction="column" alignItems="center">
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
            remoteUrl={
              info?.reservationID
                ? `/api/getAvailableTimeByDate?date=${formDate}&id=${info.reservationID}`
                : `/api/getAvailableTimeByDate?date=${formDate}`
            }
            value={watch('time')}
          />
        </FieldContainer>
      )}

      {formTime && (
        <>
          <FieldContainer label="Name" prop="name" errors={errors}>
            <Input
              placeholder="Yamada Mahito"
              {...register('name')}
              bg="brand.300"
            />
          </FieldContainer>

          <FieldContainer label="Phone" prop="phone" errors={errors}>
            <Input
              placeholder="07012345678"
              {...register('phone')}
              bg="brand.300"
            />
          </FieldContainer>
        </>
      )}
    </Flex>
  );
}
