'use client';

import { system } from '@/theme/theme';
import { ChakraProvider } from '@chakra-ui/react';
import { ColorModeProvider } from './color-mode';
import type { ColorModeProviderProps } from './color-mode';

export function Provider(props: ColorModeProviderProps) {
  return (
    <ChakraProvider value={system}>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  );
}
