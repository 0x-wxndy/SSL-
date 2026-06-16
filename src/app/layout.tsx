import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SSL+++ | Services Solutions Life+++",
  description:
    "Plateforme d'aide sociale : accompagnement scolaire, services à domicile, aide aux seniors et activités Alzheimer.",
  icons: {
    icon: "/assets/ssl-logo.png",
    apple: "/assets/ssl-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body className="min-h-screen bg-surface-base font-body text-ink antialiased">{children}</body>
    </html>
  );
}
