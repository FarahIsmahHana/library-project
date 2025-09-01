import FormClient from "./FormClient";
import { requireAuth } from "./auth";

export default async function Home() {
  await requireAuth();
  return <FormClient />;
}
