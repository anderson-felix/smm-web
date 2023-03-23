import { Tag } from 'antd';
import { useEffect, useState } from 'react';
import { ICollaborator } from '../../interfaces/collaborator';
import { orderStatusArray, OrderStatusType } from '../../interfaces/order';
import { ISectorData } from '../../interfaces/sector';
import formatShortName from '../../utils/formatShortName';
import { CommentList } from '../CommentList';
import { TextInput, SelectInput, TextAreaInput } from '../Inputs';
import { CustomTagProps, SelectOption } from '../Inputs/interfaces';
import { IOrderModalContentProps } from './interfaces';
import {
  Container,
  SectorsDataContainer,
  ContentLabel,
  SectorsDataInputArea,
  SectorsLabel,
  SelectGroup,
  SelectGroupContent,
} from './styles';

export const OrderModalContent: React.FC<IOrderModalContentProps> = ({
  user,
  order,
  setOrder,
  errors,
  sectors,
  customers,
}) => {
  const [collaborators, setCollaborators] = useState<ICollaborator[]>([]);
  const [sectorsData, setSectorsData] = useState<ISectorData[]>([]);

  useEffect(() => {
    setCollaborators(order.collaborators);
    setSectorsData(
      order.sectors.map(s => ({
        estimated_hours: s.estimated_hours,
        sector_id: s.id,
      })),
    );
  }, [order]);

  const handleSectorChange = (options: SelectOption[]) => {
    const selected = sectors.filter(s => options.find(e => e.value === s.id));

    let updatedValues: ISectorData[] = [];

    setSectorsData(e => {
      const keptSectors = e.filter(sector =>
        selected.find(s => s.id === sector.sector_id),
      );
      const newChoices = selected.filter(
        s => !keptSectors.find(k => k.sector_id === s.id),
      );

      updatedValues = [
        ...newChoices.map(s => ({ sector_id: s.id, estimated_hours: null })),
        ...keptSectors,
      ];

      return [
        ...newChoices.map(s => ({ sector_id: s.id, estimated_hours: null })),
        ...keptSectors,
      ];
    });

    setCollaborators(e =>
      e.filter(collaborator =>
        selected.find(s => s.collaborators.find(c => c.id === collaborator.id)),
      ),
    );

    setOrder(e => ({
      ...e,
      sectors: sectors
        .filter(s => updatedValues.find(v => v.sector_id === s.id))
        .map(s => ({
          ...s,
          estimated_hours:
            updatedValues.find(v => v.sector_id === s.id)?.estimated_hours ||
            null,
        })),
    }));
  };

  const handleEstimatedHours = (
    estimated_hours: string,
    sectorData: ISectorData,
  ) =>
    setSectorsData(e =>
      e.map(data =>
        data.sector_id === sectorData.sector_id
          ? { ...sectorData, estimated_hours }
          : data,
      ),
    );

  const handleCustomerChange = (opt: SelectOption[]) => {
    const customer_id = opt[0]?.value || null;
    const name = opt[0]?.label || null;

    setOrder(e => ({ ...e, customer_id, customer: { id: customer_id, name } }));
  };

  const handleCollaboratorChange = (opt: SelectOption[]) => {
    setOrder(e => ({
      ...e,
      collaborators: collaborators.filter(c => opt.find(o => o.value === c.id)),
    }));
  };

  const handleStatusChange = (opt: SelectOption[]) => {
    setOrder(e => ({
      ...e,
      status: opt[0].value as OrderStatusType,
    }));
  };

  return (
    <Container>
      <TextInput
        placeholder="Título"
        value={order.display_name}
        onInputChange={display_name => setOrder({ ...order, display_name })}
        error={errors?.display_name}
      />
      <TextAreaInput
        placeholder="Descrição"
        value={order.description}
        onInputChange={description => setOrder({ ...order, description })}
      />
      <SelectGroup>
        <SelectGroupContent>
          <SelectInput
            value={order.status ? [order.status] : undefined}
            options={orderStatusArray.map(status => ({
              label: `${status.slice(0, 1).toLocaleUpperCase()}${status.slice(
                1,
              )}`,
              value: status,
            }))}
            onChange={handleStatusChange}
            placeholder="Status"
            style={{ flex: 1 }}
          />
          <SelectInput
            value={order.sectors.map(s => s.id)}
            options={sectors.map(s => ({ label: s.display_name, value: s.id }))}
            onChange={handleSectorChange}
            placeholder="Setores"
            style={{ flex: 1 }}
            isMulti
          />
        </SelectGroupContent>

        <SectorsDataContainer>
          <ContentLabel>Horas estimadas</ContentLabel>
          {sectorsData.map(s => (
            <SectorsDataInputArea key={s.sector_id}>
              <SectorsLabel>
                {sectors.find(e => e.id === s.sector_id)?.display_name || ''}{' '}
              </SectorsLabel>
              <TextInput
                value={s.estimated_hours}
                onInputChange={e => handleEstimatedHours(e, s)}
              />
            </SectorsDataInputArea>
          ))}
        </SectorsDataContainer>
      </SelectGroup>
      <SelectGroup>
        <SelectInput
          value={order.customer ? [order.customer.id] : undefined}
          options={customers.map(c => ({ label: c.name, value: c.id }))}
          onChange={handleCustomerChange}
          placeholder="Cliente"
          style={{ flex: 2, height: '100%' }}
        />

        <SelectInput
          value={order.collaborators.map(c => c.id)}
          options={collaborators.map(c => ({
            label: `${formatShortName(c.name)} - ${
              c.hourly_price ? c.hourly_price.concat(' R$') : undefined
            }`,
            value: c.id,
          }))}
          onChange={handleCollaboratorChange}
          disabled={!sectorsData.length}
          placeholder="Colaborador - Valor hora"
          style={{ flex: 3 }}
          isMulti
        />
      </SelectGroup>
      <ContentLabel data-start>Comentários</ContentLabel>
      <CommentList user={user} comments={order.comments} />
    </Container>
  );
};
