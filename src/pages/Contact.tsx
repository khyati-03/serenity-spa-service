import { useMemo, useState } from "react";

type Form = { name: string; email: string; message: string };
type Touched = { name?: boolean; email?: boolean; message?: boolean };

const isEmail = (v: string) => /^\S+@\S+\.\S+$/.test(v);

export default function Contact() {
  const [f, setF] = useState<Form>({ name: "", email: "", message: "" });
  const [t, setT] = useState<Touched>({});
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);

  const errors = useMemo(() => {
    const e: Partial<Form> = {};
    if (t.name && f.name.trim().length < 2)
      e.name = "Please enter your full name.";
    if (t.email && !isEmail(f.email)) e.email = "Enter a valid email address.";
    if (t.message && f.message.trim().length < 10)
      e.message = "Message should be at least 10 characters.";
    return e;
  }, [f, t]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setT({ name: true, email: true, message: true });
    const invalid =
      f.name.trim().length < 2 ||
      !isEmail(f.email) ||
      f.message.trim().length < 10;
    if (invalid) return;
    setBusy(true);
    await new Promise((r) => setTimeout(r, 500));
    setBusy(false);
    setSent(true);
  }

  if (sent) {
    return (
      <section className="container-xl section-pad">
        <div className="max-w-xl mx-auto ui-card p-6 md:p-8 text-center">
          <h1 className="text-2xl md:text-3xl font-semibold">Thanks! 🎉</h1>
          <p className="text-gray-600 mt-2">
            We’ve received your message and will get back to you shortly.
          </p>
          <a href="/" className="ui-btn mt-6 inline-flex">
            Back to Home
          </a>
        </div>
      </section>
    );
  }

  return (
    <section className="container-xl section-pad">
      <div className="max-w-2xl mx-auto ui-card p-6 md:p-8">
        <header className="mb-6">
          <h1 className="text-2xl md:text-3xl font-semibold">Contact Us</h1>
          <p className="text-gray-600 mt-1">
            We usually reply within 1–2 business days.
          </p>
        </header>

        <form onSubmit={submit} noValidate>
          <div className="grid gap-4 md:grid-cols-2">
            {/* Name */}
            <div>
              <label className="label">
                Full name <span className="req">*</span>
              </label>
              <input
                className={`ui-field ${
                  t.name && errors.name ? "ui-field-invalid" : ""
                }`}
                placeholder="Jane Doe"
                value={f.name}
                onChange={(e) => setF((p) => ({ ...p, name: e.target.value }))}
                onBlur={() => setT((p) => ({ ...p, name: true }))}
                aria-invalid={!!(t.name && errors.name)}
                aria-describedby="name-err"
              />
              {t.name && errors.name ? (
                <p id="name-err" className="error">
                  {errors.name}
                </p>
              ) : (
                <p className="helper">So we know how to address you.</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="label">
                Email <span className="req">*</span>
              </label>
              <input
                type="email"
                className={`ui-field ${
                  t.email && errors.email ? "ui-field-invalid" : ""
                }`}
                placeholder="jane@example.com"
                value={f.email}
                onChange={(e) => setF((p) => ({ ...p, email: e.target.value }))}
                onBlur={() => setT((p) => ({ ...p, email: true }))}
                aria-invalid={!!(t.email && errors.email)}
                aria-describedby="email-err"
              />
              {t.email && errors.email ? (
                <p id="email-err" className="error">
                  {errors.email}
                </p>
              ) : (
                <p className="helper">We’ll only use this to reply to you.</p>
              )}
            </div>

            {/* Message */}
            <div className="md:col-span-2">
              <label className="label">
                Message <span className="req">*</span>
              </label>
              <textarea
                className={`ui-field h-32 py-2 ${
                  t.message && errors.message ? "ui-field-invalid" : ""
                }`}
                placeholder="How can we help?"
                value={f.message}
                onChange={(e) =>
                  setF((p) => ({ ...p, message: e.target.value }))
                }
                onBlur={() => setT((p) => ({ ...p, message: true }))}
                aria-invalid={!!(t.message && errors.message)}
                aria-describedby="message-err"
              />
              {t.message && errors.message ? (
                <p id="message-err" className="error">
                  {errors.message}
                </p>
              ) : (
                <p className="helper">
                  Provide a little context so we can assist better.
                </p>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 flex items-center justify-between">
            <p className="text-[0.8rem] text-gray-500">
              By sending, you agree to our privacy policy.
            </p>
            <button type="submit" className="ui-btn min-w-40" disabled={busy}>
              {busy ? "Sending..." : "Send Message"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
