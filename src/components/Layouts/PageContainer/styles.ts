import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;

  background-color: ${props => props.theme.colors.pageBackground};
  background-size: contain;
  background-position: center;

  display: flex;
  flex-direction: column;
`;

export const ContentWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  background-image: url(${props => props.theme.backgroundImage});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  overflow: hidden;
`;

export const Content = styled.div`
  height: 100%;
  width: 100%;
  padding: 1rem;
  position: relative;

  @media (max-width: ${props => props.theme.breakingPoints.smallMobile}px) {
    padding: 0;
  }
`;
