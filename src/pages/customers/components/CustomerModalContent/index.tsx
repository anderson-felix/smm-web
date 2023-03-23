import { TextAreaInput, TextInput } from '../../../../components/Inputs';
import { makeCnpjMask } from '../../../../utils';
import { makePhoneMask } from '../../../../utils/makePhoneMask';
import { ICustomerModalContentProps } from './interfaces';
import { Container } from './styles';

export const CustomerModalContent: React.FC<ICustomerModalContentProps> = ({
  setCustomer,
  customer,
  errors,
}) => {
  return (
    <Container>
      <TextInput
        placeholder="Nome"
        value={customer.name}
        onInputChange={name => setCustomer(e => ({ ...e, name }))}
        error={errors?.name}
      />
      <TextAreaInput
        placeholder="Descrição"
        value={customer.description}
        onInputChange={description => setCustomer(e => ({ ...e, description }))}
      />
      <TextInput
        placeholder="E-mail"
        value={customer.email}
        onInputChange={email => setCustomer(e => ({ ...e, email }))}
        error={errors?.email}
      />
      <TextInput
        placeholder="CNPJ"
        value={customer.federal_document}
        onInputChange={federal_document =>
          setCustomer(e => ({
            ...e,
            federal_document: makeCnpjMask(federal_document),
          }))
        }
        disabled={!!customer.id}
        error={errors?.federal_document}
      />
      <TextInput
        placeholder="Telefone"
        value={customer.phone}
        onInputChange={phone =>
          setCustomer(e => ({ ...e, phone: makePhoneMask(phone) }))
        }
        error={errors?.phone}
      />
    </Container>
  );
};
