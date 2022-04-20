import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { TableServerSide } from './TableServerSide';

export default {
  title: 'Data Display/Table/ServerSide',
  component: TableServerSide,
} as ComponentMeta<typeof TableServerSide>;

const columns = [
  {
    title: 'Nível',
    dataIndex: 'level',
    sorter: true,
  },
  {
    title: 'Slug',
    dataIndex: 'slug',
  },
  {
    title: 'Qtd. Desenvolvedores',
    sorter: true,
    dataIndex: 'qtd_developers',
  },
];

const Template: ComponentStory<typeof TableServerSide> = args => (
  <TableServerSide {...args} />
);

export const Default = Template.bind({});

Default.args = {
  columns,
  urlFetch: '/level',
};
