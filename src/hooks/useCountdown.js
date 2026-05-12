import { useEffect, useRef, useState } from 'react';

export default function useCountdown(seconds, { onComplete, autoStart = true } = {}) {
  const [remaining, setRemaining] = useState(seconds);
  const [running, setRunning] = useState(autoStart);
  const cb = useRef(onComplete);
  cb.current = onComplete;

  useEffect(() => { setRemaining(seconds); }, [seconds]);

  useEffect(() => {
    if (!running) return;
    if (remaining <= 0) { cb.current && cb.current(); return; }
    const t = setTimeout(() => setRemaining((r) => r - 1), 1000);
    return () => clearTimeout(t);
  }, [remaining, running]);

  return { remaining, running, start: () => setRunning(true), stop: () => setRunning(false), reset: () => setRemaining(seconds) };
}
