import axios from 'axios';
import axiosClient from '../axiosClient';
import { ProductType } from '@/models/api';
import { mockProductTypes } from '../mockData/productTypes';

const API_ROUTE = process.env.API_ROUTE || 'http://localhost:3000';

//use axios in this file to fetch types of products
// make like loadStaticPathsexport const signUp = async (
//   userData: UserCredentialsModel
// ): Promise<AxiosResponse<UserDataModel>> => {
//   try {
//     const response = await axiosClient.post(
//       'http://localhost:3000/auth/register',
//       userData
//     );
//     return response.data;
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       console.error('Axios error signing up user:', error.message);
//     } else {
//       console.error('Unknown error signing up user:', error);
//     }
//     throw error;
//   }
// };

export const getProductTypes = async (): Promise<ProductType[]> => {
  try {
    console.log('API_ROUTE:', API_ROUTE);
    const response = await axiosClient.get('/product-types');
    console.log('API Response:', response.data);

    // The API returns {success, data, error, message} format
    if (response.data.success && response.data.data) {
      return response.data.data;
    } else {
      throw new Error('API returned unsuccessful response');
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.warn('API not available, using mock data:', error.message);
    } else {
      console.warn(
        'Unknown error fetching product types, using mock data:',
        error
      );
    }

    // Return mock data as fallback for development
    return mockProductTypes;
  }
};
