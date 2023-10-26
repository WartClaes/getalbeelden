"use client"

import type { ReactNode } from 'react';

import { createContext, useContext, useRef, useMemo } from 'react';

const AppContext =  createContext<{
  lives: number;
  loseLife: () => void;
}>({
  lives: 0,
  loseLife: () => {},
});

export function AppContextProvider({ children }: { children: ReactNode }) {
  const livesRef = useRef<number>(3);

  function loseLife() {
    livesRef.current -= 1;
    console.log(livesRef.current);
  }

  const contextValue = useMemo(() => ({
    lives: livesRef.current,
    loseLife,
  }), [loseLife, livesRef.current]);

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
}

export function useApp() {
  const app = useContext(AppContext);

  return app;
}
