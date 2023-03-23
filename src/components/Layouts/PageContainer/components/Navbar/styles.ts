import { Menu } from 'antd';
import styled from 'styled-components';

export const Container = styled.div`
  width: ${props => props.theme.dimensions.navbarWidth};
  padding: 1rem 0 1rem 1rem;
  height: 100vh;
  user-select: none;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const StyledMenu = styled(Menu)`
  border-radius: 0.5rem;
`;
