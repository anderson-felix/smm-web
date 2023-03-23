import {
  SelectInput,
  TextAreaInput,
  TextInput,
} from '../../../../components/Inputs';
import { makeCnpjMask } from '../../../../utils';
import { makePhoneMask } from '../../../../utils/makePhoneMask';
import { ICollaboratorModalContentProps } from './interfaces';
import { Container, InputGroup } from './styles';

export const CollaboratorModalContent: React.FC<
  ICollaboratorModalContentProps
> = ({ setCollaborator, collaborator, sectors, errors }) => {
  return (
    <Container>
      <TextInput
        placeholder="Nome"
        value={collaborator.name}
        onInputChange={name => setCollaborator(e => ({ ...e, name }))}
        error={errors?.name}
      />
      <TextAreaInput
        placeholder="Descrição"
        value={collaborator.description}
        onInputChange={description =>
          setCollaborator(e => ({ ...e, description }))
        }
      />
      <TextInput
        placeholder="E-mail"
        value={collaborator.email}
        onInputChange={email => setCollaborator(e => ({ ...e, email }))}
        error={errors?.email}
      />
      <TextInput
        placeholder="CNPJ"
        value={collaborator.federal_document}
        onInputChange={federal_document =>
          setCollaborator(e => ({
            ...e,
            federal_document: makeCnpjMask(federal_document),
          }))
        }
        disabled={!!collaborator.id}
        error={errors?.federal_document}
      />
      <InputGroup>
        <TextInput
          placeholder="Telefone"
          value={collaborator.phone}
          onInputChange={phone =>
            setCollaborator(e => ({ ...e, phone: makePhoneMask(phone) }))
          }
          error={errors?.phone}
        />
        <TextInput
          placeholder="Valor hora"
          value={collaborator.hourly_price}
          onInputChange={hourly_price =>
            setCollaborator(e => ({ ...e, hourly_price }))
          }
        />
      </InputGroup>
      <SelectInput
        value={
          collaborator.sectors.length
            ? collaborator.sectors.map(s => s.id)
            : undefined
        }
        options={sectors.map(s => ({ label: s.display_name, value: s.id }))}
        onChange={opt =>
          setCollaborator(e => ({
            ...e,
            sectors: sectors.filter(s => opt.find(o => o.value === s.id)),
          }))
        }
        placeholder="Setores"
        style={{ flex: 1 }}
        isMulti
      />
    </Container>
  );
};
