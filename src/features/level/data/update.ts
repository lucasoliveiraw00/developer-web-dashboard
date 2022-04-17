import { UpdateLevel } from './types';

import { apiBase } from '@/services/app';

async function updateLevel(values: UpdateLevel): Promise<void> {
  const formData = values;
  return apiBase.put(`/level/${formData.id}`, formData);
}

export { updateLevel };
