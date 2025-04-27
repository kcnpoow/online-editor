import { useEffect } from 'react';

const useLogHistory = () => {
  useEffect(() => {
    // Log the current history state whenever it changes
    const handlePopState = (event: PopStateEvent) => {
      console.log('History state changed:', event);
    };

    // Add the event listener to the window object
    window.addEventListener('popstate', handlePopState);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);
};

export default useLogHistory;
