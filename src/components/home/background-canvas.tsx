import { useMediaQuery, Box, Image } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import nigiri1 from '@/assets/nigiri1.png';
import uramaki1 from '@/assets/uramaki1.png';
import nigiri2 from '@/assets/nigiri2.png';
import uramaki2 from '@/assets/uramaki2.png';
import nigiri3 from '@/assets/nigiri3.png';

export default function BackgroundCanvas() {
  const [isThinScreen] = useMediaQuery(['(max-width: 767px)']);
  const [commonStyle, setCommonStyle] = useState({
    position: 'absolute',
    animation: 'bounce infinite alternate',
    h: '80px',
  });

  useEffect(() => {
    setCommonStyle({
      position: 'absolute',
      animation: 'bounce infinite alternate',
      h: isThinScreen ? '50px' : '80px',
    });
  }, [isThinScreen]);

  return (
    <Box
      position="absolute"
      top="calc(50% + var(--navbar-height))"
      left="50%"
      width="80%"
      height="80%"
      maxW="1200px"
      transform="translate(-50%, -50%)"
    >
      {/* LEFT SUSHI */}
      <Image
        src={nigiri1.src}
        alt="nigiri"
        {...commonStyle}
        top="0"
        left="0"
        animationDuration="0.8s"
      />
      <Image
        src={uramaki1.src}
        alt="uramaki"
        {...commonStyle}
        top="40%"
        left="0"
        animationDuration="1.1s"
        animationDelay="-0.5s"
      />
      <Image
        src={nigiri3.src}
        alt="nigiri"
        {...commonStyle}
        top="80%"
        left="0"
        animationDuration="1s"
        animationDelay="-1.1s"
      />

      {/* RIGHT SUSHI */}
      <Image
        src={nigiri2.src}
        alt="nigiri"
        {...commonStyle}
        top="20%"
        right="0"
        animationDuration="1s"
        animationDelay="-0.2s"
      />
      <Image
        src={uramaki2.src}
        alt="uramaki"
        {...commonStyle}
        top="60%"
        right="0"
        animationDuration="0.6s"
        animationDelay="-0.8s"
      />
    </Box>
  );
}
