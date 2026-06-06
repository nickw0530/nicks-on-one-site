/**
 * NICK'S ON ONE — Newsstand Editorial design system
 * Subscribe page. Honest copy, clear form, no membership/login flows.
 */

import PageLayout from "@/components/PageLayout";
import SubscribeForm from "@/components/SubscribeForm";
import { ASSETS } from "@/lib/site";
import { Mail, Inbox, Bell } from "lucide-react";

export default function Subscribe() {
    return (
          <PageLayout
                  title="Subscribe | Nick's On One"
                  description="Subscribe to Nick's On One for new posts, honest thoughts, humor, and real-life commentary."
                  keywords="subscribe Nick's On One, email newsletter, personal blog subscription, honest writing, real-life commentary, Mosaic Minds Media"
                >
                <section className="bg-[#0E0E0E] text-paper relative overflow-hidden">
                        <div
                                    className="absolute -right-32 -top-20 w-[520px] h-[520px] opacity-[0.05]"
                                    aria-hidden="true"
                                  >
                                  <img
                                                src={ASSETS.logo}
                                                alt=""
                                                className="w-full h-full object-contain invert"
                                              />
                        </div>
                        <div className="container py-20 md:py-28 relative">
                                  <div className="flex items-center gap-4 mb-8 max-w-2xl">
                                              <span className="kicker">Subscribe</span>
                                              <span className="rule-thin flex-1 opacity-30" />
                                              <span className="kicker text-paper/60" style={{ color: "rgba(247,245,240,0.6)" }}>
                                                            Free · No spam
                                              </span>
                                  </div>
                        
                                  <h1 className="font-display font-black tracking-[-0.02em] leading-[0.95] text-[clamp(2.5rem,7vw,5.5rem)] max-w-4xl">
                                              Subscribe to{" "}
                                              <span className="italic font-light">Nick's</span>{" "}
                                              <span className="text-[color:var(--noo-accent)]">On One.</span>
                                  </h1>
                        
                                  <p className="mt-7 text-lg md:text-xl text-paper/75 max-w-2xl leading-relaxed">
                                              Get new posts, honest thoughts, and the occasional line that
                                              probably needed to be said.
                                  </p>
                        
                                  <div className="mt-12 max-w-2xl">
                                              <SubscribeForm variant="dark" size="lg" />
                                              <p className="mt-3 text-xs text-paper/45 font-mono uppercase tracking-[0.14em]">
                                                            Your email goes to the writer, not to a marketing list.
                                              </p>
                                  </div>
                        
                          {/* What you get */}
                                  <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-4xl">
                                    {[
                  {
                                    icon: Mail,
                                    title: "New posts, first.",
                                    body: "When a new essay drops, you get it before the social feeds do.",
                  },
                  {
                                    icon: Inbox,
                                    title: "Nothing else.",
                                    body: "No funnels. No drip sequences. No upsells. Just the writing.",
                  },
                  {
                                    icon: Bell,
                                    title: "Real frequency.",
                                    body: "Posts when they're ready. Sometimes weekly, sometimes not.",
                  },
                              ].map(({ icon: Icon, title, body }) => (
                                              <div key={title} className="reveal">
                                                              <div className="w-10 h-10 flex items-center justify-center bg-[color:var(--noo-accent)] mb-4">
                                                                                <Icon className="w-5 h-5 text-paper" />
                                                              </div>
                                                              <h3 className="font-display font-bold text-xl tracking-[-0.01em]">
                                                                {title}
                                                              </h3>
                                                              <p className="mt-2 text-paper/65 leading-relaxed text-[15px]">
                                                                {body}
                                                              </p>
                                              </div>
                                            ))}
                                  </div>
                        </div>
                </section>
          </PageLayout>
        );
}</PageLayout>
