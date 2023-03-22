import React, { PropsWithChildren, useState } from 'react';
import Head from 'next/head';

import { Header } from './components/Header';
import { Container, ContentWrapper, Content } from './styles';
import { AppPropsType } from '../../../pages/_app.page';

export const PageContainer: React.FC<PropsWithChildren<AppPropsType>> = ({
  user,
  children,
  selectedPage = '',
  pageTitle = 'SMM',
  headerTitle = '',
}) => {
  const [closeMenu, setCloseMenu] = useState(false);

  return user ? (
    <Container>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <Header page={selectedPage} teacher={user} title={headerTitle} />
      <ContentWrapper>
        {/* <NavBar page={selectedPage} /> */}
        <Content onClick={() => setCloseMenu(!closeMenu)}>{children}</Content>
      </ContentWrapper>
    </Container>
  ) : (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      {children}
    </>
  );
};
