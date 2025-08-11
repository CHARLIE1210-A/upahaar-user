
"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Gift, LogIn } from 'lucide-react';
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const email = (document.getElementById("email") as HTMLInputElement)
    .value;
    const password = (document.getElementById("password") as HTMLInputElement)
    .value;
    try {
      const payload = {
        email: email, 
        password: password,  
      };
  
      const res = await fetch("http://localhost:8085/api/auth/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      if (!res.ok) {
        throw new Error("Signup failed");
      }
      setIsLoggedIn(true);
      const data = await res.json();
      
      console.log("Token",data.token)
      if (data.token) {
        localStorage.setItem("isLoggedIn", "true");  
        localStorage.setItem("token", data.token);
      }
  
      router.push("/home");
    } catch (err) {
      console.error(err);
      alert("Signup failed. Please try again.");
    }
  };
  
  const GoogleIcon = () => (
    <svg className="mr-2 h-4 w-4" viewBox="0 0 48 48">
      <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
      <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
      <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.222,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
      <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l6.19,5.238C39.999,35.536,44,30.138,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
    </svg>
  );

  return (
    <div className="flex items-center justify-center min-h-screen bg-secondary/50">
      <Card className="w-full max-w-sm mx-auto shadow-lg rounded-xl">
        <CardHeader className="text-center">
          <Link href="/" className="flex items-center gap-2 justify-center mb-2">
            <Gift className="h-8 w-8 text-primary" />
            <span className="text-3xl font-bold font-headline text-primary">Upahaar</span>
          </Link>
          <CardTitle className="text-2xl font-headline font-semibold text-foreground">Welcome Back!</CardTitle>
          <CardDescription className="text-muted-foreground">
            Sign in to continue to your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 p-6">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" required className="rounded-md shadow-sm border-primary/50 focus:ring-primary"/>
            </div>
            <div className="space-y-1">
               <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="#" className="text-sm text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input id="password" type="password" required className="rounded-md shadow-sm border-primary/50 focus:ring-primary" />
            </div>
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-3 rounded-md shadow-md hover:shadow-lg transition-all">
              <LogIn className="mr-2 h-5 w-5" /> Login
            </Button>
          </form>
          
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

           <Button variant="outline" className="w-full rounded-md shadow-sm">
             <GoogleIcon />
             Login with Google
          </Button>

        </CardContent>
        <CardFooter className="p-6 pt-0 text-center text-sm">
          <p className="text-muted-foreground w-full">
            Don't have an account?{' '}
            <Link href="/signup" className="font-semibold text-primary hover:underline">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
