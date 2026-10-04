import NewsCard from "@/components/MainSections/NewsCard";
import { Article } from "@/app/page";

interface CategoryPageProps {
  params: Promise<{
    categoryId: string;
  }>;
}

interface CategoryApiResponse {
  success?: boolean;
  title?: string;
  data: Article[];
}

export default async function CategoryNewsPage({ params }: CategoryPageProps) {
  const { categoryId } = await params;

  const res = await fetch(
    `https://news-api-v2.vercel.app/api/category/${categoryId}`,
    {
      next: { revalidate: 3600 },
    }
  );

  const data: CategoryApiResponse = await res.json();
  const categoryNews = data.data || [];
  const categoryTitle = data.title || categoryId;

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-8">
      <div className="container mx-auto px-4">
        
        {/* Category Header */}
        <div className="border-b-2 border-red-700 pb-2 mb-6">
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white capitalize">
            {categoryTitle}
          </h1>
        </div>

        {/* News Cards Grid  */}
        {categoryNews.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryNews.map((article) => (
              <NewsCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            এই ক্যাটাগরিতে কোনো সংবাদ পাওয়া যায়নি।
          </div>
        )}

      </div>
    </div>
  );
}