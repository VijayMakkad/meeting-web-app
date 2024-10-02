"use client";
import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { siderbarLinks } from "@/constants";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const MobileNav = () => {
  const pathName = usePathname();
  return (
    <section className="text-end w-full max-w-[264px]">
      <Sheet>
        <SheetTrigger>
          <Image
            src="/icons/hamburger.svg"
            width={36}
            height={36}
            alt="hamburger"
            className="cursor-pointer lg:hidden"
          />
        </SheetTrigger>
        <SheetContent
          side="left"
          className="flex flex-col border-none bg-dark-1"
        >
          <Link href="/" className="flex items-center gap-1">
            <Image
              src="icons/logo.svg"
              width={32}
              height={32}
              alt="GG meeting"
              className="max-sm:size-10"
            />
            <p className="text-[26px] font-extrabold text-white">GG</p>
          </Link>
          <div className="flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto">
            <section className="flex h-full flex-col gap-6 pt-16 text-white">
              {siderbarLinks.map((link) => {
                const isHome = link.route === "/";
                const isActive = isHome
                  ? pathName === link.route // Exact match for home
                  : pathName.startsWith(link.route); // Match any route that starts with link.route

                return (
                  <SheetClose asChild key={link.route} >
                    <Link
                      href={link.route}
                      className={cn(
                        "flex gap-4 items-center p-4 rounded-lg w-full max-w-60",
                        {
                          "bg-blue-1": isActive,
                        }
                      )}
                    >
                      <Image
                        src={link.imgUrl}
                        alt={link.label}
                        width={20}
                        height={20}
                      />
                      <p className="font-semibold">
                        {link.label}
                      </p>
                    </Link>
                  </SheetClose>
                );
              })}
            </section>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNav;
