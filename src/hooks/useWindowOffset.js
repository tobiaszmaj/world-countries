import { useState, useEffect } from 'react';

const useWindowOffset = () => {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    setOffsetY(window.pageYOffset);

    const onScroll = () => {
      setOffsetY(window.pageYOffset);
    };
    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return offsetY;
};

export default useWindowOffset;
