import { Geist, Geist_Mono } from "next/font/google";
import { Hind_Siliguri } from "next/font/google";
import "./globals.css";
import Providers from "./nextAuthProvider/Provider";
import { Toaster } from "react-hot-toast";

const hindSiliguri = Hind_Siliguri({
  weight: ["400", "700"],
  subsets: ["bengali"], // "bengali" subset ব্যবহার করো
  variable: "--font-hind-siliguri",
});

export const metadata = {
  title: "AgriSmart",
  description: "Your Gateway to Smart Farming Solutions",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`antialiased ${hindSiliguri.variable}`}>
        <Providers>
          {children}
          <Toaster position="top-right" reverseOrder={false} />
        </Providers>
      </body>
    </html>
  );
}
