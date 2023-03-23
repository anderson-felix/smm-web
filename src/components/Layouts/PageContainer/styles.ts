import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${props => props.theme.colors.background};

  display: flex;
  flex-direction: column;
`;

export const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  overflow: hidden;
  background-image: url(${props => props.theme.backgroundImage});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;

export const Content = styled.div`
  flex: 1;
  margin: 1rem;
  border: 1px solid ${props => props.theme.colors.lightBorder};
  border-radius: 0.5rem;
  overflow: hidden;
  background: ${props => props.theme.colors.surfaceBackground};
`;
