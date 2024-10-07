import axios from 'axios';
import api from '../apis/api';

export const patchPassword = async (password: string) => {
  await axios.patch(`${api.admin}/password`, {
    password: password,
  });
};
