"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

import { AuthLayout } from "@/components/auth-layout";
import { Button } from "@/components/ui/button";
import { useApp } from "@/components/providers/app-provider";

export default function EmptyMoviesPage() {
  const t = useTranslations("movies.list.empty");
  const { user } = useApp();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace("/");
    }
  }, [router, user]);

  if (!user) {
    return null;
  }

  return (
    <AuthLayout>
      <div className="flex min-h-screen flex-col items-center justify-center px-4 py-8">
        <div className="text-center">
          <h1 className="mb-8 px-2 text-3xl font-bold text-white sm:text-5xl">
            {t("title")}
          </h1>
          <Button asChild size="form">
            <Link href="/movies/manage">{t("addButton")}</Link>
          </Button>
        </div>
      </div>
    </AuthLayout>
  );
}
