"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { LogOut } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";

export default function Header() {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="px-4 md:px-8 flex h-14 items-center">
        <div className="flex-1">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/" asChild>
                  <Link href="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              {pathSegments.map((segment, index) => {
                const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
                const isLast = index === pathSegments.length - 1;
                const formattedSegment =
                  segment.charAt(0).toUpperCase() + segment.slice(1);

                return (
                  <React.Fragment key={href}>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      {isLast ? (
                        <BreadcrumbPage>{formattedSegment}</BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink href={href} asChild>
                          <Link href={href}>{formattedSegment}</Link>
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                  </React.Fragment>
                );
              })}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <nav className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/signout">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
