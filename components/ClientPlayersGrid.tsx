import Image from "next/image";
import { SocialIcon } from "@/components/ui/SocialIcons";

type Player = {
  name: string;
  initials: string;
  role: string;
  /** Optional photo, e.g. "/images/Clients/wanindu-hasaranga.webp" */
  photo?: string;
  description: string;
  socials: {
    Facebook?: string;
    Instagram?: string;
    TikTok?: string;
    YouTube?: string;
    X?: string;
  };
};

const PLAYERS: Player[] = [
  {
    name: "Yureni Noshika Gunasekara",
    initials: "YN",
    role: "Actress \u00b7 Singer",
    photo: "/images/Clients/client-1.webp",
    description:
      "Actress in Sri Lankan cinema and television, as well as a singer and media personality.",
    socials: {
      Facebook: "https://www.facebook.com/yureninoshika/",
      Instagram: "https://www.instagram.com/yureninoshika/",
      TikTok: "https://www.tiktok.com/@yureni_noshika",
      YouTube: "https://www.youtube.com/channel/UC-mOUuQBUvlB94pjZdjB5ig",
    },
  },
  {
    name: "Wanindu Hasaranga de Silva",
    initials: "WH",
    role: "Cricketer \u00b7 All-rounder",
    photo: "/images/Clients/client-2.webp",
    description:
      "Sri Lankan international cricketer who plays for the Sri Lanka national team as an all-rounder.",
    socials: {
      Facebook: "https://www.facebook.com/WaninduHasaranga49/",
      Instagram: "https://www.instagram.com/wanindu_49_waniya",
      X: "https://x.com/Wanindu49",
    },
  },
  {
    name: "Volga Kalpani",
    initials: "VK",
    role: "Actress \u00b7 Media Personality",
    photo: "/images/Clients/client-3.webp",
    description:
      "Actress in Sri Lankan cinema and television, as well as a media personality.",
    socials: {
      Facebook: "https://www.facebook.com/volgakalpanie",
      Instagram: "https://www.instagram.com/volgakalpani",
      TikTok: "https://www.tiktok.com/@volga.kalpani",
    },
  },
  {
    name: "Sudheera Bandara",
    initials: "SB",
    role: "Chef \u00b7 Food Historian",
    photo: "/images/Clients/client-4.webp",
    description:
      "Culinary professional, researcher, and food historian dedicated to preserving Sri Lankan food heritage.",
    socials: {
      Facebook: "https://www.facebook.com/chefsudheera/",
      Instagram: "https://www.instagram.com/sudeeracooksup/",
      TikTok: "https://www.tiktok.com/@sudheera_bandara",
      YouTube: "https://www.youtube.com/sadarabandara",
    },
  },
  {
    name: "Kusal Mendis",
    initials: "KM",
    role: "Cricketer \u00b7 Captain",
    photo: "/images/Clients/client-5.webp",
    description:
      "Professional Sri Lankan cricketer and current captain of the Sri Lankan national men's team.",
    socials: {
      Facebook: "https://www.facebook.com/KusalMendis/",
      Instagram: "https://www.instagram.com/kusalmendis.13/",
      X: "https://x.com/KusalMendis13",
    },
  },
  {
    name: "Dhananjaya Bandara",
    initials: "DB",
    role: "Bridal Stylist \u00b7 Designer",
    photo: "/images/Clients/client-6.webp",
    description:
      "Highly celebrated Sri Lankan bridal stylist, makeup artist, and fashion designer.",
    socials: {
      Facebook: "https://www.facebook.com/DhananjayaBandaraStudio/",
      Instagram: "https://www.instagram.com/dhananjaya_bandara_official",
      YouTube: "https://www.youtube.com/@DhananjayaBandaraOfficial",
      TikTok: "https://www.tiktok.com/@dananjayabandaraofficial",
    },
  },
  {
    name: "Chamika Karunaratne",
    initials: "CK",
    role: "Cricketer \u00b7 All-rounder",
    photo: "/images/Clients/client-7.webp",
    description:
      "Professional Sri Lankan cricketer who plays all three formats.",
    socials: {
      Facebook: "https://www.facebook.com/ChamikaKarunaratneOfficial/",
      Instagram: "https://www.instagram.com/chamika_karunaratna_officialfp/",
      X: "https://x.com/chamikak29",
    },
  },
  {
    name: "Bhanuka Rajapaksa",
    initials: "BR",
    role: "Cricketer \u00b7 Batter",
    photo: "/images/Clients/client-8.webp",
    description:
      "Professional Sri Lankan cricketer who plays limited-overs internationals for the national team.",
    socials: {
      Facebook: "https://www.facebook.com/BhanukaRajapaksa54/",
      Instagram: "https://www.instagram.com/bhanukarajapaksa",
      X: "https://x.com/BhanukaRajapak3",
    },
  },
];

function Avatar({ player }: { player: Player }) {
  if (player.photo) {
    return (
      <Image
        src={player.photo}
        alt={player.name}
        width={170}
        height={170}
        className="mb-[18px] h-[170px] w-[170px] max-w-full rounded-full border-[5px] border-[#d7ba5e] bg-white object-cover object-top p-[5px]"
      />
    );
  }
  return (
    <svg
      viewBox="0 0 170 170"
      className="mb-[18px] h-[170px] w-[170px] max-w-full"
      role="img"
      aria-label={`${player.name} placeholder`}
    >
      <circle
        cx="85"
        cy="85"
        r="74"
        fill="none"
        strokeWidth="5"
        stroke="#d7ba5e"
      />
      <circle
        cx="85"
        cy="85"
        r="63"
        fill="none"
        strokeWidth="2"
        strokeDasharray="5 7"
        opacity=".7"
        stroke="#d7ba5e"
      />
      <text
        x="85"
        y="101"
        textAnchor="middle"
        fontWeight="700"
        fontSize="48"
        fill="#b8993f"
      >
        {player.initials}
      </text>
    </svg>
  );
}

export default function ClientPlayersGrid() {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6">
      {PLAYERS.map((p) => (
        <div
          key={p.name}
          className="flex flex-col items-center rounded-3xl border border-border bg-white px-[22px] pb-9 pt-8 text-center shadow-[0_4px_16px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/50 hover:shadow-[0_12px_28px_rgba(0,0,0,0.1)]"
        >
          <Avatar player={p} />
          <div className="mb-1.5 text-[0.72rem] uppercase tracking-[1.6px] text-dim-gray">
            {p.role}
          </div>
          <h3 className="mb-2.5 text-[1.1rem] font-semibold uppercase tracking-[1px] text-[#b8993f]">
            {p.name}
          </h3>
          <p className="mb-5 max-w-[260px]">{p.description}</p>
          <div className="mt-auto flex gap-5">
            {(Object.entries(p.socials) as [string, string][]).map(
              ([name, href]) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${p.name} on ${name}`}
                  className="inline-flex text-[#a8915a] transition-all duration-200 hover:scale-110 hover:text-black"
                >
                  <SocialIcon name={name} size={19} />
                </a>
              ),
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
