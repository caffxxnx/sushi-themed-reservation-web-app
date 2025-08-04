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
