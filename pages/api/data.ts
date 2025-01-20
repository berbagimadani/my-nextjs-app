import { NextApiRequest, NextApiResponse } from 'next';

// const getData = async () => {
//   // Fetch data dari API atau database
//   const response = await fetch('https://api.example.com/data');
//   return response.json();
// };

export const getStaticProps = async () => {
  const respons = await fetch('https://dummyjson.com/products');
  const data = await respons.json();
  return {
    props: {
      products: data.products
    },
    revalidate: 1060, // Caching selama 1 menit
  };
};


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const props = await getStaticProps(); 
  return res.json(props.props.products);
}

