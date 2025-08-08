'use client';
import type { Reservation } from '@/types/global';
import type { ReactNode } from 'react';
import {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from 'react';
import useSWRMutation from 'swr/mutation';

interface ReservationProviderProps {
  children: ReactNode;
}
interface ReservationContextType {
  info: Reservation | null;
  setup: Dispatch<SetStateAction<Reservation | null>>;
  isLoading: boolean;
}

export const ReservationContext = createContext<ReservationContextType>({
  info: null,
  setup: () => {},
  isLoading: false,
});

export function ReservationProvider({ children }: ReservationProviderProps) {
  const [reservation, setReservation] = useState<Reservation | null>(null);
  const [isInit, setIsInit] = useState<boolean>(false);

  const { trigger, isMutating: isLoading } = useSWRMutation(
    '/api/reservation',
    (url: string | Request | URL, { arg }: { arg: string }) =>
      arg === 'null' ? null : fetch(`${url}/${arg}`, { method: 'GET' })
  );

  useEffect(() => {
    async function getData() {
      try {
        const ID = window.localStorage.getItem('reservation-id');
        const resp = await trigger(`${ID}`);
        console.log(resp);
        if (resp) {
          const data = await resp.json();
          setReservation(data);
        }
      } catch (e) {
        console.log(e);
        window.localStorage.removeItem('reservation-id');
      } finally {
        setIsInit(true);
      }
    }
    if (!isInit) getData();
  }, [isInit, trigger]);

  return (
    <ReservationContext.Provider
      value={{ info: reservation, setup: setReservation, isLoading }}
    >
      {children}
    </ReservationContext.Provider>
  );
}
