"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

// Recognition copy is from the About Us document.
// Add more awards here when confirmed.
const AWARDS = [
  {
    image: "/images/Awards/2024 Digital Marketing Award Trophy.jpg.jpeg",
    alt: "Most Popular Digital Marketing Agency 2024",
  },
  {
    image: "/images/Awards/Global Excellence Award Trophy.jpg.jpeg",
    alt: "Most Popular Athlete Facebook Page 2023",
  },
  {
    image: "/images/Awards/Glossy Crystal Globe Award Trophy.jpg.jpeg",
    alt: "Most Popular Digital Marketing Agency 2023",
  },
];

export default function Awards() {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const heading = headingRef.current;

    if (!heading) return;

    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (prefersReducedMotion) return;

      gsap.fromTo(
        heading,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          clearProps: "transform",
        },
      );
    }, heading);

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative">
      <div className="pt-30 w-full max-tablet:pt-20 max-md:pt-18 max-mobile:pt-16" />

      <div className="block mx-auto px-6 max-w-7xl w-full before:content-['_'] before:[grid-area:1_/_1_/_2_/_2] before:table after:clear-both after:content-['_'] after:[grid-area:1_/_1_/_2_/_2] after:table max-tablet:px-[1.2rem] max-md:px-[1.0499rem] max-mobile:px-[0.899rem]">
        <div className="inner-wrappar">
          {/* Section heading — same layout as Team */}
          <div className="flex flex-col items-start justify-start gap-4 max-tablet:gap-[0.8rem] max-md:gap-[0.7rem] max-mobile:gap-[0.6rem]">
            <h1 ref={headingRef} className="text-left">
              Awards & Honors
            </h1>

            <h3 className="text-left">
              Celebrating the recognition behind our creative journey.
            </h3>
          </div>

          {/* Description — same spacing as Team */}
          <div className="pt-6 w-full max-tablet:pt-[1.2rem] max-md:pt-[1.0499rem] max-mobile:pt-[0.899rem]" />

          <div className="flex flex-col gap-5">
            <p className="mb-0 font-sans text-black text-[1rem] leading-[1.45em] font-normal">
              Our journey is built on creativity, innovation, and a commitment
              to delivering meaningful digital experiences. Recognition
              motivates us to keep raising our standards and creating work that
              makes a difference. We value the trust of our clients and the
              dedication of our team. Every project is an opportunity to combine
              creative thinking with strategic execution and deliver results
              that matter.
            </p>
          </div>

          {/* Awards list */}
          <div className="pt-15 w-full max-tablet:pt-12 max-md:pt-10.5 max-mobile:pt-9" />

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {AWARDS.map((award) => (
              <div
                key={award.image}
                className="group relative overflow-hidden rounded-2xl cursor-pointer"
              >
                <div className="aspect-[9/11] w-full overflow-hidden rounded-2xl bg-[#f5f5f5]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={award.image}
                    alt={award.alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-150"
                  />
                </div>
                <p className="text-center text-base font-medium text-gray-700 mt-5">
                  {award.alt}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="pt-30 w-full max-tablet:pt-20 max-md:pt-18 max-mobile:pt-16" />
    </section>
  );
}
