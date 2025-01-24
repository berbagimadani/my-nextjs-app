import Layout from "../../components/layout"; 
import { EnergyBadge } from "@/components/custom/energy-badge";  
// import { Button } from "@/components/ui/button";
// import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getFile } from "@/lib/actions/getfile";
import { BackButton } from "@/components/BackButton";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {  
  const { id } = await params;

  // Ambil data gambar dari database
  const result = await getFile(id);

  // Jika tidak ada data, tampilkan fallback
  if (!result.success || !result.data || result.data.length === 0) {
    return (
      <Layout>
        <div className="text-center py-20">
          <h1 className="text-2xl font-semibold">File Not Found</h1>
          <Link href="/files" className="text-blue-500 underline">
            Go Back
          </Link>
        </div>
      </Layout>
    );
  }

  const file = result.data[0]; // Asumsikan hanya menggunakan file pertama

  return (
    <Layout>
      {/* Header */}
      <div className="flex justify-between items-center mb-5">
        <div className="flex items-center">
          {/* <Link href="/files">
            <Button variant="outline" size="icon" className="mr-2">
              <ChevronLeft />
            </Button>
            Go Back
          </Link> */}
           <BackButton />  
        </div>
        <h1 className="text-lg font-bold">Chart {id}</h1>
      </div>

      {/* Content */}
      <div className="flex flex-col xl:flex-row gap-6">
        {/* Badge Section */}
        <div className="w-full xl:w-2/5">
          <EnergyBadge />
        </div>

        {/* Image Section */}
        <div className="w-full xl:w-3/5">
          <div className="relative w-full h-fit rounded-md overflow-hidden shadow-lg">
            <Image
              src={file.url || "/fallback-image.png"}
              alt={file.filename || "Fallback"} 
              width={1900} // Atur width sesuai kebutuhan
              height={1000} // Atur height sesuai kebutuhan
              style={{
                objectFit: "cover", // Mengganti objectFit dengan style CSS
              }}
              priority={true} // Beri prioritas loading gambar ini
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}