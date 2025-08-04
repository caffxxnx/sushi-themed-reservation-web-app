import type { globalSettingVariableType } from '@/types/global.d.ts';

const globalSettingVariable: globalSettingVariableType = {
  RESERVATION_AVAILABLE_DAYS: 180,
  SERVICE_START_TIME: '10:00',
  SERVICE_END_TIME: '18:00',
  INTERVAL_MINUTES: 15,
  NUM_PER_INTERVAL: 15,
  LATEST_AVAILABLE_HOUR: 'next-day',
};

export default globalSettingVariable;
