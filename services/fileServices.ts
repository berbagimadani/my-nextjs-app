import { fileRepository } from "@/repositories/fileRepository";

class FileService {
  async getAllFiles() {
    // Contoh: Tambahkan logika filter, sorting, dll.
    const users = await fileRepository.getAllFiles(1, "aa");
    return users;
  }
}

export const fileService = new FileService();
