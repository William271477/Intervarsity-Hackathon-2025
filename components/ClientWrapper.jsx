"use client";
import React from 'react'

import Navigation from "@/components/Navigation";
import { usePathname } from "next/navigation";
import { AuthProvider } from "@/components/AuthProvider";
import { UserProvider } from "@/components/UserProvider";


const ClientWrapper = ({children}) => {
  const pathname = usePathname();
  const hideNavbar = pathname === "/";

  return (
    <AuthProvider>
      <UserProvider>
        {children}
        {!hideNavbar && <Navigation />}
      </UserProvider>
    </AuthProvider>
  );
}

export default ClientWrapper
