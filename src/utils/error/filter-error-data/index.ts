/**
 * Receive error data, return filtered error data
 *
 * @param error Error - Data to filter
 * @return Error filtered
 *
 */

import { Details, FilterErrorData } from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function filterErrorData(error: Error | any): FilterErrorData {
  const { response = null } = error;

  let name;
  let details: Details[] = [];
  let message = 'Ocorreu um erro interno. Tente novamente mais tarde!';
  let type = 'error';
  let typeCode = null;
  let code = 500;

  if (error?.message) message = error.message;

  if (error?.name) name = error.name;

  if (error?.code) code = error.code;

  if (response) {
    const { data = null } = response;

    if (data?.type) type = data.type;

    if (data?.message) message = data.message;

    if (data?.error?.code) typeCode = data.error.code;

    if (data?.errors) {
      details = data.errors;
      message = details.reduce<string>((previousValue, currentValue) => {
        const { field = '', message: errorData = '' } = currentValue;
        const label = field.charAt(0).toUpperCase() + field.substr(1);
        return `${previousValue}${label}: \n ${errorData} \n\n`;
      }, '');
    }

    if (data?.error?.message) message = data.error.message;

    code = response.status;
  }

  return {
    type,
    code,
    typeCode,
    name,
    details,
    message,
    extra: error,
  } as FilterErrorData;
}
