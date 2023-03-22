import styled from 'styled-components';

export const Container = styled.div`
  --padding: 2rem;

  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1001;
  pointer-events: none;
  padding: var(--padding);

  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
`;

interface IPercentageContainerProps {
  size: number;
}

export const PercentageContainer = styled.div<IPercentageContainerProps>`
  --percentage-size: ${props => props.size}px;

  width: var(--percentage-size);
  height: var(--percentage-size);
  position: absolute;
  right: var(--padding);
  bottom: var(--padding);
  border-radius: 50%;
  background-color: ${props => props.theme.colors.cardBackground};
`;

export const PercentageValue = styled.span`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  color: ${props => props.theme.colors.text};
  font-weight: 500;
  font-size: calc(var(--percentage-size) * 0.2);
`;
