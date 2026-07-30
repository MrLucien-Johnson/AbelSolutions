import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="bg-[var(--color-surface-soft)]">
      <Container className="py-28 md:py-36 text-center">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.12em] text-[var(--color-accent)]">
          404
        </p>
        <h1 className="mb-5">Page not found</h1>
        <p className="mx-auto mb-10 max-w-xl text-lg text-[var(--color-slate)]">
          The page you requested does not exist or may have moved. Use the
          navigation to continue, or request a quote if you came here looking
          for help.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button href="/" size="lg">
            Back to home
          </Button>
          <Button href="/quote" variant="secondary" size="lg">
            Request a Quote
          </Button>
        </div>
      </Container>
    </div>
  );
}
