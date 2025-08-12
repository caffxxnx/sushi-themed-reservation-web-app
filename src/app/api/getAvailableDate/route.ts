import moment from 'moment';
import RESERVATION_POLICY_CONFIG from '@/global';
import { OptionType } from '@/types/global';

export async function GET() {
  const { RESERVATION_AVAILABLE_DAYS } = RESERVATION_POLICY_CONFIG;

  const dates: OptionType[] = [...Array(RESERVATION_AVAILABLE_DAYS).keys()].map(
    (v) => ({
      label: moment()
        .startOf('day')
        .add(v + 1, 'days')
        .format('YYYY-MM-DD'),
      value: moment()
        .startOf('day')
        .add(v + 1, 'days')
        .format('YYYY-MM-DD'),
    })
  );

  return new Response(JSON.stringify(dates), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
