import React, { useCallback, useState } from 'react';
import { GetServerSideProps } from 'next';

import { AiOutlinePlusCircle } from 'react-icons/ai';
import {
  updateApiTokenFromCookie,
  forceTokenToExpire,
  logError,
  validateEmail,
  validatePhone,
  validateDocument,
  generatePassword,
} from '../../utils';
import { getProfile } from '../../controllers/user';
import { Container, StyledButton, TopContent } from './styles';
import { Modal } from '../../components/Modal';
import {
  createCollaborator,
  listCollaborators,
  updateCollaborator,
  removeCollaborator,
} from '../../controllers/colaborator';
import { IUser } from '../../interfaces/user';
import { useLoading, useToast } from '../../hooks';
import { CollaboratorList } from './components/CollaboratorList';
import { CollaboratorModalContent } from './components/CollaboratorModalContent';
import { ICollaborator } from '../../interfaces/collaborator';
import { listSectors } from '../../controllers/sector';
import { ISector } from '../../interfaces/sector';

interface IProps {
  collaborators: ICollaborator[];
  sectors: ISector[];
  user: IUser;
}

const defaultCollaboratorObject: ICollaborator = {
  id: '',
  created_by: '',
  name: '',
  description: null,
  federal_document: '',
  email: '',
  phone: '',
  hourly_price: null,
  address: null,
  recent_flags: [],
  sectors: [],
};

const Collaborators: React.FC<IProps> = ({
  user,
  sectors,
  collaborators: _collaborators,
}) => {
  const [collaborators, setCollaborator] = useState(_collaborators);
  const [openModal, setOpenModal] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [openCredentialsModal, setOpenCredentialsModal] = useState(false);
  const [targetCollaborator, setTargetCollaborator] = useState<ICollaborator>(
    defaultCollaboratorObject,
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { addToast } = useToast();
  const { setLoadingConfig } = useLoading();

  const handleCancel = () => {
    setOpenModal(false);
    setTargetCollaborator(defaultCollaboratorObject);
  };

  const handleCollaboratorClick = (collaborator: ICollaborator) => {
    setTargetCollaborator(collaborator);
    setOpenModal(true);
  };

  const handleNewCollaborator = () => {
    setTargetCollaborator(defaultCollaboratorObject);
    setOpenModal(true);
  };

  const handleRemoveClick = (collaborator: ICollaborator) => {
    setTargetCollaborator(collaborator);
    setOpenConfirmModal(true);
  };

  const handleSave = useCallback(async () => {
    setLoadingConfig(config => ({ ...config, isLoading: true }));
    try {
      const { name, email, federal_document, phone } = targetCollaborator;
      setErrors({});

      if (!name) {
        setErrors({ name: 'Insira um nome' });
        return;
      }
      if (!email || !validateEmail(email)) {
        setErrors({ email: 'Insira um e-mail válido' });
        return;
      }
      if (!federal_document || !validateDocument(federal_document)) {
        setErrors({ federal_document: 'Insira um documento válido' });
        return;
      }
      if (!phone || !validatePhone(phone)) {
        setErrors({ phone: 'Insira um número de telefone válido' });
        return;
      }

      setErrors({});

      const collaboratorDTO = {
        name: targetCollaborator.name,
        description: targetCollaborator.description || null,
        federal_document: targetCollaborator.federal_document,
        email: targetCollaborator.email,
        phone: targetCollaborator.phone,
        hourly_price: targetCollaborator.hourly_price || null,
        address: targetCollaborator.address || null,
        sector_ids: targetCollaborator.sectors.map(s => s.id),
      };
      const password = generatePassword();

      if (!targetCollaborator.id) {
        await createCollaborator({ ...collaboratorDTO, password });
        (targetCollaborator as any).password = password;
        setCollaborator(e => [targetCollaborator, ...e]);
        setOpenModal(false);
        setOpenCredentialsModal(true);
        return;
      }

      delete collaboratorDTO.federal_document;

      await updateCollaborator({
        id: targetCollaborator.id,
        ...collaboratorDTO,
      });

      setCollaborator(e =>
        e.map(collaborator =>
          collaborator.id === targetCollaborator.id
            ? targetCollaborator
            : collaborator,
        ),
      );
      setOpenModal(false);
      setTargetCollaborator(defaultCollaboratorObject);
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Falha ao atualizar colaborador',
        description: err?.message,
      });
    } finally {
      setLoadingConfig(config => ({ ...config, isLoading: false }));
    }
  }, [addToast, setLoadingConfig, targetCollaborator]);

  const handleRemove = useCallback(async () => {
    setLoadingConfig(config => ({ ...config, isLoading: true }));

    try {
      if (!targetCollaborator.id) return;

      await removeCollaborator(targetCollaborator.id);
      setCollaborator(e =>
        e.filter(sector => sector.id !== targetCollaborator.id),
      );
      setOpenConfirmModal(false);
      setTargetCollaborator(defaultCollaboratorObject);
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Falha ao remover colaborador',
        description: err?.message,
      });
    } finally {
      setLoadingConfig(config => ({ ...config, isLoading: false }));
    }
  }, [addToast, setLoadingConfig, targetCollaborator]);

  return (
    <Container>
      <TopContent>
        <StyledButton onClick={handleNewCollaborator}>
          <AiOutlinePlusCircle style={{ fontSize: '1.3rem' }} />
          Adicionar
        </StyledButton>
      </TopContent>
      <CollaboratorList
        collaborators={collaborators}
        onCollaboratorClick={handleCollaboratorClick}
        onRemoveClick={handleRemoveClick}
      />
      <Modal
        onCancel={handleCancel}
        onConfirm={handleSave}
        title={`${
          targetCollaborator.id ? 'Editar' : 'Adicionar novo'
        } colaborador`}
        show={openModal}
        width="30rem"
      >
        <CollaboratorModalContent
          collaborator={targetCollaborator}
          setCollaborator={setTargetCollaborator}
          errors={errors}
          user={user}
          sectors={sectors}
        />
      </Modal>
      <Modal
        onCancel={() => setOpenConfirmModal(false)}
        onConfirm={handleRemove}
        title="Tem certeza disso?"
        show={openConfirmModal}
        width="30rem"
      >
        Tem certeza que deseja remover o colaborador? Essa é uma ação
        irreversível.
      </Modal>
      <Modal
        onCancel={() => setOpenCredentialsModal(false)}
        onConfirm={() => setOpenCredentialsModal(false)}
        title="Credenciais"
        show={openCredentialsModal}
        width="30rem"
      >
        Anote essas credenciais em algum local seguro, após fechar essa mensagem
        não será possível visualizar a senha novamente.
        <br />
        <br />
        E-mail: <b>{` ${targetCollaborator.email}`}</b>
        <br />
        Senha: <b>{` ${(targetCollaborator as any).password}`}</b>
      </Modal>
    </Container>
  );
};

export default Collaborators;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  try {
    updateApiTokenFromCookie(req);

    const [user, collaborators, sectors] = await Promise.all([
      getProfile(),
      listCollaborators(),
      listSectors(),
    ]);

    return {
      props: {
        user,
        collaborators: collaborators.results,
        sectors: sectors.results,
        selectedPage: 'collaborators',
        pageTitle: 'Colaboradores',
      },
    };
  } catch (err) {
    forceTokenToExpire(res);
    logError('collaborators', err);

    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      },
    };
  }
};
