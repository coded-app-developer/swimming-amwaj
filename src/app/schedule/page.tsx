import type { Metadata } from "next";
import { connection } from "next/server";
import { Suspense } from "react";
import { getScheduleData } from "@/features/schedule/api";
import { ScheduleSkeleton } from "@/features/schedule/components/ScheduleSkeleton";
import { ScheduleView } from "@/features/schedule/components/ScheduleView";
import "@/features/schedule/schedule.css";

export const metadata: Metadata = { title: "Training Schedule" };

async function ScheduleLoader() {
  await connection(); // availability is live, render it per request
  const data = await getScheduleData();
  return <ScheduleView data={data} />;
}

export default function SchedulePage() {
  return (
    <main className="wrap">
      <section className="hero">
        <p className="eyebrow">Training schedule</p>
        <h1 className="h1">See exactly when your swimmer trains.</h1>
        <p className="sub">
          Choose a period, shift and age group. The calendar, session outline and availability update instantly.
        </p>
      </section>
      <Suspense fallback={<ScheduleSkeleton />}>
        <ScheduleLoader />
      </Suspense>
    </main>
  );
}
