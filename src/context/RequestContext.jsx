import { createContext, useContext, useState, useCallback } from 'react';

const RequestContext = createContext(null);

export function RequestProvider({ children }) {
  const [activeRequest, setActiveRequest] = useState(null);

  const createRequest = useCallback((payload) => {
    const id = 'req_' + Math.random().toString(36).slice(2, 10);
    const req = {
      id,
      status: 'matched',
      etaMinutes: 12,
      createdAt: Date.now(),
      ...payload,
    };
    setActiveRequest(req);
    return req;
  }, []);

  const updateRequest = useCallback((patch) => {
    setActiveRequest((r) => (r ? { ...r, ...patch } : r));
  }, []);

  const cancelRequest = useCallback(() => setActiveRequest(null), []);

  return (
    <RequestContext.Provider value={{ activeRequest, createRequest, updateRequest, cancelRequest }}>
      {children}
    </RequestContext.Provider>
  );
}

export const useRequest = () => useContext(RequestContext);
