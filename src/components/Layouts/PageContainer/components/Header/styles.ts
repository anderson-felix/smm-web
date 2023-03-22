import styled from 'styled-components';

export const Content = styled.div`
  --borderBottomSize: 0.15rem;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 3rem;
  background: ${props => props.theme.colors.background};
  border-bottom: var(--borderBottomSize) solid
    ${props => props.theme.colors.border};
  border-radius: 0 0 0.125rem 0.125rem;
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.25);
  z-index: 100;
`;

export const Title = styled.h1`
  text-transform: uppercase;
  color: ${props => props.theme.colors.primary};
  font-size: 1.4rem;
  font-weight: 600;
  user-select: none;
`;
