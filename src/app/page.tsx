"use server";

import { appendOrdinalSuffix } from "@/ui/converters";
import { getAvailableData, getVisits, loadProducts } from "./actions";
import Products from "@/components/Products";
import Link from "next/link";

async function getData() {
  return {
    visits: await getVisits(),
    availableData: await getAvailableData(),
  };
}

export default async function Home() {
  const { visits, availableData } = await getData();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* Visits */}
      <section className="z-10 max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-[#163341] text-white pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 lg:border lg:p-4">
          This is your&nbsp;
          <code className="font-bold">{appendOrdinalSuffix(visits)}&nbsp;</code>
          visit.&nbsp;
          <a
            href="https://redis.io/learn/develop/node/nodecrashcourse/sessionstorage?utm_source=redis-node-starter&utm_campaign=redis-node-starter"
            className="group px-2 transition-colors hover:text-[#DCFF1E] text-sm"
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
      {/* /Visits */}

      {/* Welcome */}
      <section className="flex w-full flex-col gap-6 pt-5 md:gap-0">
        <div className="mb-8 px-0">
          <h1 className="capitalize text-6xl text-center">Welcome</h1>
          <p className="text-xl text-center">
            Get started with Redis and Node.js in seconds
          </p>
          <p className="text-center mt-2">
            To get started, see the Redis code in&nbsp;
            <code className="font-mono font-bold">src/lib/redis</code>
          </p>
        </div>
      </section>
      {/* /Welcome */}

      <hr className="text-[#5c707a] bg-[#5c707a] w-full max-w-7xl" />

      {/* Sample Data */}
      <section className="py-12 contain-layout">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-16">
          <div className="mx-auto flex w-100 flex-col items-center gap-8 text-center">
            <h2 className="capitalize text-5xl text-display-xs sm:text-display-lg">
              Try some sample data
            </h2>
            <p className="text-xl text-center">
              Click a button to load sample data, then open{" "}
              <Link
                href="https://redis.io/insight?utm_source=redis-node-starter&utm_campaign=redis-node-starter#insight-form"
                className="font-bold hover:font-normal dark:hover:text-[#DCFF1E]"
                target="_blank"
                rel="noopener noreferrer"
              >
                Redis Insight
              </Link>{" "}
              or scroll down to view the data
            </p>
            <div className="grid lg:grid-cols-1">
              {availableData.search_products ? (
                <Link href="#products" className="px-2 py-4">
                  <button className="inline-flex items-center justify-center gap-2 text-center transition-colors w-full h-11 whitespace-nowrap font-normal font-mono bg-[#DCFF1E] text-[#091A23] rounded-[5px] border border-[#5C707A] px-8 py-[14px] text-sm hover:bg-[#163341] hover:text-white sm:w-fit disabled:bg-slate-500 disabled:text-black">
                    Search products
                  </button>
                </Link>
              ) : (
                <form action={loadProducts} className="px-2 py-4">
                  <button className="inline-flex items-center justify-center gap-2 text-center transition-colors w-full h-11 whitespace-nowrap font-normal font-mono bg-[#DCFF1E] text-[#091A23] rounded-[5px] border border-[#5C707A] px-8 py-[14px] text-sm hover:bg-[#163341] hover:text-white sm:w-fit disabled:bg-slate-500 disabled:text-black">
                    Load products
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
      {/* /Sample Data */}

      {/* Products */}
      {availableData.search_products && (
        <>
          <hr
            id="products"
            className="text-[#5c707a] bg-[#5c707a] w-full max-w-7xl"
          />
          <section className="py-12 contain-layout">
            <div className="max-w-7xl mx-auto px-4 lg:px-8 py-16">
              <div className="mx-auto flex w-100 flex-col items-center gap-8">
                <h2 className="capitalize text-5xl text-display-xs sm:text-display-lg text-center">
                  Search Products
                </h2>
                <Products />
              </div>
            </div>
          </section>
        </>
      )}
      {/* /Products */}

      <hr className="text-[#5c707a] bg-[#5c707a] w-full max-w-7xl" />

      {/* Resources */}
      <section className="py-12 contain-layout">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-16">
          <div className="mx-auto flex w-100 flex-col items-center gap-8 text-center">
            <h2 className="capitalize text-5xl text-display-xs sm:text-display-lg">
              Learn More
            </h2>
            <p className="text-xl text-center">
              Click on the links below to learn about Redis
            </p>

            <div className="pt-10 mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left font-mono">
              <Link
                href="https://redis.io/docs/latest?utm_source=redis-node-starter&utm_campaign=redis-node-starter"
                className="hover:text-[#DCFF1E] group rounded-lg border border-transparent px-2 py-4 transition-colors hover:border-gray-300 hover:bg-[#163341] hover:dark:border-neutral-700 hover:dark:bg-[#163341]"
                target="_blank"
                rel="noopener noreferrer"
              >
                <h2 className="mb-3 text-2xl">
                  Docs{" "}
                  <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                    -&gt;
                  </span>
                </h2>
                <p className="m-0 max-w-[30ch] text-sm opacity-50">
                  Learn about Redis products, features, and commands.
                </p>
              </Link>

              <Link
                href="https://redis.io/learn?utm_source=redis-node-starter&utm_campaign=redis-node-starter"
                className="hover:text-[#DCFF1E] group rounded-lg border border-transparent px-2 py-4 transition-colors hover:border-gray-300 hover:bg-[#163341] hover:dark:border-neutral-700 hover:dark:bg-[#163341]"
                target="_blank"
                rel="noopener noreferrer"
              >
                <h2 className="mb-3 text-2xl">
                  Learn{" "}
                  <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                    -&gt;
                  </span>
                </h2>
                <p className="m-0 max-w-[30ch] text-sm opacity-50">
                  Read tutorials, quick starts, and how-to guides for Redis.
                </p>
              </Link>

              <Link
                href="https://redis.io/demo-center?utm_source=redis-node-starter&utm_campaign=redis-node-starter"
                className="hover:text-[#DCFF1E] group rounded-lg border border-transparent px-2 py-4 transition-colors hover:border-gray-300 hover:bg-[#163341] hover:dark:border-neutral-700 hover:dark:bg-[#163341]"
                target="_blank"
                rel="noopener noreferrer"
              >
                <h2 className="mb-3 text-2xl">
                  Demo Center{" "}
                  <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                    -&gt;
                  </span>
                </h2>
                <p className="m-0 max-w-[30ch] text-sm opacity-50">
                  Watch short, technical videos about Redis products and
                  features.
                </p>
              </Link>

              <Link
                href="https://redis.io/insight?utm_source=redis-node-starter&utm_campaign=redis-node-starter#insight-form"
                className="hover:text-[#DCFF1E] group rounded-lg border border-transparent px-2 py-4 transition-colors hover:border-gray-300 hover:bg-[#163341] hover:dark:border-neutral-700 hover:dark:bg-[#163341]"
                target="_blank"
                rel="noopener noreferrer"
              >
                <h2 className="mb-3 text-2xl">
                  Redis Insight{" "}
                  <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                    -&gt;
                  </span>
                </h2>
                <p className="m-0 max-w-[30ch] text-balance text-sm opacity-50">
                  Query and visualize Redis data, perform bulk operations,
                  monitor performance, and troubleshoot performance issues.
                </p>
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* /Resources */}

      <hr className="text-[#5c707a] bg-[#5c707a] w-full max-w-7xl" />

      {/* Try Free */}
      <section className="py-12 contain-layout">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-16">
          <div className="mx-auto flex w-100 flex-col items-center gap-8 text-center">
            <h2 className="capitalize text-5xl text-display-xs sm:text-display-lg text-white">
              Build with Redis Cloud
            </h2>
            <p className="text-[26px] text-white"></p>
            <a
              className="inline-flex items-center justify-center gap-2 text-center transition-colors w-full h-11 whitespace-nowrap font-normal font-mono bg-[#DCFF1E] text-[#091A23] rounded-[5px] border border-[#5C707A] px-8 py-[14px] text-sm hover:bg-[#163341] hover:text-white sm:w-fit"
              rel="noreferrer noopener"
              target="_blank"
              href="https://redis.io/try-free/"
            >
              Try for free
            </a>
          </div>
        </div>
      </section>
      {/* /Try Free */}
    </main>
  );
}
