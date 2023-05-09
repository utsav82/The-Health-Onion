import "./globals.css";
import { Nunito } from "next/font/google";
import Navbar from "./components/Navbar/Navbar";

export const metadata = {
  title: "The Health Onion",
  description: "Stay Healthy",
};
const font = Nunito({
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Navbar></Navbar>
        {children}
      </body>
    </html>
  );
}
