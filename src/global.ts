import type { GlobalSettingVariableType } from '@/types/global.d.ts';

const RESERVATION_POLICY_CONFIG: GlobalSettingVariableType = {
  RESERVATION_AVAILABLE_DAYS: 10,
  SERVICE_START_TIME: '10:00',
  SERVICE_END_TIME: '18:00',
  INTERVAL_MINUTES: 60,
  NUM_PER_INTERVAL: 3,
};

export default RESERVATION_POLICY_CONFIG;
