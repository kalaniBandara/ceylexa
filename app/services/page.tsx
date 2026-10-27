import type { Metadata } from "next";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";
import CTASection from "@/components/home/CTASection";
import ServicePackages from "@/components/ServicePackages";
import ServicesGrid from "@/components/ServicesGrid";
import { PLATFORM_PARTNERS, SERVICES_INTRO } from "@/lib/services-data";
import Badge from "@/components/ui/Badge";
import Reveal from "@/components/ui/Reveal";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Services & Packages — Ceylexa",
  description:
    "Web design, digital marketing, content creation, paid media, branding, and influencer campaigns — plus Starter, Growth, and Premium social media packages from Ceylexa.",
};

export default function ServicesPage() {
  return (
    <div className="overflow-clip">
      <Navbar />

      <div className="main">
        <section className="relative overflow-hidden bg-background pb-8 pt-40 lg:pt-44">
          <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-gradient-to-br from-accent/20 via-accent-2/10 to-transparent blur-3xl" />
          <div className="mx-auto  w-full max-w-7xl px-6 text-left lg:px-8">
            <Reveal>
              {/* <Badge>Services</Badge> */}
              <h1 className="tracking-tight">
                {SERVICES_INTRO.heading} {SERVICES_INTRO.headingAccent}
              </h1>
              {SERVICES_INTRO.paragraphs.map((paragraph) => (
                <p key={paragraph} className="mx-auto mt-6 text-muted">
                  {paragraph}
                </p>
              ))}
            </Reveal>
          </div>
        </section>

        <ServicesGrid />
        <ServicePackages />

        <section className="relative bg-background py-24">
          <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
            <Reveal>
              <h2 className="tracking-tight">{PLATFORM_PARTNERS.heading}</h2>

              <p className="mt-5 max-w-3xl text-sm leading-7 text-muted-foreground md:text-base">
                {PLATFORM_PARTNERS.body}
              </p>

              <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
                {PLATFORM_PARTNERS.partners.map((partner) => (
                  <li
                    key={partner.name}
                    className="flex min-h-32 items-center justify-center rounded-2xl border border-[#dadce0] bg-white p-8 transition-shadow duration-200 hover:shadow-[0_1px_3px_rgba(60,64,67,0.12),0_4px_8px_rgba(60,64,67,0.08)]"
                  >
                    <Image
                      src={partner.image}
                      alt={partner.alt}
                      width={220}
                      height={90}
                      sizes="(max-width: 640px) 80vw, (max-width: 1024px) 28vw, 220px"
                      className={`h-auto max-h-16 w-auto max-w-full object-contain ${
                        partner.name === "Meta Partner"
                          ? "scale-[1.7]"
                          : partner.name === "TikTok Partner"
                            ? "scale-150"
                            : ""
                      }`}
                    />
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        <CTASection />
      </div>

      <Footer />
    </div>
  );
}
