import _ from 'lodash';
import fs from 'fs';

export async function getReservationCount(date: number): Promise<number> {
  const data = await fs.promises.readFile('./db/data.json', 'utf-8');
  const reservations = JSON.parse(data).reservations;

  const CURR_NUMBER =
    _.chain(reservations)
      .filter((o) => +o.reservationDateTime === date)
      .maxBy('number')
      .value()?.number || 0;
  return CURR_NUMBER + 1;
}

export function delaySimulator(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
