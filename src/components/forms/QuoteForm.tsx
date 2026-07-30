"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import {
  budgetRangeLabels,
  quoteFormSchema,
  type QuoteFormValues,
} from "@/lib/validation";
import { cn } from "@/lib/utils";

type FormState = {
  fullName: string;
  email: string;
  telephone: string;
  postcodeOrArea: string;
  serviceCategory: "technology" | "construction" | "not-sure";
  description: string;
  preferredContact: "email" | "phone" | "either";
  preferredTimeframe: string;
  budgetRange: "" | "under-250" | "250-500" | "500-1000" | "1000-2500" | "2500-plus" | "not-sure";
  consent: boolean;
  privacyAck: boolean;
  companyWebsite: string;
};

type FieldErrors = Partial<Record<keyof QuoteFormValues, string>>;

type SubmitState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "sent" }
  | { status: "accepted_offline"; message: string }
  | { status: "error"; message: string };

const blankValues: FormState = {
  fullName: "",
  email: "",
  telephone: "",
  postcodeOrArea: "",
  serviceCategory: "not-sure",
  description: "",
  preferredContact: "either",
  preferredTimeframe: "",
  budgetRange: "",
  consent: false,
  privacyAck: false,
  companyWebsite: "",
};

export function QuoteForm({ defaultCategory }: { defaultCategory?: string }) {
  const formId = useId();
  const [values, setValues] = useState<FormState>({
    ...blankValues,
    serviceCategory:
      defaultCategory === "technology" || defaultCategory === "construction"
        ? defaultCategory
        : "not-sure",
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitState, setSubmitState] = useState<SubmitState>({ status: "idle" });
  const statusId = `${formId}-status`;

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitState({ status: "submitting" });

    const parsed = quoteFormSchema.safeParse(values);
    if (!parsed.success) {
      const nextErrors: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof QuoteFormValues;
        if (!nextErrors[key]) nextErrors[key] = issue.message;
      }
      setErrors(nextErrors);
      setSubmitState({
        status: "error",
        message: "Please correct the highlighted fields and try again.",
      });
      return;
    }

    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const data = (await response.json()) as {
        ok: boolean;
        delivery?: string;
        message?: string;
      };

      if (!response.ok) {
        setSubmitState({
          status: "error",
          message:
            data.message ??
            "We could not process your request. Please try again shortly.",
        });
        return;
      }

      if (data.delivery === "sent") {
        setSubmitState({ status: "sent" });
        setValues(blankValues);
        setErrors({});
        return;
      }

      setSubmitState({
        status: "accepted_offline",
        message:
          data.message ??
          "Your details were validated, but email delivery is not configured on this website yet. Please contact Abel Solutions directly using the details on the Contact page, or try again once email delivery has been set up.",
      });
    } catch {
      setSubmitState({
        status: "error",
        message:
          "A network error occurred. Please check your connection and try again.",
      });
    }
  }

  if (submitState.status === "sent") {
    return (
      <div
        className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-8"
        role="status"
        aria-live="polite"
      >
        <h2 className="mb-3 text-[var(--color-success)]">Enquiry sent</h2>
        <p className="mb-6 text-[var(--color-slate)]">
          Thank you. Your quote request has been delivered. We will review the
          details and respond using your preferred contact method.
        </p>
        <Button
          type="button"
          variant="secondary"
          onClick={() => setSubmitState({ status: "idle" })}
        >
          Send another enquiry
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 md:p-8 space-y-6"
      aria-describedby={statusId}
    >
      <div className="grid gap-6 md:grid-cols-2">
        <Field
          id={`${formId}-name`}
          label="Full name"
          error={errors.fullName}
          required
        >
          <input
            id={`${formId}-name`}
            name="fullName"
            autoComplete="name"
            value={values.fullName}
            onChange={(e) => update("fullName", e.target.value)}
            className={fieldClass(errors.fullName)}
            required
          />
        </Field>

        <Field
          id={`${formId}-email`}
          label="Email address"
          error={errors.email}
          required
        >
          <input
            id={`${formId}-email`}
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
            className={fieldClass(errors.email)}
            required
          />
        </Field>

        <Field
          id={`${formId}-tel`}
          label="Telephone number"
          error={errors.telephone}
          required
        >
          <input
            id={`${formId}-tel`}
            name="telephone"
            type="tel"
            autoComplete="tel"
            value={values.telephone}
            onChange={(e) => update("telephone", e.target.value)}
            className={fieldClass(errors.telephone)}
            required
          />
        </Field>

        <Field
          id={`${formId}-area`}
          label="Postcode or general area"
          error={errors.postcodeOrArea}
          required
          hint="For example: SW1, Croydon, or North London"
        >
          <input
            id={`${formId}-area`}
            name="postcodeOrArea"
            autoComplete="postal-code"
            value={values.postcodeOrArea}
            onChange={(e) => update("postcodeOrArea", e.target.value)}
            className={fieldClass(errors.postcodeOrArea)}
            required
          />
        </Field>
      </div>

      <Field
        id={`${formId}-category`}
        label="Service category"
        error={errors.serviceCategory}
        required
      >
        <select
          id={`${formId}-category`}
          name="serviceCategory"
          value={values.serviceCategory}
          onChange={(e) =>
            update(
              "serviceCategory",
              e.target.value as typeof values.serviceCategory,
            )
          }
          className={fieldClass(errors.serviceCategory)}
          required
        >
          <option value="technology">Technology Services</option>
          <option value="construction">Construction Services</option>
          <option value="not-sure">Not sure</option>
        </select>
      </Field>

      <Field
        id={`${formId}-description`}
        label="Description of the work"
        error={errors.description}
        required
        hint="Include useful details such as device type, room layout, photos available, or preferred timing."
      >
        <textarea
          id={`${formId}-description`}
          name="description"
          rows={6}
          value={values.description}
          onChange={(e) => update("description", e.target.value)}
          className={cn(fieldClass(errors.description), "resize-y min-h-36")}
          required
        />
      </Field>

      <div className="grid gap-6 md:grid-cols-2">
        <Field
          id={`${formId}-contact`}
          label="Preferred contact method"
          error={errors.preferredContact}
          required
        >
          <select
            id={`${formId}-contact`}
            name="preferredContact"
            value={values.preferredContact}
            onChange={(e) =>
              update(
                "preferredContact",
                e.target.value as typeof values.preferredContact,
              )
            }
            className={fieldClass(errors.preferredContact)}
            required
          >
            <option value="email">Email</option>
            <option value="phone">Telephone</option>
            <option value="either">Either</option>
          </select>
        </Field>

        <Field
          id={`${formId}-timeframe`}
          label="Preferred date or timeframe"
          error={errors.preferredTimeframe}
          hint="Optional"
        >
          <input
            id={`${formId}-timeframe`}
            name="preferredTimeframe"
            value={values.preferredTimeframe}
            onChange={(e) => update("preferredTimeframe", e.target.value)}
            className={fieldClass(errors.preferredTimeframe)}
            placeholder="e.g. next week, evenings, flexible"
          />
        </Field>
      </div>

      <Field
        id={`${formId}-budget`}
        label="Budget range"
        error={errors.budgetRange}
        hint="Optional — helps us advise on realistic options"
      >
        <select
          id={`${formId}-budget`}
          name="budgetRange"
          value={values.budgetRange}
          onChange={(e) =>
            update("budgetRange", e.target.value as typeof values.budgetRange)
          }
          className={fieldClass(errors.budgetRange)}
        >
          {Object.entries(budgetRangeLabels).map(([value, label]) => (
            <option key={value || "none"} value={value}>
              {label}
            </option>
          ))}
        </select>
      </Field>

      {/* Honeypot */}
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor={`${formId}-company`}>Company website</label>
        <input
          id={`${formId}-company`}
          name="companyWebsite"
          tabIndex={-1}
          autoComplete="off"
          value={values.companyWebsite}
          onChange={(e) => update("companyWebsite", e.target.value)}
        />
      </div>

      <div className="space-y-4">
        <CheckboxField
          id={`${formId}-consent`}
          checked={values.consent}
          onChange={(checked) => update("consent", checked)}
          error={errors.consent}
          label="I agree to be contacted about this enquiry."
        />
        <CheckboxField
          id={`${formId}-privacy`}
          checked={values.privacyAck}
          onChange={(checked) => update("privacyAck", checked)}
          error={errors.privacyAck}
          label={
            <>
              I have read and acknowledge the{" "}
              <Link href="/privacy" className="underline underline-offset-2">
                Privacy Policy
              </Link>
              .
            </>
          }
        />
      </div>

      <div
        id={statusId}
        className="min-h-6"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {submitState.status === "error" ? (
          <p className="text-[var(--color-error)] font-medium">
            {submitState.message}
          </p>
        ) : null}
        {submitState.status === "accepted_offline" ? (
          <div className="notice-banner">
            <p className="font-semibold mb-1">Enquiry saved locally for review</p>
            <p>{submitState.message}</p>
          </div>
        ) : null}
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={submitState.status === "submitting"}
      >
        {submitState.status === "submitting"
          ? "Sending…"
          : "Submit quote request"}
      </Button>

      <p className="text-sm text-[var(--color-muted)]">
        File uploads are not enabled in this version. You can mention available
        photos in your description and we will request them if needed.
      </p>
    </form>
  );
}

/* Form helpers */

function fieldClass(error?: string) {
  return cn(
    "w-full rounded-[10px] border bg-[var(--color-surface)] px-4 py-3 text-[var(--color-ink)]",
    "placeholder:text-[var(--color-muted)]",
    error
      ? "border-[var(--color-error)]"
      : "border-[var(--color-border-strong)] focus:border-[var(--color-accent)]",
  );
}

function Field({
  id,
  label,
  error,
  required,
  hint,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;

  return (
    <div>
      <label htmlFor={id} className="mb-2 block font-medium text-[var(--color-navy)]">
        {label}
        {required ? <span className="text-[var(--color-error)]"> *</span> : null}
      </label>
      {hint ? (
        <p id={hintId} className="mb-2 text-sm text-[var(--color-muted)]">
          {hint}
        </p>
      ) : null}
      <div
        // associate describedby via cloning would be complex; set aria on wrappers via child props in future
      >
        {children}
      </div>
      {error ? (
        <p id={errorId} className="mt-2 text-sm text-[var(--color-error)]" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function CheckboxField({
  id,
  checked,
  onChange,
  label,
  error,
}: {
  id: string;
  checked: boolean;
  onChange: (value: boolean) => void;
  label: React.ReactNode;
  error?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="flex items-start gap-3 text-[var(--color-slate)]">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="mt-1 h-5 w-5 rounded border-[var(--color-border-strong)]"
        />
        <span>{label}</span>
      </label>
      {error ? (
        <p className="mt-2 text-sm text-[var(--color-error)]" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
