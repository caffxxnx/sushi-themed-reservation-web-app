import { UseFormRegisterReturn, FieldErrors } from 'react-hook-form';
import {
  Field as ChakraField,
  RadioCard,
  NativeSelect as Select,
} from '@chakra-ui/react';

// ==============================

export type GlobalSettingVariableType = {
  RESERVATION_AVAILABLE_DAYS: number;
  SERVICE_START_TIME: string;
  SERVICE_END_TIME: string;
  INTERVAL_MINUTES: number;
  NUM_PER_INTERVAL: number;
};

export type OptionType = {
  label: string;
  value: string | number;
  disabled?: boolean;
};

export type Reservation = {
  reservationID: string | null;
  reservationDateTime: number | null;
  name: string | null;
  phone: string | null;
  number: number | null;
};

// ==============================

type FieldProp = 'name' | 'value' | 'onChange' | 'defaultValue';
interface BaseNativeSelectContainerProps
  extends Omit<Select.RootProps, FieldProp>,
    Pick<Select.FieldProps, FieldProp> {
  placeholder: string;
  register: UseFormRegisterReturn<TFieldName>;
}
interface RemoteNativeSelectContainerProps
  extends BaseNativeSelectContainerProps {
  options?: never;
  remoteUrl: string;
}

interface LocalNativeSelectContainerProps
  extends BaseNativeSelectContainerProps {
  options: Array<OptionType> | null;
  remoteUrl?: never;
}

export type NativeSelectContainerProps =
  | RemoteNativeSelectContainerProps
  | LocalNativeSelectContainerProps;

export interface FieldContainerProps
  extends Omit<ChakraField.RootProps, 'label'> {
  prop: string;
  errors: FieldErrors;
  label: string;
}

interface BaseRadioCardContainerProps extends RadioCard.RootProps {
  register: UseFormRegisterReturn<TFieldName>;
}
interface RemoteRadioCardContainerProps extends BaseRadioCardContainerProps {
  options?: never;
  remoteUrl: string;
}
interface LocalRadioCardContainerProps extends BaseRadioCardContainerProps {
  options: Array<OptionType> | null;
  remoteUrl?: never;
}

export type RadioCardContainerProps =
  | RemoteRadioCardContainerProps
  | LocalRadioCardContainerProps;
