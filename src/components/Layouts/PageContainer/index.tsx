import React, { PropsWithChildren } from 'react';
import Head from 'next/head';

import { Navbar } from './components/Navbar';
import { Container, ContentWrapper, Content } from './styles';
import { AppPropsType } from '../../../pages/_app.page';

export const PageContainer: React.FC<PropsWithChildren<AppPropsType>> = ({
  user,
  children,
  selectedPage = '',
  pageTitle = 'SMM',
}) => {
  return (
    <Container>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <ContentWrapper>
        {user ? (
          <>
            <Navbar page={selectedPage} />
            <Content>{children}</Content>
          </>
        ) : (
          <>{children}</>
        )}
      </ContentWrapper>
    </Container>
  );
};
