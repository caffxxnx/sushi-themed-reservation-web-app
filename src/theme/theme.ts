import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';

const config = defineConfig({
  theme: {
    semanticTokens: {
      colors: {
        brand: {
          50: { value: '#FAF4E1' },
          100: { value: '#F26419' },
          200: { value: '#2F3E46' },
          300: { value: '#FFFDF9' },
          400: { value: '#7A4E2D' },
          500: { value: '#A2836A' },
          600: { value: '#D64545' },
          700: { value: '#1A1A1A' },
        },
        bg: {
          DEFAULT: { value: '#FAF4E1' },
        },
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);
