"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Layout from "./components/layout";
import { ChartDemo } from "@/components/chart"; 
import { MyPieChart } from "@/components/my-pie-chart";

const Page = () => {
  return (
    <Layout>
      <div className="flex flex-col xl:flex-row gap-4">
        <div className="w-full xl:w-2/5">
          <Card className="">
            <CardHeader>
              <CardTitle>Energy consumption overview</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-3 gap-2 pb-8 pt-8">
                  <Card>
                    <CardHeader>
                      <div className="flex justify-center items-center">
                        <h2 className="text-4xl p-2">Icon</h2>
                      </div> 
                    </CardHeader>
                  </Card>
                  <Card>
                    <CardHeader>
                      <div className="flex flex-col items-center justify-center">
                        <CardTitle className="">Today</CardTitle>
                        <CardDescription className="p-2 text-2xl font-semibold">
                          <div>12.5K</div>
                        </CardDescription>
                      </div> 
                    </CardHeader>
                  </Card>
                  <Card>
                    <CardHeader>
                    <div className="flex flex-col items-center justify-center">
                        <CardTitle className="">This month</CardTitle>
                        <CardDescription className="p-2 text-2xl font-semibold">
                          <div>212.5K</div>
                        </CardDescription>
                      </div> 
                    </CardHeader>
                  </Card>
                </div>
                <div className="h-5"></div>
                <div className="grid grid-cols-3 gap-2">
                  <Card>
                    <CardHeader>
                      <div className="flex justify-center items-center">
                        <h2 className="text-4xl p-2">Icon</h2>
                      </div> 
                    </CardHeader>
                  </Card>
                  <Card>
                    <CardHeader>
                      <div className="flex flex-col items-center justify-center">
                        <CardTitle className="">Today</CardTitle>
                        <CardDescription className="p-2 text-2xl font-semibold">
                          <div>12.5K</div>
                        </CardDescription>
                      </div> 
                    </CardHeader>
                  </Card>
                  <Card>
                    <CardHeader>
                    <div className="flex flex-col items-center justify-center">
                        <CardTitle className="">This month</CardTitle>
                        <CardDescription className="p-2 text-2xl font-semibold">
                          <div>212.5K</div>
                        </CardDescription>
                      </div> 
                    </CardHeader>
                  </Card>
                </div>
            </CardContent>
          </Card>
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
