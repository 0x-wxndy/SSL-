import { redirect } from "next/navigation";

export default function ProviderLoginRedirect() {
  redirect("/connexion?role=provider");
}
