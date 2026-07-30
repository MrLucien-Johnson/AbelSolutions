"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { QuoteForm } from "@/components/forms/QuoteForm";

function QuoteFormWithParams() {
  const searchParams = useSearchParams();
  const defaultCategory = searchParams.get("service") ?? undefined;
  return <QuoteForm defaultCategory={defaultCategory} />;
}

export function QuoteFormSection() {
  return (
    <Suspense fallback={<QuoteForm />}>
      <QuoteFormWithParams />
    </Suspense>
  );
}
