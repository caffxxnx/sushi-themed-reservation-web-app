'use client';

import { system } from '@/theme/theme';
import { ChakraProvider } from '@chakra-ui/react';
import { ColorModeProvider } from './ColorMode';
import type { ColorModeProviderProps } from './ColorMode';

export function Provider(props: ColorModeProviderProps) {
  return (
    <ChakraProvider value={system}>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  );
}
