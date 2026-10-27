import Image from "next/image";
import Link from "next/link";
import type { NewsItem } from "@/lib/news";

export default function NewsCard({ item }: { item: NewsItem }) {
  return (
    <Link
      href={`/news/${item.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#dadce0] bg-white transition-all duration-200 hover:border-[#bdc1c6] hover:shadow-[0_1px_3px_rgba(60,64,67,0.12),0_4px_8px_rgba(60,64,67,0.08)]"
    >
      {/* Featured image */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#f8f9fa]">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="text-sm font-medium text-[#5f6368]">
              Ceylexa News &amp; Events
            </span>
          </div>
        )}
      </div>

      {/* Card content */}
      <div className="flex flex-1 flex-col p-6">
        <span className="text-xs font-medium uppercase tracking-[0.08em] text-[#5f6368]">
          {item.category}
        </span>

        <h3 className="mt-3 text-lg font-medium leading-7 tracking-[-0.02em] text-[#202124] transition-colors duration-200 group-hover:text-[#1a73e8]">
          {item.title}
        </h3>

        <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#5f6368]">
          {item.paragraphs[0]}
        </p>

        <span className="mt-auto flex items-center gap-1.5 pt-6 text-sm font-medium text-">
          Read more
          <span
            aria-hidden="true"
            className="transition-transform duration-200 group-hover:translate-x-1"
          >
            →
          </span>
        </span>
      </div>
    </Link>
  );
}
