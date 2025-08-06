'use client';
import type { Reservation } from '@/types/global';
import type { ReactNode } from 'react';
import { createContext, useState, Dispatch, SetStateAction } from 'react';

interface ReservationProviderProps {
  children: ReactNode;
  defaultInfo: Reservation | null;
}
interface ReservationContextType {
  info: Reservation | null;
  setup: Dispatch<SetStateAction<Reservation | null>>;
}

export const ReservationContext = createContext<ReservationContextType>({
  info: null,
  setup: () => {},
});

export function ReservationProvider({
  children,
  defaultInfo,
}: ReservationProviderProps) {
  const [reservation, setReservation] = useState(defaultInfo);

  return (
    <ReservationContext.Provider
      value={{ info: reservation, setup: setReservation }}
    >
      {children}
    </ReservationContext.Provider>
  );
}
