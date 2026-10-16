"use client";

import { ErrorState } from "@/components/ui";

export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
  return (
    <ErrorState
      title="Something went wrong"
      description={
        <>
          An unexpected error occurred.{" "}
          <button type="button" onClick={reset} className="underline">
            Try again
          </button>
        </>
      }
    />
  );
}
