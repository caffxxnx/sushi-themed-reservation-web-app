import type { GlobalSettingVariableType } from '@/types/global.d.ts';

const GLOBAL_SETTING_VARIABLE: GlobalSettingVariableType = {
  RESERVATION_AVAILABLE_DAYS: 180,
  SERVICE_START_TIME: '10:00',
  SERVICE_END_TIME: '18:00',
  INTERVAL_MINUTES: 15,
  NUM_PER_INTERVAL: 15,
  LATEST_AVAILABLE_HOUR: 'next-day',
};

export default GLOBAL_SETTING_VARIABLE;
