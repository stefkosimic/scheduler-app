"use client";

import Link from "next/link";
import { CreditCard, LogOut, Settings, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { signout } from "@/actions/auth";
import { createClient } from "@/utils/supabase/client";
import { useTranslation } from "react-i18next";

import LanguageChanger from "@/components/LanguageChanger";
import { ThemeToggle } from "@/components/theme-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function UserDropdown() {
  const { t } = useTranslation("settings");
  const supabase = createClient();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setLoading(false);
    };
    getSession();
  }, [supabase]);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="h-8 w-8 cursor-pointer">
          {loading ? (
            <Loader2 className="h-8 w-8 animate-spin" />
          ) : session ? (
            <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
          ) : (
            <User className="h-8 w-8" />
          )}
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        {session ? (
          <>
            <DropdownMenuGroup>
              <Link href="/dashboard/profile">
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  {t("userDropdown.profile")}
                </DropdownMenuItem>
              </Link>
              <Link href="/dashboard/billing">
                <DropdownMenuItem>
                  <CreditCard className="mr-2 h-4 w-4" />
                  {t("userDropdown.billing")}
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <Settings className="mr-2 h-4 w-4" />
                  {t("userDropdown.language")}
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <LanguageChanger subMenu={true} />
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <div className="w-full flex justify-center">
                <ThemeToggle />
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={async () => {
              setLoading(true);
              try {
                await signout();
                router.push("/");
              } finally {
                setLoading(false);
              }
            }}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              <LogOut className="mr-2 h-4 w-4" />
              {t("userDropdown.logout")}
            </DropdownMenuItem>
          </>
        ) : (
          <DropdownMenuItem onClick={() => router.push("/login")}>
            <User className="mr-2 h-4 w-4" />
            {t("userDropdown.login")}
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
