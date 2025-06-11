import UserCredentialsModel from './UserCredentialsModel';

export interface SignInData {
  access_token: string;
  user: UserCredentialsModel;
}

export interface SignInResponse {
  success: boolean;
  data: SignInData;
  error: string | null;
  message: string;
}
