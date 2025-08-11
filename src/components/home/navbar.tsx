import { Box, Button } from '@chakra-ui/react';
import { useState } from 'react';

type MenuItem = {
  label: string;
  href: string;
};

function MobileNavbar({ menuItems }: { menuItems: MenuItem[] }) {
  return (
    <Box
      display={{ base: 'block', md: 'none' }}
      h="100%"
      textAlign="center"
      px="4"
    >
      {menuItems.map((item) => (
        <Button
          key={item.label}
          asChild
          variant="ghost"
          color="brand.300"
          h="100%"
          _hover={{ bg: 'brand.500' }}
          p="2"
        >
          <a href={item.href}>{item.label}</a>
        </Button>
      ))}
    </Box>
  );
}

function DesktopNavbar({ menuItems }: { menuItems: MenuItem[] }) {
  return (
    <Box display={{ base: 'none', md: 'block' }} h="100%" px="4">
      {menuItems.map((item) => (
        <Button
          key={item.label}
          asChild
          variant="ghost"
          color="brand.300"
          h="100%"
          _hover={{ bg: 'brand.500' }}
        >
          <a href={item.href}>{item.label}</a>
        </Button>
      ))}
    </Box>
  );
}

export default function Navbar() {
  const [menuItems] = useState([
    { label: 'Home', href: '#' },
    { label: 'Menu', href: '#' },
    { label: 'Reservations', href: '#' },
    { label: 'Contact', href: '#' },
  ]);

  return (
    <Box
      bg="brand.400"
      position="fixed"
      top="0"
      left="0"
      right="0"
      zIndex="1000"
      boxShadow="md"
      h="var(--navbar-height)"
    >
      <Box h="100%" maxW="var(--max-content-width)" m="auto">
        <MobileNavbar menuItems={menuItems} />
        <DesktopNavbar menuItems={menuItems} />
      </Box>
    </Box>
  );
}
