"use client";
import React from 'react'

import Navigation from "@/components/Navigation";
import { usePathname } from "next/navigation";
import { AuthProvider } from "@/components/AuthProvider";


const ClientWrapper = ({children}) => {
  const pathname = usePathname();
  const hideNavbar = pathname === "/";

  return (
    <AuthProvider>
      {children}
      {!hideNavbar && <Navigation />}
    </AuthProvider>
  );
}

export default ClientWrapper
