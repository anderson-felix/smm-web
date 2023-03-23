import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
  max-height: 30vh;
  overflow: hidden;
  padding: 0.25rem 0.75rem;
  border-radius: 0.25rem;
  background-color: ${props => props.theme.colors.lightBackground};
  overflow-y: auto;
`;

export const CommentInputArea = styled.div`
  display: flex;
  gap: 1rem;
`;

export const TimeLabel = styled.p`
  font-size: 0.775rem;
`;
