import { redirect } from "next/navigation";

export default function MarketplaceLoginRedirect() {
  redirect("/connexion?role=user");
}
