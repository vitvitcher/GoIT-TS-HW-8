import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";


const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-roboto',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "NoteHub",
  description: "Create and manage notes",
  openGraph: {
    title: `NoteHub`,
    description: "NoteHub is a simple and efficient application designed for managing personal notes.It helps keep your thoughts organized and accessible in one place, whether you are at home or on the go.",
    url: `https://notehub.com/`,
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHub Logo',
      },
    ],
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${roboto.variable}`}>
      <body>
        <TanStackProvider>

          <Header />

          {children}
          {modal}

          <footer>
            <p>
              Created <time dateTime='2026'>2026</time>
            </p>
          </footer>
        </TanStackProvider>
      </body>
    </html>
  );
}
