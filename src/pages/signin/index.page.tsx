import React, { useCallback, useState } from 'react';
import Cookies from 'js-cookie';
import { GetServerSideProps } from 'next';

import { Button } from 'antd';
import {
  updateApiTokenFromCookie,
  forceTokenToExpire,
  validateEmail,
} from '../../utils';
import { useToast, useCustomRouter } from '../../hooks';
import { getProfile } from '../../controllers/user';
import { signIn } from '../../controllers/auth';
import { FormContainer } from './styles';
import { PasswordInput, TextInput } from '../../components/Inputs';

const SignIn: React.FC = () => {
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
        title: 'Falha na autenticação',
        description:
          'Ocorreu um erro ao fazer login, verifique as credenciais.',
      });
    }
  }, [addToast, email, password, router]);

  return (
    <FormContainer>
      <TextInput
        value={email}
        onInputChange={setEmail}
        onKeyDown={e => e.key === 'Enter' && handleSubmit()}
        error={emailError}
        placeholder="E-mail"
      />

      <PasswordInput
        value={password}
        onInputChange={setPassword}
        onKeyDown={e => e.key === 'Enter' && handleSubmit()}
        error={passwordError}
        placeholder="Senha"
      />

      <Button onClick={handleSubmit}>Entrar</Button>
    </FormContainer>
  );
};

export default SignIn;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  try {
    updateApiTokenFromCookie(req);

    await getProfile();
    return {
      redirect: {
        destination: '/mainscreen',
        permanent: false,
      },
    };
  } catch (err) {
    forceTokenToExpire(res);

    return { props: { selectedPage: 'signin', pageTitle: 'Sign in' } };
  }
};
