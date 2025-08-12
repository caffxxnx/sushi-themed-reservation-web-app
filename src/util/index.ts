import _ from 'lodash';
import DB from '@/util/dbAdaptor';

export async function getReservationCount(
  date: number,
  editId?: string
): Promise<number> {
  const data = await DB.readReservationDb();
  const reservations = JSON.parse(data).reservations;

  if (editId) {
    const target = _.find(reservations, ['reservationID', editId]);
    // Return the current number if editing the same reservation
    if (target && +target.reservationDateTime === date) return target.number;
  }

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
