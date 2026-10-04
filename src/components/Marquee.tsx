import Link from "next/link";
import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

interface Headings {
  id: string;
  title: string;
}

export default async function Marquee() {
  const res = await fetch("https://news-api-v2.vercel.app/api/news?limit=10", {
    next: { revalidate: 3600 },
  });
  const data = await res.json();
  const headings: Headings[] = data.data || [];

  return (
    <div className="w-full bg-[#b90000] text-white my-3">
      <div className="container mx-auto px-4 flex items-center overflow-hidden">
        <div className="bg-[#8b0000] text-white font-bold px-4 py-2 shrink-0 z-10 flex items-center justify-center text-sm">
          সর্বশেষ
        </div>

        <div className="overflow-hidden whitespace-nowrap flex items-center py-2 text-sm font-medium w-full">
          <MarqueeText direction="right" duration={10}>
            {headings.map((h) => (
              <span key={h.id} className="inline-flex items-center">
                <Link 
                  href={`/detailed-news/${h.id}`} 
                  className="hover:underline cursor-pointer"
                >
                  {h.title}
                </Link>
                <span className="mx-4 text-gray-300">•</span>
              </span>
            ))}
          </MarqueeText>
        </div>
      </div>
    </div>
  );
}