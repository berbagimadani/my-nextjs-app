"use server";

import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { filesTable } from '../../database/schema';
import { desc } from 'drizzle-orm';

const db = drizzle(process.env.DATABASE_URL!);


export const fetchFile = async (page?: number) => {
  try {
    console.log(page)
    const data = await db.select().from(filesTable).orderBy(desc(filesTable.id));

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
