import { useEffect, useState } from 'react';

// Default: Abuja
const DEFAULT = { lat: 9.0579, lng: 7.4951 };

export default function useGeolocation() {
  const [coords, setCoords] = useState(DEFAULT);
  const [status, setStatus] = useState('default');

  useEffect(() => {
    if (!('geolocation' in navigator)) { setStatus('unsupported'); return; }
    setStatus('loading');
    const id = navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setStatus('ready');
      },
      () => setStatus('denied'),
      { enableHighAccuracy: false, timeout: 5000, maximumAge: 60000 }
    );
    return () => id;
  }, []);

  return { coords, status };
}
