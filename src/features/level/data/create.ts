import { AxiosResponse } from 'axios';

import { CreateLevel } from './types';

import { apiBase } from '@/services/app';

async function createLevel(values: CreateLevel): Promise<AxiosResponse> {
  const formData = values;
  return apiBase.post(`/level`, formData);
}

export { createLevel };
