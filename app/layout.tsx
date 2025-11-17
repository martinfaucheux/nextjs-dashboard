import "@/app/ui/global.css";
import { inter } from "@/app/ui/fonts";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | Acme Dashboard",
    default: "Acme Dashboard",
  },
  description: "The official Next.js Learn Dashboard built with App Router.",
  metadataBase: new URL("https://next-learn-dashboard.vercel.sh"),
  icons: {
    icon: [
      { url: "/favicons/web-app-manifest-192x192.png", sizes: "192x192" },
      { url: "/favicons/web-app-manifest-512x512.png", sizes: "512x512" },
    ],
    apple: "/favicons/web-app-manifest-192x192.png",
  },
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: ["nextjs", "next14", "pwa", "next-pwa"],
  authors: [
    {
      name: "Martin Faucheux",
      url: "https://github.com/martinfaucheux",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
