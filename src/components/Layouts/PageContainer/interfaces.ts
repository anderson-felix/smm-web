import { IconType } from 'react-icons';
import {
  FaBook,
  FaChalkboardTeacher,
  FaHome,
  FaPlayCircle,
} from 'react-icons/fa';
import { HiUserGroup } from 'react-icons/hi';
import { IoMdLogOut } from 'react-icons/io';
import { ITeacher } from '../../../interfaces/teacher';

export interface IHeaderProps {
  teacher: ITeacher;
  logo?: string;
  page?: string;
  title?: string;
}

interface PageTitle {
  header: string;
  page: string;
}

type LabelMapper = { [x: string]: { title: PageTitle } };

export const labelsMapper: LabelMapper = {
  mainscreen: {
    title: { header: '', page: 'Menu principal' },
  },
  projects: {
    title: { header: 'Projetos', page: 'Projetos' },
  },
  project: {
    title: { header: '', page: 'Projeto' },
  },
  students: {
    title: { header: 'Alunos', page: 'Alunos' },
  },
  classes: {
    title: { header: 'Turmas', page: 'Turmas' },
  },
  class: {
    title: { header: 'Turma', page: 'Turma' },
  },
  signout: {
    title: { header: '', page: 'Turma' },
  },
  signin: {
    title: { header: 'Login', page: 'Login' },
  },
  signup: {
    title: { header: 'Cadastro', page: 'Cadastro' },
  },
  profile: {
    title: { header: 'Perfil', page: 'Perfil' },
  },
  module: {
    title: { header: 'Módulo', page: 'Módulo' },
  },
  modules: {
    title: { header: 'Formação', page: 'Formação' },
  },
  categories: {
    title: { header: 'Vídeos', page: 'Vídeos' },
  },
};

interface MenuOption {
  label: string;
  icon: IconType;
  location?: string;
}

type MenuType = { [page: string]: MenuOption };

export const navbarMenu: MenuType = {
  mainscreen: {
    icon: FaHome,
    location: 'mainscreen',
    label: 'Início',
  },
  modules: {
    icon: FaChalkboardTeacher,
    location: 'modules',
    label: 'Formação',
  },
  categories: {
    icon: FaPlayCircle,
    location: 'categories',
    label: 'Vídeos',
  },
  classes: {
    icon: HiUserGroup,
    location: 'classes',
    label: 'Turmas',
  },
  books: {
    icon: FaBook,
    location: 'books',
    label: 'Biblioteca',
  },
  signout: {
    icon: IoMdLogOut,
    location: 'signout',
    label: 'Sair',
  },
};
