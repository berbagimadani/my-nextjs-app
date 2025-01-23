import Layout from "../../components/layout";
import { ChartDemo } from "@/components/chart"; 
import { EnergyBadge } from "@/components/custom/energy-badge";  
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

const Page = async({ params }: { params: Promise<{ id: string }> }) => {
  return (
    <Layout> 
      <div className="flex">
        <div className="w-full ml-5">
            <Button variant="outline" size="icon">
                <ChevronLeft />
            </Button>
            <Link className="ml-2" href="/files">Go Back</Link>
        </div>
        <div className="w-full justify-end flex"><h1>{(await params).id}</h1></div>
      </div>
      <div className="flex flex-col xl:flex-row gap-4">
        <div className="w-full xl:w-2/5">
          <EnergyBadge></EnergyBadge>
        </div>
        
        <div className="w-full xl:w-2/4">
          <ChartDemo></ChartDemo>
        </div> 
      </div>
 
    </Layout>
  );
};

export default Page;