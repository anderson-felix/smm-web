import React from 'react';
import Link from 'next/link';
import Head from 'next/head';

import { Container, Image, Infos, Message, Description } from './styles';
import NotFoundImage from '../../assets/not-found-image.svg';
import NotFoundBackground from '../../assets/not-found-background.svg';

const NotFound: React.FC = () => {
  return (
    <>
      <Head>
        <title>Not found</title>
      </Head>
      <Container src={NotFoundBackground}>
        <Image src={NotFoundImage} />
        <Infos>
          <Message> NOT FOUND</Message>
          <Description>
            A página que está procurando não existe, pelo menos não por aqui!
          </Description>
          <Link href="/">Voltar a página inicial</Link>
        </Infos>
      </Container>
    </>
  );
};

export default NotFound;
