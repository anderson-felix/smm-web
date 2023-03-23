import { List } from 'antd';
import { darken } from 'polished';
import styled from 'styled-components';

export const StyledList = styled(List)`
  overflow-y: auto;
  height: 100%;
  width: 100%;
`;

export const ListItem = styled(StyledList.Item)`
  height: 100%;
  background-color: ${props => props.theme.colors.background};
  border-radius: 0.5rem;
  border: 1px solid ${props => props.theme.colors.primary} !important;
  margin: 0 0.5rem;

  transition: all 0.2s;

  &:hover {
    cursor: pointer;
    background-color: ${props => props.theme.colors.cardBackground};
    border: 1px solid ${props => darken(0.1, props.theme.colors.primary)} !important;
  }
`;

export const ItemMeta = styled(ListItem.Meta)``;
