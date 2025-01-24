"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export function BackButton() {
  const router = useRouter();

  const handleBack = () => {
    // Pastikan navigasi ke halaman fallback jika router.back() gagal
    const fallbackUrl = "/files";

    if (document.referrer && new URL(document.referrer).origin === window.location.origin) {
      router.back(); // Navigasi kembali jika berasal dari domain yang sama
    } else {
      router.push(fallbackUrl); // Navigasi ke fallback
    }
  };

  return (
    <Button
      variant="outline"
      size="icon"
      className="mr-2"
      onClick={handleBack}
    >
      <ChevronLeft />
    </Button>
  );
}
