"use client";

import BrownButton from "@/components/ui/buttons/BrownButton";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-white">
      <h2 className="text-3xl font-semibold mb-4">Something went wrong!</h2>
      <p>{error.message}</p>

      <BrownButton label="Try again" type="button" onclick={reset} />
    </div>
  );
}
