import MainNews from "@/components/MainSections/MainNews";
import Marquee from "@/components/Marquee";

export interface Article {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
}

export default async function Home() {
  const res = await fetch("https://news-api-v2.vercel.app/api/news/sections", {
    next: { revalidate: 3600 },
  });

  const data = await res.json();
  const mainNews: Article[] = data.data?.[0]?.articles || [];

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen pb-10">
      <Marquee />

      <div className="container mx-auto px-4 my-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main News Section */}
          <div className="lg:col-span-8">
            <MainNews News={mainNews} />
          </div>

          {/* Most Read Section */}
          <div className="lg:col-span-4">
          </div>
        </div>
      </div>
    </div>
  );
}