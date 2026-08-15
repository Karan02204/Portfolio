import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen w-full bg-[#131313] flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-[6rem] md:text-[12rem] leading-none italic scale-y-150 text-[#ff5b22]">
        404
      </h1>
      <p className="mt-10 text-xl md:text-2xl italic text-white/60 max-w-md">
        This page wandered off. Let&apos;s get you back.
      </p>
      <Link
        href="/"
        className="mt-10 border-b-2 border-[#ff5b22] pb-2 text-2xl md:text-3xl font-bold italic text-[#ff5b22] transition-colors hover:text-white hover:border-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ff5b22]"
      >
        BACK HOME
      </Link>
    </main>
  );
}
