import { Alike } from "next/font/google";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

const inter = Alike({weight: "400", subsets: ["latin"]});

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Sonucycle",
  description: "Learn your mind.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="bg-background text-foreground">
        <main className="min-h-screen flex flex-col items-center">
          {children}
          
        </main>
      </body>
    </html>
  );
}
