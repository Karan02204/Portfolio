"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen w-full bg-[#131313] flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-[4rem] md:text-[8rem] leading-none italic scale-y-150 text-[#ff5b22]">
        OOPS
      </h1>
      <p className="mt-10 text-xl md:text-2xl italic text-white/60 max-w-md">
        Something broke on this page. It isn&apos;t your fault.
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-10 cursor-pointer border-b-2 border-[#ff5b22] pb-2 text-2xl md:text-3xl font-bold italic text-[#ff5b22] transition-colors hover:text-white hover:border-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ff5b22]"
      >
        TRY AGAIN
      </button>
    </main>
  );
}
