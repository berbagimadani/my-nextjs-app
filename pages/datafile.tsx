import { fetchFile } from '@/lib/actions/fetchfileMemoryCache';

export const getStaticProps = async () => {
  const pageSize = 40;
  const page = 1; // Misalnya Anda ingin mendapatkan halaman 1
  const result = await fetchFile(page, pageSize);

  return {
    props: {
      files: result.data, // Data yang didapatkan dari fetchFile
    },
    revalidate: 60, // Data akan di-refresh setiap 60 detik
  };
};

export default function FilesPage({ files }: { files: any[] }) {
  return (
    <div>
      <h1>Files</h1>
      {files.map((file) => (
        <div key={file.id}>
          <h3>{file.filename}</h3>
          <img src={file.url} alt={file.filename} />
        </div>
      ))}
    </div>
  );
}
