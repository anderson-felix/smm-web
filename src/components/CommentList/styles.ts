import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
  overflow: hidden;
  overflow-y: auto;
  max-height: 30vh;
  padding: 0.25rem 0.75rem;
  border-radius: 0.25rem;
  background-color: ${props => props.theme.colors.lightBackground};
`;

export const TimeLabel = styled.p`
  font-size: 0.775rem;
`;
