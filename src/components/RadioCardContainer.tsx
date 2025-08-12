/* eslint-disable react-hooks/rules-of-hooks */
import useSWR from 'swr';
import { RadioCardContainerProps, OptionType } from '@/types/global';
import { Flex, Box, RadioCard, Spinner } from '@chakra-ui/react';
import fetcher from '@/util/fetcher';

export default function RadioCardContainer({
  register,
  remoteUrl,
  options,
  value,
  ...rest
}: RadioCardContainerProps) {
  let optionsToUse: Array<OptionType> = [];

  if (!remoteUrl) {
    if (!options) return <p>No options provided</p>;
    optionsToUse = options;
  } else {
    const { data, error, isLoading } = useSWR(remoteUrl, fetcher, {
      revalidateOnFocus: false,
    });

    optionsToUse = data;

    if (error) return <div>Failed to load</div>;
    if (isLoading) return <Spinner />;
    if (!optionsToUse) return <p>No profile data</p>;
  }

  return (
    <RadioCard.Root {...rest} value={value}>
      <Flex gap="10px" wrap="wrap">
        {optionsToUse.map((item) => (
          <Box w="80px" key={item.value}>
            <RadioCard.Item
              value={`${item.value}`}
              disabled={item.disabled}
              bg="brand.300"
              borderColor="brand.400"
              _checked={{ bg: 'brand.400', color: 'brand.300' }}
              _hover={{
                bg: 'brand.500',
                color: 'brand.300',
                cursor: 'pointer',
                transition: 'all 0.15s ease-in-out',
              }}
            >
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
