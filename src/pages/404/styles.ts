import styled from 'styled-components';

interface ImageProps {
  src: string;
}

export const Container = styled.div<ImageProps>`
  width: 100vw;
  height: 100vh;
  background-image: url(${props => props.src});
  background-position: center;
  background-size: cover;
  color: ${props => props.theme.colors.textDarker};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  a {
    color: ${props => props.theme.colors.textDarker};
    text-decoration: none;
    border-bottom: 1px solid ${props => props.theme.colors.textDarker};
    margin-top: 50px;
  }
`;

export const Image = styled.div<ImageProps>`
  background-image: url(${props => props.src});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;

  width: 100%;
  height: 15rem;
  margin-top: 2.5rem;
`;
export const Infos = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const Message = styled.h1`
  font-weight: 600;
  padding: 1rem 0;
`;

export const Description = styled.p`
  width: 100%;
  padding: 0 1rem;
  text-align: center;
`;
