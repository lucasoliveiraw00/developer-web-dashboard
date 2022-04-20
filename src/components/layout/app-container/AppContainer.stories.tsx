import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { AppContainer } from './AppContainer';

export default {
  title: 'Layout/AppContainer',
  component: AppContainer,
} as ComponentMeta<typeof AppContainer>;

const Template: ComponentStory<typeof AppContainer> = args => (
  <AppContainer {...args} />
);

export const Default = Template.bind({});

Default.parameters = {
  storyContainer: false,
};

Default.args = {
  title: 'Layout / AppContainer',
  breadcrumb: [{ name: 'Layout' }, { name: 'AppContainer' }],
  layout: 'container',
};
