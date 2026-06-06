/**
 * NICK'S ON ONE — Newsstand Editorial design system
 * Subscribe form. Submits email to Buttondown (nickw0530) via their
 * public subscribe API: POST https://api.buttondown.email/v1/subscribers
 * No API key required for public subscriptions.
 */

import { useState, type FormEvent } from "react";
import { ArrowRight, Check } from "lucide-react";
import { toast } from "sonner";

interface SubscribeFormProps {
    variant?: "light" | "dark";
    size?: "default" | "lg";
}

const BUTTONDOWN_USERNAME = "nickw0530";

export default function SubscribeForm({
    variant = "light",
    size = "default",
}: SubscribeFormProps) {
    const [email, setEmail] = useState("");
    const [done, setDone] = useState(false);
    const [submitting, setSubmitting] = useState(false);

  const dark = variant === "dark";

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                toast.error("Please enter a valid email address.");
                return;
        }
        setSubmitting(true);
        try {
                const res = await fetch(
                          `https://api.buttondown.email/v1/subscribers`,
                  {
                              method: "POST",
                              headers: {
                                            "Content-Type": "application/json",
                                            // Buttondown public subscriber endpoint — no API key needed for
                                            // the newsletter-owner's own subscription form.
                                            "X-Buttondown-Username": BUTTONDOWN_USERNAME,
                              },
                              body: JSON.stringify({ email_address: email, tags: [] }),
                  }
                        );

          if (res.ok || res.status === 201) {
                    setDone(true);
                    toast.success("You're subscribed! Check your inbox to confirm.");
          } else if (res.status === 409) {
                    // Already subscribed
                  setDone(true);
                    toast.info("You're already subscribed — thanks!");
          } else {
                    const data = await res.json().catch(() => ({}));
                    const msg =
                                (data as { detail?: string }).detail ||
                                "Subscription failed. Please try again.";
                    toast.error(msg);
          }
        } catch {
                toast.error("Network error. Please check your connection and try again.");
        } finally {
                setSubmitting(false);
        }
  }

  if (done) {
        return (
                <div
                          className={`flex items-start gap-3 p-4 border ${
                                      dark ? "border-white/15 bg-white/5 text-paper" : "border-ink/15 bg-white text-ink"
                          }`}
                        >
                        <div className="mt-0.5 w-8 h-8 flex items-center justify-center bg-[color:var(--noo-accent)] text-white shrink-0">
                                  <Check className="w-4 h-4" />
                        </div>div>
                        <div>
                                  <p className="font-display font-bold text-lg leading-tight">
                                              You're in — check your inbox.
                                  </p>p>
                                  <p className={`text-[14px] mt-1 ${dark ? "text-paper/70" : "text-ink/70"}`}>
                                              A confirmation email is on its way to <strong>{email}</strong>strong>.
                                  </p>p>
                        </div>div>
                </div>div>
              );
  }
  
    const inputBase =
          "w-full bg-transparent border-b focus:outline-none transition-colors";
    const inputLight =
          "border-ink/30 focus:border-[color:var(--noo-accent)] text-ink placeholder:text-ink/40";
    const inputDark =
          "border-white/30 focus:border-[color:var(--noo-accent)] text-paper placeholder:text-paper/40";
  
    const padding = size === "lg" ? "py-4 text-lg" : "py-3 text-base";
  
    return (
          <form
                  onSubmit={onSubmit}
                  noValidate
                  className="flex flex-col sm:flex-row items-stretch gap-3 sm:gap-0"
                  aria-label="Subscribe to Nick's On One"
                >
                <label htmlFor={`subscribe-email-${variant}`} className="sr-only">
                        Email address
                </label>label>
                <input
                          id={`subscribe-email-${variant}`}
                          name="email"
                          type="email"
                          autoComplete="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@email.com"
                          className={`${inputBase} ${dark ? inputDark : inputLight} ${padding} flex-1`}
                        />
                <button
                          type="submit"
                          disabled={submitting}
                          className={`${padding} px-6 font-mono uppercase text-[12.5px] tracking-[0.18em] flex items-center justify-center gap-2 transition-colors duration-200 active:scale-[0.97] ${
                                      dark
                                        ? "bg-paper text-ink hover:bg-[color:var(--noo-accent)] hover:text-paper"
                                        : "bg-ink text-paper hover:bg-[color:var(--noo-accent)]"
                          }`}
                          style={{ transitionDuration: "180ms" }}
                        >
                  {submitting ? "Sending…" : "Subscribe"}
                        <ArrowRight className="w-4 h-4" />
                </button>button>
          </form>form>
        );
}</div>
