import { AxiosResponse } from 'axios';

import { apiBase } from '@/services/app';

async function deleteLevel(id: number): Promise<AxiosResponse> {
  return apiBase.delete(`/level/${id}`);
}

export { deleteLevel };
