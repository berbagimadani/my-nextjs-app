import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";


interface Product { 
    id: number;
    title: string;
    price: number;
    stock: number;
    image: string;
}

export async function MyTable2() { 

    try {
        // const data = await fetch('https://dummyjson.com/products');
        // const posts = await data.json(); 
    
        const response = await fetch('https://dummyjson.com/products?limit=10&skip=10', {
          //cache: 'force-cache',
          next: { revalidate: 1020 },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const posts = await response.json();
    
        if (!posts) return <div>Loading...</div>
        
        return (
            <Card className="pb-4">
            <CardHeader>
              <CardTitle>Table logs energy consumption</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 h-auto">
              <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Invoice</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody> 
                  {posts.products.map((product: Product) => (
                    <TableRow key={product.id}>
                        <TableCell className="font-medium">{product.id}</TableCell>
                        <TableCell>{product.title}</TableCell>
                        <TableCell>{product.stock}</TableCell>
                        <TableCell className="text-right">${product.price.toFixed(2)}</TableCell>
                    </TableRow>
                    ))} 
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        );
      } catch (error) {
        console.error('Terjadi kesalahan:', error);
        // Tampilkan pesan kesalahan kepada pengguna atau lakukan tindakan lain
        return (
          <div>
            Terjadi kesalahan saat mengambil data. Silakan coba lagi nanti.
          </div>
        );
      }
      
}
