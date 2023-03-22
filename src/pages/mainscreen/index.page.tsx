import React, { useCallback, useState } from 'react';
import Cookies from 'js-cookie';
import { GetServerSideProps } from 'next';

import { Input } from 'antd';
import {
  updateApiTokenFromCookie,
  forceTokenToExpire,
  validateEmail,
} from '../../utils';
import { useToast, useCustomRouter } from '../../hooks';
import { getProfile } from '../../controllers/user';
import { signIn } from '../../controllers/shared';
import { Container, FormContainer } from './styles';

const Mainscreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const { addToast } = useToast();
  const router = useCustomRouter();

  const handleSubmit = useCallback(async () => {
    if (!email || !validateEmail(email)) {
      setEmailError('Insira um e-mail válido');
      return;
    }
    if (password.length < 8) {
      setPasswordError('A senha deve ter no mínimo 8 caracteres');
      return;
    }
    setEmailError('');
    setPasswordError('');

    try {
      const { token } = await signIn({ email, password });

      Cookies.set('token', token, { expires: 1 });

      router.push(`/mainscreen`);
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Ocorreu um erro ao fazer login, chegue as credenciais.',
      });
    }
  }, [addToast, email, password, router]);

  return (
    <Container>
      <FormContainer>
        HELLO FROM SOCIAL MEDIA MANAGER
        {/* <PrimaryButton title="Entrar" onClick={handleSubmit} /> */}
      </FormContainer>
    </Container>
  );
};

export default Mainscreen;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  try {
    updateApiTokenFromCookie(req);

    await getProfile();
    return { props: { selectedPage: 'mainscreen', pageTitle: 'Home' } };
  } catch (err) {
    forceTokenToExpire(res);
    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      },
    };
  }
};
