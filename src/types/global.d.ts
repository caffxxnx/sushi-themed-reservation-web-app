import { UseFormRegisterReturn, FieldErrors } from 'react-hook-form';

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

export interface FieldContainerProps {
  children: React.ReactNode;
  prop: string;
  errors: FieldErrors;
  label: string;
  className?: string;

  disabled?: boolean;
}

export interface RadioCardContainerProps {
  register: UseFormRegisterReturn<TFieldName>;
  remoteUrl?: string;
  options: Array<optionType> | null;
  className?: string;

  disabled?: boolean;
  disabledOptions?: [];

  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}
