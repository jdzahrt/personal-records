import { getServerSession } from 'next-auth/next';
import { authOptions } from '../pages/api/auth/[...nextauth]';

// eslint-disable-next-line import/prefer-default-export
export const getSessionUser = async (req, res) => {
  const session = await getServerSession(req, res, authOptions);

  if (session.user.email) { return session.user.email; }
  return null;
};
