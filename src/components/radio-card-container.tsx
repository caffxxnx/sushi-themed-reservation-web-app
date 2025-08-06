/* eslint-disable react-hooks/rules-of-hooks */
import useSWR from 'swr';
import { RadioCardContainerProps, OptionType } from '@/types/global';
import { Flex, Box, RadioCard, Spinner } from '@chakra-ui/react';

const fetcher = (...args: [RequestInfo, RequestInit?]) =>
  fetch(...args).then((res) => res.json());

export default function radioCardContainer({
  register,
  remoteUrl,
  options,
  ...rest
}: RadioCardContainerProps) {
  let optionsToUse: Array<OptionType> = [];

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
    <RadioCard.Root {...rest}>
      <Flex gap="10px" wrap="wrap">
        {optionsToUse.map((item) => (
          <Box w="80px" key={item.value}>
            <RadioCard.Item value={`${item.value}`} disabled={item.disabled}>
              <RadioCard.ItemHiddenInput {...register} />
              <RadioCard.ItemControl>
                <RadioCard.ItemText>{item.label}</RadioCard.ItemText>
              </RadioCard.ItemControl>
            </RadioCard.Item>
          </Box>
        ))}
      </Flex>
    </RadioCard.Root>
  );
}
