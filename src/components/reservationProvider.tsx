'use client';
import moment from 'moment';
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
  clear: () => void;
  isLoading: boolean;
}

export const ReservationContext = createContext<ReservationContextType>({
  info: null,
  setup: () => {},
  clear: () => {},
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
        if (resp?.ok) {
          const data = await resp.json();
          if (moment(data.reservationDateTime).isBefore(moment())) {
            window.localStorage.removeItem('reservation-id');
            return;
          }
          setReservation(data);
        } else if (resp?.status === 404) {
          window.localStorage.removeItem('reservation-id');
        } else {
          throw new Error('Failed to fetch reservation');
        }
      } catch (e) {
        console.log(e);
      } finally {
        setIsInit(true);
      }
    }
    if (!isInit) getData();
  }, [isInit, trigger]);

  return (
    <ReservationContext.Provider
      value={{
        info: reservation,
        setup: setReservation,
        clear: () => setReservation(null),
        isLoading,
      }}
    >
      {children}
    </ReservationContext.Provider>
  );
}
