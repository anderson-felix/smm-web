import React from 'react';

import { Content, Title } from './styles';
import { IHeaderProps } from '../../interfaces';

export const Header: React.FC<IHeaderProps> = ({ page = '', title = '' }) => {
  return (
    <Content data-home={page === 'mainscreen'}>
      <Title>{title}</Title>
    </Content>
  );
};
