'use client'

import { LoginForm } from "../components/login-form";
import { useEffect, useState } from 'react'; 
import { redirect } from 'next/navigation'

export default function LoginPage() {

  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    fetch('/api/auth/check-token')
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.authenticated) {
          setAuthenticated(true);
        }
      });
  }, []);

  if (authenticated) {
    // Redirect ke dashboard
    console.log('Redirect') 
    redirect(`/dashboard/`) 
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <LoginForm />
      </div>
    </div>
  )
}
