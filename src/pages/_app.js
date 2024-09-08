import "@/styles/globals.css";
import Header from "@/components/Header.js";
import { useEffect, useState } from "react";
import { SWRConfig } from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function App({ Component, pageProps }) {
  //Fix hydration synchronization
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;

  return (
    <>
      <SWRConfig value={{ fetcher }}>
        <Header />
        <Component {...pageProps} />
      </SWRConfig>
    </>
  );
}
