"use server";

import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { filesTable } from '../../database/schema';
import { desc } from 'drizzle-orm';
import { eq } from 'drizzle-orm';

const db = drizzle(process.env.DATABASE_URL!);

export const getFile = async (fileid: string) => {
  try { 
    const data = await db.select()
      .from(filesTable)
      .orderBy(desc(filesTable.id))
      .where(eq(filesTable.fileid, fileid))
 
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
