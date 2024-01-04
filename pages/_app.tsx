import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

const GOOGLE_OAUTH_CLIENT_ID: string =
  process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID || "";

export default function App({ Component, pageProps }: AppProps) {
  // console.log(process.env.NODE_ENV);
  return (
    <div className={inter.className}>
      <GoogleOAuthProvider clientId={GOOGLE_OAUTH_CLIENT_ID || ""}>
        <Component {...pageProps} />
        <Toaster />
      </GoogleOAuthProvider>
    </div>
  );
}
