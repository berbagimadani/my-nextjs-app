"use server";

import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { filesTable } from  '../../database/schema';
import { desc } from 'drizzle-orm';

// Memori untuk menyimpan cache
interface Cache {
  [key: string]: any[]; // Key berupa string, value berupa array apa saja
}

const memoryCache: Cache = {}; // Inisialisasi cache sebagai objek
let lastFetchTime = 0;

const cacheExpiry = 3600 * 1000; // Masa berlaku cache: 1 jam

// Fungsi untuk membuat cache key
const getCacheKey = (page: number, pageSize: number): string => `files-page-${page}-size-${pageSize}`;

const db = drizzle(process.env.DATABASE_URL!);

export const fetchfileMemoryCache = async (page: number, pageSize: number) => {
  const cacheKey = getCacheKey(page, pageSize);

  // Cek apakah data tersedia dalam cache dan belum kedaluwarsa
  if (memoryCache[cacheKey] && Date.now() - lastFetchTime < cacheExpiry) {
    return { success: true, data: memoryCache[cacheKey] };
  }

  try {
    // Query ke database jika cache kosong atau kedaluwarsa
    const data = await db
      .select()
      .from(filesTable)
      .orderBy(desc(filesTable.id))
      .limit(pageSize)
      .offset((page - 1) * pageSize);

      
    // Simpan data ke dalam cache
    memoryCache[cacheKey] = data;
    lastFetchTime = Date.now();

    return { success: true, data: JSON.parse(JSON.stringify(data)) };
  } catch (error) {
    console.error('Error fetching files:', error);
    return { success: false, message: 'An error occurred while fetching the files' };
  }
};