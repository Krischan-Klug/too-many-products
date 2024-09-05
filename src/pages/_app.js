import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <h1>ALWAYS HERE</h1>
      <Component {...pageProps} />
    </>
  );
}
