"use server";

import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { filesTable } from '../../database/schema';
import { desc } from 'drizzle-orm';
import { unstable_cache } from 'next/cache'

const db = drizzle(process.env.DATABASE_URL!);

const getFiles = unstable_cache(
  async (page: number, pageSize: number) => {
    return await db.select()
      .from(filesTable)
      .orderBy(desc(filesTable.id))
      .limit(pageSize) // the number of rows to return
      .offset((page - 1) * pageSize);
  },
  ['files'],
  { revalidate: 120, tags: ['files'] }
)

export const fetchFile = async (page: number, pageSize: number) => {
  try { 
    // const data = await db.select()
    //   .from(filesTable)
    //   .orderBy(desc(filesTable.id))
    //   .limit(pageSize) // the number of rows to return
    //   .offset((page - 1) * pageSize);

    const data =  await getFiles(page, pageSize)

    return {
      success: true,
      data: JSON.parse(JSON.stringify(data)),
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      message: "An error occurred while creating the book",
    };
  }
};
