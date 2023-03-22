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
  height: 10rem;
  width: 25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 1rem;
  border: 1px solid rebeccapurple;
`;
