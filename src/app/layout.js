import { Poppins, Fruktur } from "next/font/google";
import "./globals.css";
import { ToastContainer, toast } from "react-toastify";
import AppContextProvider from "../context/AppContext";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const fruktur = Fruktur({
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata = {
  title: "Edible",
  description: "A modern food delivery service",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${poppins.className} ${fruktur.className} antialiased`}>
        <AppContextProvider>
            <ToastContainer
              position="top-right"
              autoClose={3000}
              theme="dark"
            />
            {children}
        </AppContextProvider>
      </body>
    </html>
  );
}
