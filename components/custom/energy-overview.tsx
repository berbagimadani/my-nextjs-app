import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function EnergyOverview() {
  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Energy consumption overview</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 h-auto">
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
  );
}
