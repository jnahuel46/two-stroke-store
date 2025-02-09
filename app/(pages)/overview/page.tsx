import Image from "next/image";

export default function OverviewPage() {
  return (
    <div className="px-6 items-center justify-items-center min-h-screen w-full gap-16 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full">
        <span className="text-xl text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          Bienvenido -
          <span className="bg-black/[.05] dark:bg-white/[.06] px-2 py-0.5 rounded font-semibold">
            Mecanica 2t El Vasco
          </span>
        </span>
        <Image
          className="rounded"
          src="/stihl.jpg"
          alt="Next.js logo"
          width={400}
          height={400}
          priority
        />
      </main>
    </div>
  );
};
