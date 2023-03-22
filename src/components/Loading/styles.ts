import styled from 'styled-components';

interface IProps {
  size?: number;
}

const defaultSize = 70;

export const Img = styled.img<IProps>`
  animation: letterRotation 1s linear infinite;

  width: ${props => props.size || defaultSize}px;
  height: ${props => props.size || defaultSize}px;

  @keyframes letterRotation {
    from {
      transform: rotateZ(0deg);
    }

    to {
      transform: rotateZ(360deg);
    }
  }
`;
