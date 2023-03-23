import React, { useMemo } from 'react';
import { FiUsers } from 'react-icons/fi';
import { AiOutlineNotification } from 'react-icons/ai';
import { HiOutlineCollection } from 'react-icons/hi';
import { IoExitOutline } from 'react-icons/io5';
import { RiUserSettingsLine, RiUserStarLine } from 'react-icons/ri';
import { PieChartOutlined } from '@ant-design/icons';

import { INavbarProps, MenuItem } from './interfaces';
import { Container, StyledMenu } from './styles';
import { useCustomRouter } from '../../../../../hooks';

export const Navbar: React.FC<INavbarProps> = ({ page }) => {
  const router = useCustomRouter();

  const menuItems: MenuItem[] = useMemo(
    () => [
      {
        label: 'Jobs',
        key: '1',
        icon: <PieChartOutlined style={{ fontSize: '1.1rem' }} />,
        page: 'mainscreen',
        onClick: () => router.push('/mainscreen'),
      },
      {
        label: 'Notificações',
        key: '2',
        icon: <AiOutlineNotification style={{ fontSize: '1.1rem' }} />,
        page: 'notifications',
        onClick: () => router.push('/notifications'),
      },
      {
        label: 'Setores',
        key: '3',
        icon: <HiOutlineCollection style={{ fontSize: '1.1rem' }} />,
        page: 'sectors',
        onClick: () => router.push('/sectors'),
      },
      {
        label: 'Usuários',
        key: '4',
        icon: <FiUsers style={{ fontSize: '1.1rem' }} />,
        children: [
          {
            label: 'Colaboradores',
            key: '41',
            icon: <RiUserSettingsLine style={{ fontSize: '1.1rem' }} />,
            page: 'collaborators',
            onClick: () => router.push('/collaborators'),
          },
          {
            label: 'Clientes',
            key: '42',
            icon: <RiUserStarLine style={{ fontSize: '1.1rem' }} />,
            page: 'customers',
            onClick: () => router.push('/customers'),
          },
        ],
      },
      {
        label: 'Sair',
        key: '5',
        icon: <IoExitOutline style={{ fontSize: '1.1rem' }} />,
        onClick: () => router.push('/signout'),
      },
    ],
    [router],
  );

  const selectedItem = useMemo(
    () => String(menuItems.find(e => e.page === page)?.key),
    [menuItems, page],
  );

  return (
    <Container>
      <StyledMenu
        defaultSelectedKeys={[selectedItem]}
        defaultOpenKeys={[selectedItem]}
        mode="inline"
        theme={'dark' as any}
        items={menuItems}
      />
    </Container>
  );
};
