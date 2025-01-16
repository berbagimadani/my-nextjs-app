"use client"

import Layout from "./components/layout";
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
          {/* <Card className="p-2">
            <CardHeader>
              <CardTitle>Today energy consumption proportion</CardTitle>
            </CardHeader>
            <CardContent>
              <MyPieChart></MyPieChart>
            </CardContent>
          </Card> */}
        </div>
      </div>
    </Layout>
  );
};

export default Page;
