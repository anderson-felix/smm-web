import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.theme.colors.background};
`;

export const FormContainer = styled.div`
  height: 11rem;
  width: 26rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 1rem;
  padding: 1rem;
  border: 1px solid ${props => props.theme.colors.lightBorder};
  border-radius: 0.3rem;
`;
