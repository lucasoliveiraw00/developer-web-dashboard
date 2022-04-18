import moment from 'moment';

import { UpdateDeveloper } from './types';

import { apiBase } from '@/services/app';

async function updateDeveloper(values: UpdateDeveloper): Promise<void> {
  const formData = {
    ...values,
    birth_date: moment(values?.birth_date).toISOString(),
  };
  return apiBase.put(`/developer/${formData.id}`, formData);
}

export { updateDeveloper };
