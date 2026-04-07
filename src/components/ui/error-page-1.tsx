"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const NotFound404 = () => {
  const router = useRouter();
  return (
    <div className="mx-auto flex min-h-dvh max-w-7xl flex-col items-center justify-center gap-8 p-8 md:gap-12 md:p-16">
      <Image
        src="/images/404.webp"
        width={600}
        height={400}
        alt="placeholder image"
        className="aspect-video w-full max-w-4xl rounded-xl object-cover dark:brightness-[0.95] dark:invert"
      />
      <div className="text-center">
        <h1 className="mb-2 text-3xl font-bold">Page Not Found</h1>
        <p>Oops! The page you're trying to access doesn't exist.</p>
        <div className="mt-6 flex items-center justify-center gap-4 md:mt-8">
          <Button
            variant={"outline"}
            className="h-9 px-4 py-2 cursor-pointer"
            onClick={() => router.back()}
          >
            Get Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound404;
