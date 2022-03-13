import Head from "next/head";
import Bulletin from "@/components/Bulletin";
import Basket from "../src/components/Basket";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Nesine Study Case</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex md:flex-col w-full h-screen py-2 px-4">
        <Bulletin />
        <Basket />
      </div>
    </div>
  );
}
