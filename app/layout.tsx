import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { AuthProvider } from '@/hooks/use-auth';
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata = {
  title: "WeCare Hospitals"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`h-full bg-slate-50 ${inter.variable}`}>
      <body suppressHydrationWarning className="flex min-h-full flex-col font-sans text-slate-900 bg-slate-50 selection:bg-blue-600 selection:text-white">
        <AuthProvider>
          <Navbar />
          <main className="flex-1 overflow-x-hidden">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
