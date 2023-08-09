import "./globals.css";
import { Nunito } from "next/font/google";

export const metadata = {
  title: "The Health Onion",
  description: "Stay Healthy",
  icons: {
    icon: "app/assets/favicon.ico",
  },
};
const font = Nunito({
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={font.className}>
        {children}
      </body>
    </html>
  );
}
