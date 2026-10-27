
"use client";

import {
  useEffect,
  useRef,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { gsap } from "@/lib/gsap";
import { SocialIcon } from "@/components/ui/SocialIcons";

/* ──────────────────────────── Types ──────────────────────────── */

type Member = {
  name: string;
  role: string;
  bio: string;
  highlight?: string;
  image?: string;
  socials?: Partial<
    Record<
      | "facebook"
      | "instagram"
      | "linkedin"
      | "x"
      | "youtube"
      | "tiktok"
      | "whatsapp"
      | "website"
      | "portfolio",
      string
    >
  >;
};

/* ──────────────────────────── Data ──────────────────────────── */

const TEAM: Member[] = [
  {
    name: "Thilanka Rathnayake",
    role: "Senior Digital Marketing Manager",
    highlight: "Thilanka",
    bio: "In the role of Senior Digital Marketing Manager, Thilanka leads digital marketing initiatives, manages campaign performance, identifies growth opportunities, and works closely with creative and marketing teams to deliver measurable results.",
    image: "/images/Team/Thilanka.png",
    socials: {
      linkedin: "https://www.linkedin.com/in/iamthilanka/",
    },
  },
  {
    name: "Kalani Bandara",
    role: "Senior Software Engineer",
    highlight: "Kalani",
    bio: "In the role of Senior Software Engineer, Kalani leads software development initiatives, designs and implements scalable technology solutions, ensures code quality and system performance, and contributes to technical decision-making. Working closely with development and cross-functional teams, Kalani helps transform business requirements into reliable, efficient, and innovative software solutions while supporting best practices and continuous improvement.",
    image: "/images/Team/Kalani.png",
    socials: {
      linkedin: "https://www.linkedin.com/in/kalani-bandara-304162160/",
      website: "https://lanibandara.dev",
    },
  },
  {
    name: "Lahiru DK Yapa",
    role: "Senior Software Engineer",
    highlight: "Lahiru",
    bio: "In the role of Senior Software Engineer, Lahiru oversees the design, development, testing, and optimisation of software solutions. Working closely with technical and cross-functional teams, Lahiru contributes to architecture and technical decisions, resolves complex development challenges, and ensures that applications are secure, scalable, reliable, and aligned with business requirements.",
    image: "/images/Team/Lahiru.png",
    socials: {
      linkedin: "https://www.linkedin.com/in/devlahirudinelka/",
      website: "https://devlahirudinelka.me",
    },
  },
  {
    name: "MC Rumesh",
    role: "Art Director",
    highlight: "Rumesh",
    bio: "In the role of Art Director, MC Rumesh leads the creative vision across visual projects, develops design concepts, and ensures consistency in the overall visual identity of campaigns and brand communications. Working closely with designers, marketing, and creative teams, Rumesh transforms ideas into compelling visual experiences while maintaining high creative standards and ensuring every project communicates its intended message effectively.",
    image: "/images/Team/Rumesh.png",
    socials: {
      linkedin: "https://www.linkedin.com/in/chandika-rumesh/",
      portfolio: "https://www.pinterest.com/ruuarts/Chithal",
    },
  },
  {
    name: "Chithal Wellage",
    role: "Senior Graphic Designer",
    highlight: "Chithal",
    bio: "In the role of Senior Graphic Designer, Chithal develops creative visual concepts and produces engaging designs across digital and marketing platforms. Working closely with the Art Director, marketing, and creative teams, Chithal translates ideas and brand requirements into polished designs, maintaining consistency, quality, and strong attention to detail across every design.",
    image: "/images/Team/Chithal.png",
    socials: {
      linkedin: "https://www.linkedin.com/in/chithal-wellage-10825a2b8/",
      portfolio: "https://www.behance.net/chithalwellage1/appreciated",
    },
  },
  {
    name: "Sumudu Wijewardhana",
    role: "Video Editor",
    highlight: "Sumudu",
    bio: "In the role of Video Editor, Sumudu transforms raw footage and creative concepts into engaging, polished video content for digital and marketing platforms. Working closely with the creative, design, and marketing teams, Sumudu manages video editing, pacing, transitions, sound, visual effects, and storytelling to create compelling content that effectively communicates the intended message and strengthens the overall brand presence.",
    image: "/images/Team/Sumudu.png",
    socials: {
      facebook: "https://www.facebook.com/sumuduonline",
      portfolio: "https://www.deviantart.com/sumuduonline",
    },
  },
];

/* ──────────────────────────── Socials Config ─────────────────── */

type SocialLink = {
  key: keyof NonNullable<Member["socials"]>;
  label: string;
  icon: ReactNode;
};

const SOCIALS: SocialLink[] = [
  {
    key: "facebook",
    label: "Facebook",
    icon: <SocialIcon name="Facebook" size={17} />,
  },
  {
    key: "instagram",
    label: "Instagram",
    icon: <SocialIcon name="Instagram" size={17} />,
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    icon: <SocialIcon name="LinkedIn" size={17} />,
  },
  {
    key: "x",
    label: "X",
    icon: <SocialIcon name="X" size={16} />,
  },
  {
    key: "youtube",
    label: "YouTube",
    icon: <SocialIcon name="YouTube" size={19} />,
  },
  {
    key: "tiktok",
    label: "TikTok",
    icon: <SocialIcon name="TikTok" size={17} />,
  },
  {
    key: "whatsapp",
    label: "WhatsApp",
    icon: <SocialIcon name="WhatsApp" size={18} />,
  },
  {
    key: "website",
    label: "Website",
    icon: <SocialIcon name="Website" size={17} />,
  },
  {
    key: "portfolio",
    label: "Portfolio",
    icon: <SocialIcon name="Portfolio" size={17} />,
  },
];

/* ──────────────────────────── Helpers ────────────────────────── */

function bioWithHighlight(member: Member): ReactNode {
  if (!member.highlight || !member.bio.includes(member.highlight)) {
    return member.bio;
  }

  const [before, ...rest] = member.bio.split(member.highlight);

  return (
    <>
      {before}
      <strong className="font-semibold text-black">
        {member.highlight}
      </strong>
      {rest.join(member.highlight)}
    </>
  );
}

/* ──────────────────────────── Member Card ────────────────────── */

function MemberCard({
  member,
  onOpen,
}: {
  member: Member;
  index: number;
  onOpen: (member: Member) => void;
}) {
  const initials = member.name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");

  return (
    <article
      className="group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-[1.875rem] border border-light-transparent-black bg-white transition-[border-color,box-shadow] duration-300 hover:border-[#d7ba5e] hover:shadow-[0_30px_60px_-35px_rgba(0,0,0,0.35)] max-mobile:rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d7ba5e] focus-visible:ring-offset-4"
      onClick={() => onOpen(member)}
      role="button"
      tabIndex={0}
      aria-label={`View ${member.name}'s profile`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen(member);
        }
      }}
    >
      {/* Image */}
      <div className="relative aspect-[4/3.6] w-full overflow-hidden bg-black">
        {member.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={member.image}
            alt={`${member.name}, ${member.role}`}
            loading="lazy"
            className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-[6rem] font-medium leading-none tracking-tight text-[#d7ba5e]">
            {initials}
          </div>
        )}

        {/* Hover overlay hint — visual effect only */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-500 group-hover:bg-black/40">
          <span className="translate-y-4 rounded-full border border-white/60 px-5 py-2 font-sans text-sm font-medium tracking-wide text-white opacity-0 backdrop-blur-sm transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            View Profile
          </span>
        </div>
      </div>

      {/* Member Information */}
      <div className="flex flex-1 flex-col items-center px-7 pb-7 pt-6 text-center max-md:px-5">
        <h3 className="font-sans text-[1.5rem] font-semibold leading-[1.2em] text-black">
          {member.name}
        </h3>

        <div className="mt-1 font-sans text-[0.9375rem] leading-[1.45em] text-[#a8915a]">
          {member.role}
        </div>
      </div>
    </article>
  );
}

/* ──────────────────────────── Full-Screen Overlay ────────────── */

function MemberOverlay({
  member,
  onClose,
}: {
  member: Member | null;
  onClose: () => void;
}) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const [visible, setVisible] = useState(false);

  /* ── Animate In ── */
  const animateIn = useCallback(() => {
    if (!overlayRef.current || !backdropRef.current || !cardRef.current) {
      return;
    }

    setVisible(true);

    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
    });

    tlRef.current = tl;

    tl.set(overlayRef.current, { pointerEvents: "auto" })
      .fromTo(
        backdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.35 },
      )
      .fromTo(
        cardRef.current,
        { opacity: 0, y: 60, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.55 },
        "-=0.15",
      );

    if (imageRef.current) {
      tl.fromTo(
        imageRef.current,
        { opacity: 0, scale: 1.08 },
        { opacity: 1, scale: 1, duration: 0.6 },
        "-=0.35",
      );
    }

    if (detailsRef.current) {
      const children = detailsRef.current.children;

      tl.fromTo(
        children,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.45, stagger: 0.07 },
        "-=0.4",
      );
    }
  }, []);

  /* ── Animate Out ── */
  const animateOut = useCallback(() => {
    if (!overlayRef.current || !backdropRef.current || !cardRef.current) {
      setVisible(false);
      return;
    }

    if (tlRef.current) {
      tlRef.current.kill();
    }

    const tl = gsap.timeline({
      defaults: { ease: "power3.in" },
      onComplete: () => {
        setVisible(false);

        if (overlayRef.current) {
          gsap.set(overlayRef.current, { pointerEvents: "none" });
        }
      },
    });

    tlRef.current = tl;

    tl.to(cardRef.current, {
      opacity: 0,
      y: 40,
      scale: 0.97,
      duration: 0.3,
    }).to(
      backdropRef.current,
      { opacity: 0, duration: 0.25 },
      "-=0.15",
    );
  }, []);

  /* ── React to Member Changes ── */
  useEffect(() => {
    if (member) {
      animateIn();
    } else if (visible) {
      animateOut();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [member]);

  /* ── Escape Key ── */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && member) {
        onClose();
      }
    };

    window.addEventListener("keydown", onKey);

    return () => window.removeEventListener("keydown", onKey);
  }, [member, onClose]);

  /* ── Lock Body Scroll ── */
  useEffect(() => {
    if (visible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [visible]);

  /* ── Render Nothing When Closed ── */
  if (!visible && !member) {
    return null;
  }

  const socials = member
    ? SOCIALS.filter((s) => member.socials?.[s.key])
    : [];

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 max-mobile:p-3"
      style={{ pointerEvents: "none" }}
    >
      {/* Backdrop */}
      <div
        ref={backdropRef}
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={onClose}
        style={{ opacity: 0 }}
      />

      {/* Content Card */}
      <div
        ref={cardRef}
        className="relative z-10 flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl md:flex-row max-mobile:rounded-2xl"
        style={{ opacity: 0 }}
        role="dialog"
        aria-modal="true"
        aria-label={member ? `${member.name}'s profile` : "Team member profile"}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close profile"
          className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm transition-colors duration-300 hover:bg-[#d7ba5e] hover:text-black"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M4 4L12 12M12 4L4 12"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {/* Image Side */}
        <div
          ref={imageRef}
          className="relative w-full shrink-0 bg-black md:w-[45%]"
          style={{ opacity: 0 }}
        >
          <div className="aspect-[3/4] w-full md:aspect-auto md:h-full md:min-h-[520px]">
            {member?.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={member.image}
                alt={member.name}
                className="h-full w-full object-cover object-top"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-[8rem] font-medium leading-none tracking-tight text-[#d7ba5e]">
                {member?.name
                  .split(" ")
                  .map((p) => p[0])
                  .slice(0, 2)
                  .join("")}
              </div>
            )}
          </div>

          {/* Gold Accent Bar */}
          <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-[#d7ba5e] to-[#f0d98c]" />
        </div>

        {/* Details Side */}
        <div
          ref={detailsRef}
          className="flex flex-1 flex-col justify-center overflow-y-auto px-10 py-10 max-md:px-7 max-md:py-8 max-mobile:px-5 max-mobile:py-6"
        >
          {member && (
            <>
              <p className="font-sans text-[0.8125rem] font-semibold uppercase tracking-[0.15em] text-[#d7ba5e]">
                {member.role}
              </p>

              <h2 className="mt-3 font-sans text-[2.25rem] font-bold leading-[1.15em] text-black max-mobile:text-[1.75rem]">
                {member.name}
              </h2>

              <div className="mt-1 h-[2px] w-12 rounded-full bg-[#d7ba5e]" />

              <p className="mt-6 max-h-[220px] overflow-y-auto font-sans text-[1rem] leading-[1.7em] text-dim-gray">
                {bioWithHighlight(member)}
              </p>

              {/* Social Links */}
              {socials.length > 0 && (
                <div className="mt-8 flex flex-wrap gap-2">
                  {socials.map((social) => (
                    <a
                      key={social.key}
                      href={member.socials?.[social.key]}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${member.name} — ${social.label}`}
                      title={social.label}
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-light-transparent-black text-[#a8915a] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#d7ba5e] hover:bg-[#d7ba5e]/10 hover:text-black"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────── Main Section ──────────────────── */

export default function Team() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [activeMember, setActiveMember] = useState<Member | null>(null);

  /* ── Heading Animation ── */
  useEffect(() => {
    const heading = headingRef.current;

    if (!heading) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        heading,
        { opacity: 0, y: 30 },
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

  /* ── Open Profile ── */
  const handleOpen = useCallback((member: Member) => {
    setActiveMember(member);
  }, []);

  /* ── Close Profile ── */
  const handleClose = useCallback(() => {
    setActiveMember(null);
  }, []);

  return (
    <section className="relative">
      <div className="pt-30 w-full max-tablet:pt-20 max-md:pt-18 max-mobile:pt-16" />

      <div className="mx-auto block w-full max-w-7xl px-6 max-tablet:px-[1.2rem] max-md:px-[1.0499rem] max-mobile:px-[0.899rem]">
        <div className="inner-wrappar">
          <div className="flex flex-col items-start justify-start gap-4 max-tablet:gap-[0.8rem] max-md:gap-[0.7rem] max-mobile:gap-[0.6rem]">
            <div className="process font-sans text-[0.875rem] leading-[1.45em] text-dim-gray">
              <h1 className="text-left" ref={headingRef}>
                Team
              </h1>
            </div>

            <h3 className="text-left">
              Get to know the masterminds that make the magic happen.
            </h3>
          </div>

          <div className="pt-6 w-full max-tablet:pt-[1.2rem] max-md:pt-[1.0499rem] max-mobile:pt-[0.899rem]" />

          <div className="flex flex-col gap-5">
            <p className="mb-0 font-sans text-base leading-[1.45em] font-normal text-black">
              We are a team of passionate innovators dedicated to building
              modern solutions for businesses that want to grow, adapt, and
              thrive. Our mission is to combine creativity, technology, and
              strategy to deliver meaningful results for our clients. With a
              focus on collaboration and transparency, we bring fresh ideas and
              practical expertise to every project. From concept to execution,
              we are committed to excellence, ensuring that each solution is
              tailored to meet the unique needs of those we serve. Together, we
              transform challenges into opportunities and visions into reality.
            </p>

            <p className="mb-0 font-sans text-base leading-[1.45em] font-normal text-black">
              Our team of specialists is passionate about transforming ideas
              into compelling digital experiences. From sophisticated website
              designs and engaging social media campaigns to impactful branding
              and performance-driven advertising, we focus on delivering quality
              and consistency across every touchpoint. We believe successful
              digital marketing is built on strong partnerships. By working
              closely with our team and clients, we become an extension of their
              team, understanding their vision, solving their challenges, and
              continuously looking for opportunities to help them move forward.
            </p>
          </div>
        </div>

        <div className="pt-15 w-full max-tablet:pt-12 max-md:pt-10.5 max-mobile:pt-9" />

        {/* Team Member Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TEAM.map((member, index) => (
            <MemberCard
              key={member.name}
              member={member}
              index={index}
              onOpen={handleOpen}
            />
          ))}
        </div>
      </div>

      <div className="pt-30 w-full max-tablet:pt-20 max-md:pt-18 max-mobile:pt-16" />

      {/* Full-Screen Profile Overlay */}
      <MemberOverlay
        member={activeMember}
        onClose={handleClose}
      />
    </section>
  );
}
