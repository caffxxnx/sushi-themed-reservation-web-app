import { FieldContainerProps } from '@/types/global';
import { Field } from '@chakra-ui/react';

export default function FieldContainer({
  label,
  prop,
  children,
  errors,
  ...rest
}: FieldContainerProps) {
  return (
    <Field.Root invalid={!!errors[prop]} {...rest}>
      <Field.Label>{label}</Field.Label>
      {children}
      <Field.ErrorText>
        {typeof errors[prop]?.message === 'string'
          ? errors[prop].message
          : 'unknown msg'}
      </Field.ErrorText>
    </Field.Root>
  );
}
