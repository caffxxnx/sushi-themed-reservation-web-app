import _ from 'lodash';
import moment from 'moment';
import RESERVATION_POLICY_CONFIG from '@/global';
import { OptionType } from '@/types/global';
import { NextRequest } from 'next/server';
import DB from '@/util/dbAdaptor';

function getOpeningTime(queryDate: string) {
  const { SERVICE_START_TIME } = RESERVATION_POLICY_CONFIG;
  return moment(`${queryDate} ${SERVICE_START_TIME}`);
}

function getCloseTime(queryDate: string) {
  const { SERVICE_END_TIME } = RESERVATION_POLICY_CONFIG;
  return moment(`${queryDate} ${SERVICE_END_TIME}`);
}

export async function GET(request: NextRequest) {
  if (!request.nextUrl.searchParams.has('date')) {
    return new Response(
      JSON.stringify({ error: 'Date parameter is required' }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  const searchParams = request.nextUrl.searchParams;
  const queryDate = searchParams.get('date') || '';

  const db = await DB.readReservationDb();
  const reservations = JSON.parse(db).reservations;

  const { INTERVAL_MINUTES, NUM_PER_INTERVAL } = RESERVATION_POLICY_CONFIG;

  const availableTime = getOpeningTime(queryDate);
  const CLOSING_TIME = getCloseTime(queryDate);
  const timeOptions: OptionType[] = [];
  do {
    const isIntervalFull =
      _.filter(reservations, [
        'reservationDateTime',
        +availableTime.format('x'),
      ]).length >= NUM_PER_INTERVAL;

    timeOptions.push({
      disabled: isIntervalFull,
      label: availableTime.format('HH:mm'),
      value: availableTime.format('HH:mm'),
    });
    availableTime.add(INTERVAL_MINUTES, 'minutes');
  } while (+availableTime.format('x') <= +CLOSING_TIME.format('x'));

  return new Response(JSON.stringify(timeOptions), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
