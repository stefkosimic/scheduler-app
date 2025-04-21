"use client";

import Nav from "@/components/nav";

export default function BottomNav() {
  return (
    <div className="fixed bottom-0 left-0 z-50 h-16 w-full border-t bg-background md:hidden">
      <Nav
        className="flex h-full items-center justify-around px-4"
        buttonClassName="h-full"
      />
    </div>
  );
}
