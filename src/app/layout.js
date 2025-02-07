import { Poppins, Fruktur } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

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
      <body
        className={`${poppins.className} ${fruktur.className} antialiased`}
      >
        <Toaster position="top-right" />
        {children}
      </body>
    </html>
  );
}
