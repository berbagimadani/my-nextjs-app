// pages/api/auth/login.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    // Kirim request ke REST API eksternal
    const { data } = await axios.post('https://dummyjson.com/auth/login', req.body);

    // Simpan token di HTTP-only cookie (lebih aman)
    res.setHeader('Set-Cookie', `token=${data.accessToken}; HttpOnly; Path=/; Max-Age=3600`);

    // Kirim response ke client
    res.status(200).json({ user: data }); 


  } catch (error) {
    // Periksa apakah error dari response API
    if (axios.isAxiosError(error) && error.response) {
      console.error('API Error:', error.response.data);
      res.status(error.response.status).json({
        message: error.response.data.message || 'Invalid credentials',
      });
    } else {
      // Tangani error tak terduga
      console.error('Unexpected error:', error);
      res.status(500).json({
        message: 'An unexpected error occurred.',
      });
    }
    // res.status(error.response?.status || 500).json({
    //   message: error.response?.data?.message || 'An error occurred',
    // });
  }
}
// pages/api/auth/login.ts
// import type { NextApiRequest, NextApiResponse } from 'next';

// export default function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'POST') {
//     const { username, password } = req.body;

//     // Contoh respons sukses
//     if (username === 'admin' && password === 'password123') {
//       res.status(200).json({ message: 'Login successful', token: 'dummy_token' });
//     } else {
//       res.status(401).json({ message: 'Invalid credentials' });
//     }
//   } else {
//     // Jika bukan metode POST
//     res.setHeader('Allow', ['POST']);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }
