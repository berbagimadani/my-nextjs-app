'use client'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from 'next/image';

import React, { useState } from 'react';
//import { API_ENDPOINTS } from '@/utils/apiEndpoints';
//import { fetchAPI } from '@/utils/apiHelper';
import { useRouter } from "next/navigation" 
import axios from "axios"
//import axios from 'axios';

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

    interface LoginFormData {
        username: string;
        password: string;
    }

    const [formData, setFormData] = useState<LoginFormData>({
        username: '',
        password: '',
      });
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();

    // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const { name, value } = e.target;
    //     setFormData({ ...formData, [name]: value });
    //   };

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {

            const response = await axios.post('/api/auth/login', formData);
            console.log('Login success:', response.data);
            // const response = await fetchAPI(API_ENDPOINTS.LOGIN, {
            //     method: 'POST',
            //     body: JSON.stringify(formData),
            //     //credentials: "include"
            // }); 
            // const response = await axios.post("https://dummyjson.com/auth/login", formData, {
            //     //withCredentials: true, // Setengah setara dengan credentials: "include"
            // });
            
            router.push('/dashboard'); 
        } catch (err: unknown) { 
        if (err instanceof Error) {
            setError(err.message);
        } else {
            setError('An unexpected error occurred.');
        }
        }
    };
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleLogin}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-balance text-muted-foreground">
                  Login to your Acme Inc account
                </p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="text"
                  placeholder="m@example.com"
                  value={formData.username}
                  onChange={(e) => 
                    setFormData({ 
                      ...formData, 
                      username: e.target.value 
                    }) 
                  }  
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-2 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password" 
                value={formData.password}
                onChange={(e) => 
                  setFormData({ 
                    ...formData, 
                    password: e.target.value 
                  }) 
                }  
                required />
              </div>
              {error && <p className="text-red-500">{error}</p>} {/* Display error message */}
              <Button type="submit" className="w-full">
                Login
              </Button>
                
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <a href="#" className="underline underline-offset-4">
                  Sign up
                </a>
              </div>
            </div>
          </form>
          <div className="relative hidden bg-muted md:block">
            <Image
              src="https://via.placeholder.com/750?text=Image2"
              alt="Image"
              width={500}
              height={500}
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  )
}
