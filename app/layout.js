import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { Footer, Nav } from "@components";
import "./globals.css";
import { StateContext } from "@context/StateContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Urban Junction",
  description: "UrbanJunction is a store for new and quality tech products",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="layout">
      <body
        className={`${inter.className} main-container`}
        suppressHydrationWarning={true}
      >
        <StateContext>
          <Toaster />
          <Nav />
          {children}
          <Footer />
        </StateContext>
      </body>
    </html>
  );
}
