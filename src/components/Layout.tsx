import React, { useEffect } from 'react';

import '@assets/fonts/_fonts-bebas.css';
import '@assets/fonts/_fonts-roboto-mono.css';
import '@assets/global.css';

type Props = { children: React.ReactNode };
const Layout = ({ children }: Props): JSX.Element => {
  useEffect(() => {
    const fixViewportHeight = () => {
      // fix viewport height
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    const handleResize = () => {
      const afterOrientationChange = () => {
        fixViewportHeight();
        window.removeEventListener('resize', afterOrientationChange);
      };

      window.addEventListener('resize', afterOrientationChange);
    };

    window.addEventListener('orientationchange', handleResize);
    fixViewportHeight();

    return () => {
      window.removeEventListener('orientationchange', handleResize);
    };
  });

  return <>{children}</>;
};

export default Layout;
