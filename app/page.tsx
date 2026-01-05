import { redirect } from "next/navigation";

export default function Home() {
  redirect("/case-studies/saas-admin-dashboard");
  return null;
}
