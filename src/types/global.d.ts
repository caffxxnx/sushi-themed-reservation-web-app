import { UseFormRegisterReturn, FieldErrors } from 'react-hook-form';
import { Field as ChakraField, RadioCard } from '@chakra-ui/react';

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

export type globalSettingVariableType = {
  RESERVATION_AVAILABLE_DAYS: number;
  SERVICE_START_TIME: string;
  SERVICE_END_TIME: string;
  INTERVAL_MINUTES: number;
  NUM_PER_INTERVAL: number;
  LATEST_AVAILABLE_HOUR: 'next-day' | IntRange<1, 24>;
};

export type optionType = {
  label: string;
  value: string | number;
  disabled?: boolean;
};

// ==============================

export interface NativeSelectContainerProps {
  placeholder: string;
  register: UseFormRegisterReturn<TFieldName>;
  remoteUrl?: string;
  options: Array<optionType> | null;
  className?: string;
  width?: string;

  disabled?: boolean;

  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
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
  options: Array<optionType> | null;
}
