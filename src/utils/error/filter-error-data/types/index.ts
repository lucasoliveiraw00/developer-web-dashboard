export type Details = {
  [key: string]: string;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export type FilterErrorData = {
  type: 'error' | 'warning' | 'info' | 'success';
  typeCode: string | number | null;
  code: number | string;
  name: string;
  details: Details[];
  message: string;
  detailsMessage: string;
  extra: any;
};
