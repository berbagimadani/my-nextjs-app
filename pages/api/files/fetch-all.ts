import { NextApiRequest, NextApiResponse } from 'next';

import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { filesTable } from '@/database/schema';
import { desc } from 'drizzle-orm'; 

const db = drizzle(process.env.DATABASE_URL!);
 
export const getStaticProps = async (page: number) => {
  const pageSize = 12
  const data = await db.select()
      .from(filesTable)
      .orderBy(desc(filesTable.id))
      .limit(pageSize) // the number of rows to return
      .offset((page - 1) * pageSize);
    return {
        props: {
          files: data
        },
        revalidate: 3600, // Caching expired
      };
};


export default async function handler(req: NextApiRequest, res: NextApiResponse) { 
  const page = parseInt(req.query.page as string) || 1;
  const props = await getStaticProps(page); 
  return res.json(props.props.files);
}

