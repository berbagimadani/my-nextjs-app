import Layout from "../components/layout";
import { ChartDemo } from "@/components/chart"; 
import { EnergyBadge } from "@/components/custom/energy-badge"; 
import { MyPieChart } from "@/components/my-pie-chart";  

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
 
    </Layout>
  );
};

export default Page;