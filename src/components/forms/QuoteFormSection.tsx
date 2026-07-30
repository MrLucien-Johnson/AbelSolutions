"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { QuoteForm } from "@/components/forms/QuoteForm";

function QuoteFormWithParams() {
  const searchParams = useSearchParams();
  const [defaultCategory, setDefaultCategory] = useState<string | undefined>(
    undefined,
  );

  useEffect(() => {
    setDefaultCategory(searchParams.get("service") ?? undefined);
  }, [searchParams]);

  return <QuoteForm defaultCategory={defaultCategory} />;
}

export function QuoteFormSection() {
  return (
    <Suspense fallback={<QuoteForm />}>
      <QuoteFormWithParams />
    </Suspense>
  );
}
