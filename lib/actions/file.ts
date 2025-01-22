"use server";

import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { usersTable } from '../../src/db/schema';

const db = drizzle(process.env.DATABASE_URL!);

interface fileType {
    filename: string;
}

export const createFile = async (params: fileType) => {
  try {
    const newBook = await db
      .insert(usersTable)
      .values(params)
      .returning();

    return {
      success: true,
      data: JSON.parse(JSON.stringify(newBook[0])),
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      message: "An error occurred while creating the book",
    };
  }
};
