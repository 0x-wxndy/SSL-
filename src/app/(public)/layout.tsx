import PublicNavbar from "@/components/layout/PublicNavbar";
import PublicFooter from "@/components/layout/PublicFooter";
import { LocaleProvider } from "@/lib/i18n/locale-context";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <LocaleProvider>
      <div className="flex min-h-screen flex-col">
        <PublicNavbar />
        <main className="flex-1">{children}</main>
        <PublicFooter />
      </div>
    </LocaleProvider>
  );
}
