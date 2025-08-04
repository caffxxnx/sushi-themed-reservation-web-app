export interface FieldContainerProps {
  children: React.ReactNode;
  prop: string;
  errors: FieldErrors;
  label: string;
  className?: string;

  disabled?: boolean;
}
