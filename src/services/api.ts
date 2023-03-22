import axios from 'axios';

export const api = {
  user: axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}/user`,
  }),
  collaborator: axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}/collaborator`,
  }),
};
