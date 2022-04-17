import { AxiosResponse } from 'axios';

import { apiBase } from '@/services/app';

async function deleteDeveloper(id: number): Promise<AxiosResponse> {
  return apiBase.delete(`/developer/${id}`);
}

export { deleteDeveloper };
