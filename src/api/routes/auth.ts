import axios, { AxiosResponse } from 'axios';
import UserCredentialsModel from '@/models/UserCredentialsModel';
import UserDataModel from '@/models/UserDataModel';
import axiosClient from '../axiosClient';

export const signUp = async (
  userData: UserCredentialsModel
): Promise<AxiosResponse<UserDataModel>> => {
  try {
    const response = await axiosClient.post(
      'http://localhost:3000/auth/register',
      userData
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error signing up user:', error.message);
    } else {
      console.error('Unknown error signing up user:', error);
    }
    throw error;
  }
};

export const signIn = async (credentials: UserCredentialsModel) => {
  try {
    const response = await axiosClient.post(
      'http://localhost:3000/auth/login',
      credentials
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error signing in user:', error.message);
    } else {
      console.error('Unknown error signing in user:', error);
    }
    throw error;
  }
};
