import { pb } from '../../api';
import { toast } from 'react-toastify';

export const signUp = async (body, navigate) => {
  try {
    await pb.collection('users').create(body);
    navigate('../SignIn');
  } catch (e) {
    toast(e.data.message, {
      position: 'top-center',
      autoClose: 3000,
      type: 'error',
    });
  } finally {
    console.log(body);
  }
};
