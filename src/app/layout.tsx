import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SSL+++ | Services Solutions Life+++",
  description: "Accompagnement scolaire et garde d'enfants de 6 à 18 ans — français, arabe, anglais",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body className="min-h-screen bg-surface text-ink">{children}</body>
    </html>
  );
}
