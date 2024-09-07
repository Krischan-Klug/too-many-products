import "@/styles/globals.css";
import Header from "@/components/Header.js";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }) {
  //Fix hydration synchronization
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;

  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  );
}
