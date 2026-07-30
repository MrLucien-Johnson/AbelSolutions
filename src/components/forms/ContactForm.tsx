"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { contactFormSchema } from "@/lib/validation";
import { submitEnquiry } from "@/lib/submit-enquiry";
import { cn } from "@/lib/utils";

type FormValues = {
  fullName: string;
  email: string;
  telephone: string;
  subject: string;
  message: string;
  consent: boolean;
  privacyAck: boolean;
  companyWebsite: string;
};

type FieldErrors = Partial<Record<keyof FormValues, string>>;

type SubmitState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "sent" }
  | { status: "accepted_offline"; message: string }
  | { status: "error"; message: string };

const blankValues: FormValues = {
  fullName: "",
  email: "",
  telephone: "",
  subject: "",
  message: "",
  consent: false,
  privacyAck: false,
  companyWebsite: "",
};

export function ContactForm() {
  const formId = useId();
  const [values, setValues] = useState(blankValues);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitState, setSubmitState] = useState<SubmitState>({ status: "idle" });
  const statusId = `${formId}-status`;

  function update<K extends keyof FormValues>(key: K, value: FormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitState({ status: "submitting" });

    const parsed = contactFormSchema.safeParse(values);
    if (!parsed.success) {
      const nextErrors: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof FormValues;
        if (!nextErrors[key]) nextErrors[key] = issue.message;
      }
      setErrors(nextErrors);
      setSubmitState({
        status: "error",
        message: "Please correct the highlighted fields and try again.",
      });
      return;
    }

    const data = parsed.data;
    const textBody = [
      "New contact message — Abel Solutions website",
      "",
      `Name: ${data.fullName}`,
      `Email: ${data.email}`,
      `Telephone: ${data.telephone || "Not provided"}`,
      `Subject: ${data.subject}`,
      "",
      "Message:",
      data.message,
    ].join("\n");

    if (data.companyWebsite) {
      setSubmitState({ status: "sent" });
      setValues(blankValues);
      setErrors({});
      return;
    }

    const result = await submitEnquiry({
      type: "contact",
      subject: `Contact — ${data.subject} — ${data.fullName}`,
      replyTo: data.email,
      name: data.fullName,
      textBody,
      fields: {
        telephone: data.telephone || "",
        formSubject: data.subject,
      },
    });

    if (result.status === "sent") {
      setSubmitState({ status: "sent" });
      setValues(blankValues);
      setErrors({});
      return;
    }

    if (result.status === "failed") {
      setSubmitState({ status: "error", message: result.message });
      return;
    }

    setSubmitState({
      status: "accepted_offline",
      message: result.message,
    });
  }

  if (submitState.status === "sent") {
    return (
      <div
        className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-8"
        role="status"
        aria-live="polite"
      >
        <h2 className="mb-3 text-[var(--color-success)]">Message sent</h2>
        <p className="mb-6 text-[var(--color-slate)]">
          Thank you. Your message has been delivered and we will respond as soon
          as we can.
        </p>
        <Button
          type="button"
          variant="secondary"
          onClick={() => setSubmitState({ status: "idle" })}
        >
          Send another message
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
        <div>
          <label
            htmlFor={`${formId}-name`}
            className="mb-2 block font-medium text-[var(--color-navy)]"
          >
            Full name <span className="text-[var(--color-error)]">*</span>
          </label>
          <input
            id={`${formId}-name`}
            name="fullName"
            autoComplete="name"
            required
            value={values.fullName}
            onChange={(e) => update("fullName", e.target.value)}
            className={inputClass(errors.fullName)}
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={errors.fullName ? `${formId}-name-error` : undefined}
          />
          {errors.fullName ? (
            <p id={`${formId}-name-error`} className="mt-2 text-sm text-[var(--color-error)]" role="alert">
              {errors.fullName}
            </p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor={`${formId}-email`}
            className="mb-2 block font-medium text-[var(--color-navy)]"
          >
            Email address <span className="text-[var(--color-error)]">*</span>
          </label>
          <input
            id={`${formId}-email`}
            name="email"
            type="email"
            autoComplete="email"
            required
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
            className={inputClass(errors.email)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? `${formId}-email-error` : undefined}
          />
          {errors.email ? (
            <p id={`${formId}-email-error`} className="mt-2 text-sm text-[var(--color-error)]" role="alert">
              {errors.email}
            </p>
          ) : null}
        </div>
      </div>

      <div>
        <label
          htmlFor={`${formId}-tel`}
          className="mb-2 block font-medium text-[var(--color-navy)]"
        >
          Telephone number
        </label>
        <p id={`${formId}-tel-hint`} className="mb-2 text-sm text-[var(--color-muted)]">
          Optional
        </p>
        <input
          id={`${formId}-tel`}
          name="telephone"
          type="tel"
          autoComplete="tel"
          value={values.telephone}
          onChange={(e) => update("telephone", e.target.value)}
          className={inputClass(errors.telephone)}
          aria-describedby={`${formId}-tel-hint`}
        />
        {errors.telephone ? (
          <p className="mt-2 text-sm text-[var(--color-error)]" role="alert">
            {errors.telephone}
          </p>
        ) : null}
      </div>

      <div>
        <label
          htmlFor={`${formId}-subject`}
          className="mb-2 block font-medium text-[var(--color-navy)]"
        >
          Subject <span className="text-[var(--color-error)]">*</span>
        </label>
        <input
          id={`${formId}-subject`}
          name="subject"
          required
          value={values.subject}
          onChange={(e) => update("subject", e.target.value)}
          className={inputClass(errors.subject)}
          aria-invalid={Boolean(errors.subject)}
        />
        {errors.subject ? (
          <p className="mt-2 text-sm text-[var(--color-error)]" role="alert">
            {errors.subject}
          </p>
        ) : null}
      </div>

      <div>
        <label
          htmlFor={`${formId}-message`}
          className="mb-2 block font-medium text-[var(--color-navy)]"
        >
          Message <span className="text-[var(--color-error)]">*</span>
        </label>
        <textarea
          id={`${formId}-message`}
          name="message"
          rows={6}
          required
          value={values.message}
          onChange={(e) => update("message", e.target.value)}
          className={cn(inputClass(errors.message), "resize-y min-h-36")}
          aria-invalid={Boolean(errors.message)}
        />
        {errors.message ? (
          <p className="mt-2 text-sm text-[var(--color-error)]" role="alert">
            {errors.message}
          </p>
        ) : null}
      </div>

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
        <label htmlFor={`${formId}-consent`} className="flex items-start gap-3 text-[var(--color-slate)]">
          <input
            id={`${formId}-consent`}
            type="checkbox"
            checked={values.consent}
            onChange={(e) => update("consent", e.target.checked)}
            className="mt-1 h-5 w-5"
          />
          <span>I agree to be contacted about this message.</span>
        </label>
        {errors.consent ? (
          <p className="text-sm text-[var(--color-error)]" role="alert">
            {errors.consent}
          </p>
        ) : null}

        <label htmlFor={`${formId}-privacy`} className="flex items-start gap-3 text-[var(--color-slate)]">
          <input
            id={`${formId}-privacy`}
            type="checkbox"
            checked={values.privacyAck}
            onChange={(e) => update("privacyAck", e.target.checked)}
            className="mt-1 h-5 w-5"
          />
          <span>
            I have read and acknowledge the{" "}
            <Link href="/privacy" className="underline underline-offset-2">
              Privacy Policy
            </Link>
            .
          </span>
        </label>
        {errors.privacyAck ? (
          <p className="text-sm text-[var(--color-error)]" role="alert">
            {errors.privacyAck}
          </p>
        ) : null}
      </div>

      <div id={statusId} role="status" aria-live="polite" aria-atomic="true">
        {submitState.status === "error" ? (
          <p className="text-[var(--color-error)] font-medium">{submitState.message}</p>
        ) : null}
        {submitState.status === "accepted_offline" ? (
          <div className="notice-banner">
            <p className="font-semibold mb-1">Message validated</p>
            <p>{submitState.message}</p>
          </div>
        ) : null}
      </div>

      <Button type="submit" size="lg" disabled={submitState.status === "submitting"}>
        {submitState.status === "submitting" ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}

function inputClass(error?: string) {
  return cn(
    "w-full rounded-[10px] border bg-[var(--color-surface)] px-4 py-3 text-[var(--color-ink)]",
    error
      ? "border-[var(--color-error)]"
      : "border-[var(--color-border-strong)] focus:border-[var(--color-accent)]",
  );
}
