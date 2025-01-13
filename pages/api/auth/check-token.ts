// pages/api/check-token.js
import { NextApiRequest, NextApiResponse } from 'next'; 

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = req.cookies.token;

  if (token) {
    return res.json({ authenticated: true });
  }

  return res.json({ authenticated: false });
};

export default handler;