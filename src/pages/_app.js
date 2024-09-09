import "@/styles/globals.css";
import Header from "@/components/Header.js";
import { useEffect, useState } from "react";
import { SWRConfig } from "swr";
import Login from "@/components/Login";
import { SessionProvider, useSession } from "next-auth/react";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  // Fix hydration synchronization
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;

  return (
    <>
      <SWRConfig value={{ fetcher }}>
        <SessionProvider session={session}>
          <AuthWrapper>
            {/* Content start */}
            <Header />
            <Component {...pageProps} />
            {/* Content stop */}
          </AuthWrapper>
        </SessionProvider>
      </SWRConfig>
    </>
  );
}

function AuthWrapper({ children }) {
  const { data: session } = useSession();

  if (!session) {
    return <Login />;
  }

  return <>{children}</>;
}
