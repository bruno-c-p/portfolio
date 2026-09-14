import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bruno Cardozo",
  description:
    "Full-stack engineer in Santa Catarina. I work on ecommerce and AI at Frengee, the marketplace behind the world's #1 powersports brand.",
  authors: [{ name: "Bruno Cardozo" }],
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "Bruno Cardozo",
    description:
      "Full-stack engineer in Santa Catarina. I work on ecommerce and AI at Frengee.",
    url: "https://www.brunocardozo.com.br/",
    images: ["https://www.brunocardozo.com.br/og.jpg"],
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#f3eee6" />
        <link rel="preload" as="image" type="image/webp" href="/portrait.webp" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700&family=Schibsted+Grotesk:ital,wght@0,400;0,500;0,600;1,400&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
