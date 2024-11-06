export const withAuth = (token: string) => ({
  headers: { Authorization: `Bearer ${token}` },
});
