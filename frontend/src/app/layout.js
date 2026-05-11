import { Geist, Geist_Mono, Inter,Outfit,Onest } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../component/Theme-Provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const onest = Onest({
  variable: "--font-onest",
  subsets: ["latin"],
});

export const metadata = {
  title: "AI Video Chat Platform",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en"  suppressHydrationWarning >
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${outfit.variable} ${onest.variable} antialiased`}
      >
        <ThemeProvider
        attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
            
        >

        {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
