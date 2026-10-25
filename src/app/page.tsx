import { redirect } from "next/navigation";

// The schedule is the only page converted so far.
export default function Home() {
  redirect("/schedule");
}
