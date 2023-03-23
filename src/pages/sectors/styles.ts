import { Button } from 'antd';
import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.text};
  padding: 1rem;
`;

export const TopContent = styled.div`
  padding: 0 1rem 1rem 0;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export const StyledButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
`;
