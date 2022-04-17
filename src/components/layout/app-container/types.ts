import { ReactNode } from 'react';

export type DataPathsProps = { name: string; href?: string };

export type AppContainerProps = {
  breadcrumb: string | DataPathsProps[];
  title?: string;
  layout?: 'container' | 'full';
  children: ReactNode;
};
