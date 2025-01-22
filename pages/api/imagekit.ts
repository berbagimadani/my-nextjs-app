import ImageKit from "imagekit" 
import { NextApiRequest, NextApiResponse } from 'next';

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY!,
  privateKey: process.env.PRIVATE_KEY!,
  urlEndpoint: process.env.NEXT_PUBLIC_URL_ENDPOINT!,
});

// export default async function GET(request) {
//   return NextResponse.json(imagekit.getAuthenticationParameters());
// }


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  return res.json(imagekit.getAuthenticationParameters());
}
