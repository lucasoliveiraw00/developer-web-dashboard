/* eslint-disable @typescript-eslint/no-explicit-any */

import { toast, ToastOptions } from 'react-toastify';

import { filterErrorData } from '../filter-error-data';

import { FilterErrorData } from './types';

/**
 * Receive error data and display toast with error message
 *
 * @param error Error - Data to be displayed
 * @return String message
 *
 */
export function showErrorMessage(
  error: Error | any,
  id: string | number | undefined = undefined,
): FilterErrorData {
  const errors = filterErrorData(error);
  const { type, message } = errors;

  function showToastMessage(
    toastMessage: string,
    options: ToastOptions<Record<string, never>> | undefined = undefined,
  ) {
    if (id && toast[type] && !toast.isActive(id)) {
      toast[type](toastMessage, options);
      return;
    }
    toast[type](toastMessage, options);
  }

  showToastMessage(`${message}`, {
    bodyStyle: { whiteSpace: 'pre-wrap' },
  });

  return errors;
}
