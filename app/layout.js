import "./globals.css";
import { Nunito } from "next/font/google";
import ToasterContext from "./context/ToasterContext";
export const metadata = {
  title: "The Health Onion",
  description: "Stay Healthy",
  icons: {
    icon: "/favicon.ico",
  },
};
const font = Nunito({
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={font.className}>
     
          <ToasterContext />
          {children}
      
      </body>
    </html>
  );
}
