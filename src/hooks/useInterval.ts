/* Core */
import { useEffect, useRef } from 'react';

export const useInterval = (callback: () => void, delay: number) => {
    const savedCallback = useRef<() => void>();

    useEffect(() => {
        savedCallback.current = callback;
    }, [ callback ]);

    useEffect(() => {
        // @ts-ignore
        const handler = (...args) => savedCallback.current(...args);

        if (delay !== null) {
            const id = setInterval(handler, delay);
            return () => clearInterval(id);
        }
    }, [ delay ]);
};
