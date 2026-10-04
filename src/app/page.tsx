import MainNews from "@/components/MainSections/MainNews";
import MostRead from "@/components/MainSections/MostRead";
import NewsCard from "@/components/MainSections/NewsCard";

export interface Article {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  firstPublished?: string;
}

export interface Section {
  curationId: string;
  title: string;
  articles: Article[];
}

export default async function Home() {
  const res = await fetch("https://news-api-v2.vercel.app/api/news/sections", {
    next: { revalidate: 3600 },
  });

  const data = await res.json();
  const sections: Section[] = data.data || [];
  
  const mainNews = sections[0]?.articles || [];
  const excludedIds = [
    "urn:bbc:tipo:list:0ad2eb5d-7a0e-4c74-b8b4-de3de9bc5137",
    "urn:bbc:tipo:list:0de6d7f8-ccae-45b6-b843-7329b6e521b7",
    "urn:bbc:tipo:list:61a6be9c-5bb1-4ab5-ad6e-9855ff26a267"
  ]
  
  const otherNews = sections.slice(1).filter(s => !excludedIds.includes(s.curationId));
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen pb-10">

      <div className="container mx-auto px-4 my-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Left Column (Main News + Other News Sections) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/*  Main Featured News */}
            <MainNews News={mainNews} />

            {/* Other  Sections */}
            {otherNews.map((section) => (
              <div key={section.curationId} className="mt-8">

                <div className="border-b-2 border-red-700 pb-1 mb-4">
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                    {section.title}
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {section.articles?.map((article) => (
                    <NewsCard key={article.id} article={article} />
                  ))}
                </div>

              </div>
            ))}

          </div>

          {/* Right Column (Most Read Section: 4 Cols) */}
          <div className="lg:col-span-4">
            <MostRead />
          </div>

        </div>
      </div>
    </div>
  );
}