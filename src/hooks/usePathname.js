import { useState, useEffect } from 'react';

const usePathname = () => {
  const [pathname, setPathname] = useState('');

  useEffect(() => {
    setPathname(window.location.pathname);
  }, [window.location.pathname]);

  console.log(pathname);
  return pathname;
};

export default usePathname;
