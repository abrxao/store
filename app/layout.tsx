'use client'
import { ReactNode } from "react";
import { QueryClientProvider } from "react-query";
import "./globals.css";
import { queryClient } from "@/utils/queryClient";

export default function RootLayout({ children }: { children: ReactNode }) {
  
  return (
    <QueryClientProvider client={queryClient}>
      <html lang="en" className="bg-gray-800 ">
        {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
        <head />
        <body className="relative min-h-screen pb-24">
          {children}
          
        </body>
      </html>
    </QueryClientProvider>
  );
}
