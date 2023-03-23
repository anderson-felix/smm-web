import { TextAreaInput, TextInput } from '../../../../components/Inputs';
import { IOrderModalContentProps } from './interfaces';
import { Container } from './styles';

export const SectorModalContent: React.FC<IOrderModalContentProps> = ({
  setSector,
  sector,
  errors,
}) => {
  return (
    <Container>
      <TextInput
        placeholder="Título"
        value={sector.display_name}
        onInputChange={display_name => setSector(e => ({ ...e, display_name }))}
        error={errors?.display_name}
      />
      <TextAreaInput
        placeholder="Descrição"
        value={sector.description}
        onInputChange={description => setSector(e => ({ ...e, description }))}
      />
    </Container>
  );
};
