import { UseFormRegisterReturn, FieldErrors } from 'react-hook-form';
import {
  Field as ChakraField,
  RadioCard,
  NativeSelect as Select,
} from '@chakra-ui/react';

type Enumerate<
  Max extends number,
  IncrementalNumbers extends number[] = []
> = IncrementalNumbers['length'] extends Max
  ? IncrementalNumbers[number]
  : Enumerate<Max, [...IncrementalNumbers, IncrementalNumbers['length']]>;

type IntRange<Min extends number, Max extends number> =
  | Exclude<Enumerate<Max>, Enumerate<Min>>
  | Max;

// ==============================

export type GlobalSettingVariableType = {
  RESERVATION_AVAILABLE_DAYS: number;
  SERVICE_START_TIME: string;
  SERVICE_END_TIME: string;
  INTERVAL_MINUTES: number;
  NUM_PER_INTERVAL: number;
  LATEST_AVAILABLE_HOUR: 'next-day' | IntRange<1, 24>;
};

export type OptionType = {
  label: string;
  value: string | number;
  disabled?: boolean;
};

export type Reservation = {
  reservationID: string | null;
  reservationDateTime: number | null;
  Name: string | null;
  Phone: string | null;
  Number: number | null;
};

// ==============================

type FieldProp = 'name' | 'value' | 'onChange' | 'defaultValue';
export interface NativeSelectContainerProps
  extends Omit<Select.RootProps, FieldProp>,
    Pick<Select.FieldProps, FieldProp> {
  placeholder: string;
  register: UseFormRegisterReturn<TFieldName>;
  remoteUrl?: string;
  options: Array<OptionType> | null;
}

export interface FieldContainerProps
  extends Omit<ChakraField.RootProps, 'label'> {
  prop: string;
  errors: FieldErrors;
  label: string;
}

export interface RadioCardContainerProps extends RadioCard.RootProps {
  register: UseFormRegisterReturn<TFieldName>;
  remoteUrl?: string;
  options: Array<OptionType> | null;
}
