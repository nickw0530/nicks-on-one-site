/**
 * NICK'S ON ONE — Newsstand Editorial design system
 * Subscribe form. Uses Buttondown's native embed-subscribe HTML form.
 * Plain HTML POST — no fetch, no custom API, no CORS issues.
 */

import { ArrowRight } from "lucide-react";

interface SubscribeFormProps {
        variant?: "light" | "dark";
        size?: "default" | "lg";
}

const BD_EMBED_URL =
        "https://buttondown.com/api/emails/embed-subscribe/nicks0530";

export default function SubscribeForm({
        variant = "light",
        size = "default",
}: SubscribeFormProps) {
        const dark = variant === "dark";

  const inputBase =
            "w-full bg-transparent border-b focus:outline-none transition-colors";
        const inputLight =
                  "border-ink/30 focus:border-[color:var(--noo-accent)] text-ink placeholder:text-ink/40";
        const inputDark =
                  "border-white/30 focus:border-[color:var(--noo-accent)] text-paper placeholder:text-paper/40";

  const padding = size === "lg" ? "py-4 text-lg" : "py-3 text-base";

  return (
            <form
                        action={BD_EMBED_URL}
                        method="post"
                        target="_blank"
                        className="flex flex-col sm:flex-row items-stretch gap-3 sm:gap-0"
                        aria-label="Subscribe to Nick's On One"
                      >
                  <label htmlFor={`subscribe-email-${variant}`} className="sr-only">
                          Email address
                  </label>
                  <input
                                id={`subscribe-email-${variant}`}
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                placeholder="you@email.com"
                                className={`${inputBase} ${dark ? inputDark : inputLight} ${padding} flex-1`}
                              />
                  <input type="hidden" name="embed" value="1" />
                  <button
                                type="submit"
                                className={`${padding} px-6 font-mono uppercase text-[12.5px] tracking-[0.18em] flex items-center justify-center gap-2 transition-colors duration-200 active:scale-[0.97] ${
                                                dark
                                                  ? "bg-paper text-ink hover:bg-[color:var(--noo-accent)] hover:text-paper"
                                                  : "bg-ink text-paper hover:bg-[color:var(--noo-accent)]"
                                }`}
                                style={{ transitionDuration: "180ms" }}
                              >
                          Subscribe
                          <ArrowRight className="w-4 h-4" />
                  </button>
            </form>
          );
}
