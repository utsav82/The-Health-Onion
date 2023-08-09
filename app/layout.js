import "./globals.css";
import { Nunito } from "next/font/google";
import ToasterContext from "./context/ToasterContext";
import AuthContext from "./context/AuthContext";
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
        <AuthContext>
          <ToasterContext />
          {children}
        </AuthContext>
      </body>
    </html>
  );
}
