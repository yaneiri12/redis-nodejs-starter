"use server";

import { decrypt, getSessionCookie } from "@/lib/session";
import { visited } from "@/lib/redis/session";
import { loadProducts } from "./actions";

async function getData() {
  const sessionCookie = getSessionCookie();

  if (!sessionCookie) {
    return {
      visits: 1,
    };
  }

  const { id } = await decrypt(sessionCookie);
  const visits = await visited(id);

  return {
    visits,
  };
}

function ordinalSuffix(i: number): string {
  const j = i % 10;
  const k = i % 100;
  let withSuffix = "";

  if (j === 1 && k !== 11) {
    withSuffix = `${i}st`;
  } else if (j === 2 && k !== 12) {
    withSuffix = `${i}nd`;
  } else if (j === 3 && k !== 13) {
    withSuffix = `${i}rd`;
  } else {
    withSuffix = `${i}th`;
  }

  return withSuffix;
}

export default async function Home() {
  const { visits } = await getData();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <section className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          This is your&nbsp;
          <code className="font-bold">{ordinalSuffix(visits)}&nbsp;</code>
          visit.&nbsp;
          <a
            href="https://redis.io/learn/develop/node/nodecrashcourse/sessionstorage?utm_source=redis-node-starter&utm_campaign=redis-node-starter"
            className="group px-2 transition-colors text-[#DCFF1E] rounded-[5px] text-sm active:text-white"
            target="_blank"
            rel="noopener noreferrer"
          >
            See how we know{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </a>
        </p>
      </section>

      <section className="flex w-full flex-col gap-6 pt-10 md:flex-row md:gap-0 font-mono">
        <div className="mb-8 w-full px-0">
          <h1 className="text-6xl font-semibold text-center">Welcome</h1>
          <p className="text-xl text-center">
            Get started with Redis and Node.js in seconds
          </p>
        </div>
      </section>

      <section className="flex w-full flex-col gap-6 pt-5 md:flex-row md:gap-0 font-mono">
        <div className="mb-8 w-full px-0">
          <h2 className="text-center">
            To get started, see the Redis code in&nbsp;
            <code className="font-mono font-bold">src/lib/redis</code>
          </h2>
        </div>
      </section>

      <section className="pt-10 mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left font-mono">
        <a
          href="https://redis.io/docs/latest?utm_source=redis-node-starter&utm_campaign=redis-node-starter"
          className="group rounded-lg border border-transparent px-3 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Docs{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Learn about Redis products, features, and commands.
          </p>
        </a>

        <a
          href="https://redis.io/learn?utm_source=redis-node-starter&utm_campaign=redis-node-starter"
          className="group rounded-lg border border-transparent px-3 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Learn{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Read tutorials, quick starts, and how-to guides for Redis.
          </p>
        </a>

        <a
          href="https://redis.io/demo-center?utm_source=redis-node-starter&utm_campaign=redis-node-starter"
          className="group rounded-lg border border-transparent px-3 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Demo Center{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Watch short, technical videos about Redis products and features.
          </p>
        </a>

        <a
          href="https://redis.io/insight?utm_source=redis-node-starter&utm_campaign=redis-node-starter#insight-form"
          className="group rounded-lg border border-transparent px-3 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Redis Insight{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-balance text-sm opacity-50">
            Query and visualize Redis data, perform bulk operations, monitor
            performance, and troubleshoot performance issues.
          </p>
        </a>
      </section>

      <form action={loadProducts}>
        <button className="inline-flex items-center justify-center gap-2 text-center transition-colors w-full h-11 whitespace-nowrap font-normal font-mono bg-[#DCFF1E] text-[#091A23] rounded-[5px] border border-[#5C707A] px-8 py-[14px] text-sm active:bg-[#163341] active:text-white sm:w-fit">
          Load products
        </button>
      </form>

      <section className="py-12 contain-layout">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-16">
          <div className="mx-auto flex w-100 flex-col items-center gap-8 text-center">
            <h2 className="text-5xl font-sans text-display-xs sm:text-display-lg text-white">
              Build with Redis Cloud
            </h2>
            <p className="text-[26px] font-sans text-white"></p>
            <a
              className="inline-flex items-center justify-center gap-2 text-center transition-colors w-full h-11 whitespace-nowrap font-normal font-mono bg-[#DCFF1E] text-[#091A23] rounded-[5px] border border-[#5C707A] px-8 py-[14px] text-sm active:bg-[#163341] active:text-white sm:w-fit"
              rel="noreferrer noopener"
              target="_blank"
              href="https://redis.io/try-free/"
            >
              Try for free
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
