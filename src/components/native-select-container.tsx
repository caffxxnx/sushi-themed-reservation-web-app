/* eslint-disable react-hooks/rules-of-hooks */
import { NativeSelectContainerProps, optionType } from '@/types/global';
import { NativeSelect, Spinner } from '@chakra-ui/react';

import useSWR from 'swr';
const fetcher = (...args: [RequestInfo, RequestInit?]) =>
  fetch(...args).then((res) => res.json());

export default function nativeSelectContainer({
  placeholder = 'Select option',
  register,
  remoteUrl,
  options,
  onChange,
  ...rest
}: NativeSelectContainerProps) {
  let optionsToUse: Array<optionType> = [];

  if (!remoteUrl) {
    if (!options) return <p>No options provided</p>;
    optionsToUse = options;
  } else {
    const { data, error, isLoading } = useSWR(remoteUrl, fetcher);

    optionsToUse = data;

    if (error) return <div>Failed to load</div>;
    if (isLoading) return <Spinner />;
    if (!optionsToUse) return <p>No profile data</p>;
  }

  return (
    <NativeSelect.Root {...rest}>
      <NativeSelect.Field
        placeholder={placeholder}
        {...register}
        onChange={(e) => {
          register.onChange(e);
          if (onChange) onChange(e);
        }}
      >
        {optionsToUse.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </NativeSelect.Field>
      <NativeSelect.Indicator />
    </NativeSelect.Root>
  );
}
