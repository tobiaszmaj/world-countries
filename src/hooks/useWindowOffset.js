import { useState, useEffect } from 'react';

const useWindowOffset = () => {
    const [offsetY, setOffsetY] = useState(window.pageYOffset);

    useEffect(() => {
        const onScroll = () => {
            setOffsetY(window.pageYOffset);
        };
        window.addEventListener('scroll', onScroll);

        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return offsetY;
};

export default useWindowOffset;