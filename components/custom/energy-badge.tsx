// import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; 
//import { randomNumber } from '../../utils/random';

export function EnergyBadge() {
 //const randomUpTo100 = randomNumber(100);


  //const [randomUpTo100, setRandomUpTo100] = useState<number | null>(null);

  // Hasilkan nilai acak di sisi klien
  // useEffect(() => {
  //   setRandomUpTo100(randomNumber(600));
  // }, []);
  
  return (  
    <Card className="pb-4">
      <CardHeader>
        <CardTitle>Energy consumption overview</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 h-auto">
        <div className="grid grid-cols-3 gap-2 border-b border-t border-r">
          <button
            key=""
            data-active=""
            className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
         
          >
            <span className="text-lg font-bold leading-none sm:text-3xl">
              Icon
            </span>
          </button>

          {["Today", "This month"].map((key) => {
            return (
              <button
                key={key}
                data-active=""
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                
              >
                <span className="text-xs text-muted-foreground">{key}</span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                    <span suppressHydrationWarning >
                      {Math.floor(Math.random() * 100)}K
                    </span>
                </span>
              </button>
            );
          })}
        </div>
      </CardContent>
      <CardContent className="flex-1 h-auto">
        <div className="grid grid-cols-3 gap-2 border-b border-t border-r">
          <button
            key=""
            data-active=""
            className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
         
          >
            <span className="text-lg font-bold leading-none sm:text-3xl">
              Icon
            </span>
          </button>

          {["Today", "This month"].map((key) => {
            return (
              <button
                key={key}
                data-active=""
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                 
              >
                <span className="text-xs text-muted-foreground">{key}</span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                    <span suppressHydrationWarning >
                      {Math.floor(Math.random() * 200)}K
                    </span>
                </span>
              </button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
