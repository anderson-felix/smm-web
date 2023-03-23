import axios, { AxiosInstance } from 'axios';

export type ApiDomainType = 'user' | 'collaborator';

export const api: Record<ApiDomainType, AxiosInstance> = {
  user: axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}/user`,
  }),
  collaborator: axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}/collaborator`,
  }),
};
