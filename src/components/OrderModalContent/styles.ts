import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const SelectGroup = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 1rem;
`;

export const SelectGroupContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 1rem;
`;

export const SectorsDataContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;
export const ContentLabel = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: -0.25rem 0 0.25rem;
  padding-right: 0.25rem;
  color: ${props => props.theme.colors.textLight};

  &[data-start='true'] {
    justify-content: flex-start;
    margin-bottom: -0.5rem;
  }
`;

export const SectorsDataInputArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${props => props.theme.colors.lightBorder};
  padding: 0.25rem 0;

  > :last-child {
    width: 60%;
    margin-right: 0.5rem;
  }
`;

export const SectorsLabel = styled.div`
  width: 100%;
  font-size: 1.05rem;
  padding: 0.25rem 0.5rem 0 0;
`;
