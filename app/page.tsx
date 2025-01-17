import Layout from "./components/layout";
import { ChartDemo } from "@/components/chart"; 
import { EnergyBadge } from "@/components/custom/energy-badge"; 
import { MyPieChart } from "@/components/my-pie-chart"; 
import { MyTable } from "@/components/my-table"; 

const Page = () => {
  return (
    <Layout>
      <div className="flex flex-col xl:flex-row gap-4">
        <div className="w-full xl:w-2/5">
          <EnergyBadge></EnergyBadge>
        </div>
        
        <div className="w-full xl:w-2/4">
          <ChartDemo></ChartDemo>
        </div>

        <div className="w-full xl:w-2/6">
          <MyPieChart></MyPieChart> 
        </div>
      </div>

      <div className="flex flex-col xl:flex-row gap-4 mt-4">
        <div className="w-full">
           <MyTable></MyTable>
        </div>
        <div className="w-full xl:w-2/5">
          <EnergyBadge></EnergyBadge>
        </div>
      </div>
    </Layout>
  );
};

export default Page;



// interface Product { 
//   id: number;
//   title: string;
//   price: number;
//   description: string;
//   image: string;
// }

// export default async function Page() {
//   try {
//     // const data = await fetch('https://dummyjson.com/products');
//     // const posts = await data.json(); 

//     const response = await fetch('https://dummyjson.com/products', {
//       //cache: 'force-cache',
//       next: { revalidate: 3600 },
//     });
//     if (!response.ok) {
//       throw new Error('Failed to fetch data');
//     }
//     const posts = await response.json();

//     if (!posts) return <div>Loading...</div>
    
//     return (
//       <ul>
//         {posts.products.map((post: Product) => (
//           <li key={post.id}>{post.title}</li>
//         ))}
//       </ul>
//     );
//   } catch (error) {
//     console.error('Terjadi kesalahan:', error);
//     // Tampilkan pesan kesalahan kepada pengguna atau lakukan tindakan lain
//     return (
//       <div>
//         Terjadi kesalahan saat mengambil data. Silakan coba lagi nanti.
//       </div>
//     );
//   }
// }