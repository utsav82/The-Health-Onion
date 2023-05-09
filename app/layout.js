import "./globals.css";
import { Nunito } from "next/font/google";
import Navbar from "./components/Navbar/Navbar";


export const metadata = {
  title: "The Health Onion",
  description: "Stay Healthy",
  icons: {
    icon: 'app/assets/Onion.png', 
  },
};
const font = Nunito({
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Navbar></Navbar>
        <div className="">    
        {children}
        </div>
    
      </body>
    </html>
  );
}
