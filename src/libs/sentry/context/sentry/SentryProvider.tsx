import React, { createContext } from 'react';

import * as Sentry from '@sentry/browser';

import { SentryProviderProps } from './type';

if (process) {
  const { APP_SENTRY_DSN, APP_SENTRY_ENVIRONMENT } = process.env;
  Sentry.init({
    dsn: APP_SENTRY_DSN,
    environment: APP_SENTRY_ENVIRONMENT,
  });
}

const SentryContext = createContext(undefined);

SentryContext.displayName = 'Config.SentryContext';

const SentryProvider = ({
  children,
}: SentryProviderProps): React.ReactElement => (
  <SentryContext.Provider value={undefined}>{children}</SentryContext.Provider>
);

export { SentryProvider, SentryContext };
