import React, { useCallback, useState } from 'react';
import { GetServerSideProps } from 'next';

import { AiOutlinePlusCircle } from 'react-icons/ai';
import {
  updateApiTokenFromCookie,
  forceTokenToExpire,
  logError,
} from '../../utils';
import { getProfile } from '../../controllers/user';
import { Container, StyledButton, TopContent } from './styles';
import { Modal } from '../../components/Modal';
import { IOrder } from '../../interfaces/order';
import {
  createSector,
  listSectors,
  updateSector,
  removeSector,
} from '../../controllers/sector';
import { ISector } from '../../interfaces/sector';
import { ICustomer } from '../../interfaces/customer';
import { IUser } from '../../interfaces/user';
import { useLoading, useToast } from '../../hooks';
import { SectorList } from './components/SectorList';
import { SectorModalContent } from './components/SectorModalContent';

interface IProps {
  orders: IOrder[];
  sectors: ISector[];
  customers: ICustomer[];
  user: IUser;
}

const defaultSectorObject: ISector = {
  id: '',
  display_name: '',
  description: '',
  color: '',
  collaborators: [],
  created_by: '',
};

const Sectors: React.FC<IProps> = ({ user, sectors: _sectors }) => {
  const [sectors, setSectors] = useState(_sectors);
  const [openModal, setOpenModal] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [targetSector, setTargetSector] =
    useState<ISector>(defaultSectorObject);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { addToast } = useToast();
  const { setLoadingConfig } = useLoading();

  const handleCancel = () => {
    setOpenModal(false);
    setTargetSector(defaultSectorObject);
  };

  const handleSectorClick = (sector: ISector) => {
    setTargetSector(sector);
    setOpenModal(true);
  };

  const handleNewSector = () => {
    setTargetSector(defaultSectorObject);
    setOpenModal(true);
  };

  const handleRemoveClick = (sector: ISector) => {
    setTargetSector(sector);
    setOpenConfirmModal(true);
  };

  const handleSave = useCallback(async () => {
    setLoadingConfig(config => ({ ...config, isLoading: true }));
    try {
      if (!targetSector.display_name) {
        setErrors({ display_name: 'Insira um nome' });
        return;
      }
      setErrors({});

      const orderDTO = {
        display_name: targetSector.display_name,
        description: targetSector.description || null,
        color: targetSector.color || null,
      };

      if (!targetSector.id) {
        await createSector(orderDTO);
        setSectors(e => [targetSector, ...e]);
        setOpenModal(false);
        return;
      }

      await updateSector({
        id: targetSector.id,
        ...orderDTO,
      });
      setSectors(e =>
        e.map(sector =>
          sector.id === targetSector.id ? targetSector : sector,
        ),
      );
      setOpenModal(false);
      setTargetSector(defaultSectorObject);
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Falha ao atualizar setor',
        description: err?.message,
      });
    } finally {
      setLoadingConfig(config => ({ ...config, isLoading: false }));
    }
  }, [addToast, setLoadingConfig, targetSector]);

  const handleRemove = useCallback(async () => {
    setLoadingConfig(config => ({ ...config, isLoading: true }));

    try {
      if (!targetSector.id) return;

      await removeSector(targetSector.id);
      setSectors(e => e.filter(sector => sector.id !== targetSector.id));
      setOpenConfirmModal(false);
      setTargetSector(defaultSectorObject);
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Falha ao remover setor',
        description: err?.message,
      });
    } finally {
      setLoadingConfig(config => ({ ...config, isLoading: false }));
    }
  }, [addToast, setLoadingConfig, targetSector]);

  return (
    <Container>
      <TopContent>
        <StyledButton onClick={handleNewSector}>
          <AiOutlinePlusCircle style={{ fontSize: '1.3rem' }} />
          Adicionar
        </StyledButton>
      </TopContent>
      <SectorList
        sectors={sectors}
        onSectorClick={handleSectorClick}
        onRemoveClick={handleRemoveClick}
      />
      <Modal
        onCancel={handleCancel}
        onConfirm={handleSave}
        title={`${targetSector.id ? 'Editar' : 'Adicionar novo'} setor`}
        show={openModal}
        width="30rem"
      >
        <SectorModalContent
          sector={targetSector}
          setSector={setTargetSector}
          errors={errors}
          user={user}
        />
      </Modal>
      <Modal
        onCancel={() => setOpenConfirmModal(false)}
        onConfirm={handleRemove}
        title="Tem certeza disso?"
        show={openConfirmModal}
        width="30rem"
      >
        Tem certeza que deseja remover o setor? Essa é uma ação irreversível.
      </Modal>
    </Container>
  );
};

export default Sectors;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  try {
    updateApiTokenFromCookie(req);

    const [user, sectors] = await Promise.all([getProfile(), listSectors()]);

    return {
      props: {
        user,
        sectors: sectors.results,
        selectedPage: 'sectors',
        pageTitle: 'Setores',
      },
    };
  } catch (err) {
    forceTokenToExpire(res);
    logError('mainscreen', err);

    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      },
    };
  }
};
