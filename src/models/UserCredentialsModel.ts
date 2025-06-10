export default interface UserCredentialsModel {
  email: string;
  password: string;
  role?: 'USER' | 'ADMIN';
}
