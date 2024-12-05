import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import { Inter } from "next/font/google"
import Header from "@/components/Header";

const inter = Inter({subsets: ["latin"]})

export const metadata = {
  title: "SprintFlow",
  description: "Project Management App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.className}`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark">
          <Header />
          <main className="min-h-screen">{children}</main>
          <footer className="bg-gray-900 py-12">
            <div className="container mx-auto text-center px-4 text-gray-200">
              <p>Made with 💗 by Pushkar Gupta</p>
            </div>  
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
