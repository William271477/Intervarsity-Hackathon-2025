"use client";
import React from 'react'
import Navigation from "@/components/Navigation";
import { usePathname } from "next/navigation";

const ClientWrapper = ({children}) => {
  const pathname = usePathname();
  const hideNavbar = pathname === "/";

  return (
    <>
      {children}
      {!hideNavbar && <Navigation />}
    </>
  );
}

export default ClientWrapper
