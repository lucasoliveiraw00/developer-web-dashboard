import { AxiosResponse } from 'axios';

import moment from 'moment';

import { CreateDeveloper } from './types';

import { apiBase } from '@/services/app';

async function createDeveloper(
  values: CreateDeveloper,
): Promise<AxiosResponse> {
  const formData = {
    ...values,
    birth_date: moment(values?.birth_date).toISOString(),
    sex: values.sex.length === 0 ? null : values.sex,
  };

  return apiBase.post(`/developer`, formData);
}

export { createDeveloper };
