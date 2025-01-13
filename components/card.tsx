import { BellRing } from "lucide-react"

import { cn } from "@/lib/utils" 
import {
  Card,
  CardContent,
  CardDescription, 
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
 
interface CardDemoProps {
  title: string;
  total: string;
}

export function CardDemo({ title, total }: CardDemoProps) {
  return (
    <Card className={cn("w-[380px]")}>
      <CardHeader>
        <h2> {title}</h2>
        <CardTitle className="text-2xl">Rp { total } </CardTitle>
        <CardDescription>You have 3 unread messages.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className=" flex items-center space-x-4 rounded-md border p-4">
          <BellRing />
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">
              Push Notifications
            </p>
            <p className="text-sm text-muted-foreground">
              Send notifications to device.
            </p>
          </div>
          <Switch />
        </div>
        <div> 
        </div>
      </CardContent> 
    </Card>
  )
}
