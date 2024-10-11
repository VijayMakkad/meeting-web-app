import Navbar from "@/components/ui/Navbar";
import Sidebar from "@/components/ui/Sidebar";
import { Metadata } from "next";

import React, { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Makkad Meet",
  description: "Video Calling app",
  icons:{
    icon:'/icons/logo.svg'
  }
};

const HomeLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative">
      <Navbar/>
      <div className="flex">
        <Sidebar/>
        <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-28 max-md:pb-14 sm:x-14">
          <div className="w-full">{children}</div>
        </section>
      </div>
    </div>
  );
};

export default HomeLayout;
