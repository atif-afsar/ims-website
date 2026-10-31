import { useState } from "react";
import { PiCheckCircle, PiWarningCircle, PiPaperPlaneTilt } from "react-icons/pi";
import { api } from "../lib/api";

// Web3Forms delivers submissions to the school's inbox (same key as the old site)
const WEB3FORMS_KEY = "55a7d4ae-4830-4d4e-b4c5-654918d61b87";

const SUBJECTS = ["Admission enquiry", "NEET / JEE program", "Campus visit", "Fees & transport", "General question"];

const field =
  "w-full rounded-xl border border-gold-500/40 bg-ivory-50 px-4 py-3 text-ink placeholder:text-ink/40 transition focus:border-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-700/20";

const ContactForm = () => {
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const fields = Object.fromEntries(["name", "phone", "email", "subject", "message", "botcheck"].map((k) => [k, data.get(k) || ""]));
    setStatus("sending");

    // 1. Save it in the admin's Enquiries inbox  2. Email it to the school (Web3Forms)
    data.append("access_key", WEB3FORMS_KEY);
    data.append("from_name", "IMS Website");
    const [saved, emailed] = await Promise.allSettled([
      api.post("/public/enquiries", { ...fields, page: window.location.pathname }),
      fetch("https://api.web3forms.com/submit", { method: "POST", body: data }).then(async (res) => {
        const json = await res.json();
        if (!json.success) throw new Error(json.message || "Please try again.");
      }),
    ]);

    if (saved.status === "fulfilled" || emailed.status === "fulfilled") {
      setStatus("sent");
      form.reset();
    } else {
      // The server's message (e.g. "Please check the email address") is the most useful one
      setError(saved.reason?.status === 400 || saved.reason?.status === 429 ? saved.reason.message : "Please check your connection, or call us.");
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className="flex flex-col items-center py-12 text-center" role="status">
        <PiCheckCircle className="text-6xl text-emerald-700" aria-hidden="true" />
        <h3 className="mt-4 font-display text-2xl font-bold text-ink">JazakAllah Khair!</h3>
        <p className="mt-2 max-w-sm text-ink/70">Your message has been sent. Our team will get back to you soon.</p>
        <button onClick={() => setStatus("idle")} className="mt-6 text-sm font-semibold uppercase tracking-[0.14em] text-emerald-700">Send another message</button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      {/* Honeypot: bots fill it, people never see it */}
      <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-1.5 text-sm font-medium text-ink/80">
          Your name
          <input name="name" required autoComplete="name" className={field} />
        </label>
        <label className="grid gap-1.5 text-sm font-medium text-ink/80">
          Phone
          <input name="phone" type="tel" autoComplete="tel" inputMode="tel" className={field} />
        </label>
      </div>
      <label className="grid gap-1.5 text-sm font-medium text-ink/80">
        Email
        <input name="email" type="email" required autoComplete="email" className={field} />
      </label>
      <label className="grid gap-1.5 text-sm font-medium text-ink/80">
        Subject
        <select name="subject" className={field} defaultValue={SUBJECTS[0]}>
          {SUBJECTS.map((s) => <option key={s}>{s}</option>)}
        </select>
      </label>
      <label className="grid gap-1.5 text-sm font-medium text-ink/80">
        Message
        <textarea name="message" rows={5} required className={field} placeholder="Tell us about your child’s class and age, or ask us anything." />
      </label>
      {status === "error" && (
        <p className="flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-800" role="alert">
          <PiWarningCircle className="shrink-0 text-lg" /> Could not send: {error}
        </p>
      )}
      <button type="submit" disabled={status === "sending"} className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-700 px-6 py-3.5 font-semibold text-ivory-50 transition hover:bg-emerald-600 disabled:opacity-60">
        <PiPaperPlaneTilt aria-hidden="true" /> {status === "sending" ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
};

export default ContactForm;
