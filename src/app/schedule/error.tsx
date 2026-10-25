"use client";

import "@/features/schedule/schedule.css";

export default function ScheduleError({ reset }: { error: Error; reset: () => void }) {
  return (
    <main className="wrap">
      <section className="hero err" role="alert">
        <p className="eyebrow">Training schedule</p>
        <h1 className="h1">We couldn&apos;t load the schedule.</h1>
        <p className="sub">Please check your connection and try again.</p>
        <button type="button" className="btn btn-primary" onClick={reset}>
          Try again
        </button>
      </section>
    </main>
  );
}
