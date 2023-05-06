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
          <div className="p-4 absolute bottom-0 bg-gray-900 w-full text-gray-200">
            <footer>Devepoled by Abrxao</footer>
          </div>
        </body>
      </html>
    </QueryClientProvider>
  );
}
