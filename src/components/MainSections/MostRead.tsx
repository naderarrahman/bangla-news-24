import Link from "next/link";

export interface MostReadArticle {
  id: string;
  title: string;
  link: string;
  rank?: number;
}

const toBanglaNumber = (num: number): string => {
  const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return num
    .toString()
    .split("")
    .map((digit) => banglaDigits[parseInt(digit, 10)] || digit)
    .join("");
};

export default async function MostRead() {
  const res = await fetch("https://news-api-v2.vercel.app/api/news/most-read", {
    next: { revalidate: 3600 },
  });

  const data = await res.json();
  const mostRead: MostReadArticle[] = data.data || [];

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-5 shadow-sm">
      <h2 className="text-xl font-extrabold text-gray-900 dark:text-white border-b-2 border-red-700 pb-2 mb-4">
        সর্বাধিক পঠিত
      </h2>

      <div className="space-y-4">
        {mostRead.map((article, index) => {
          const rankNumber = article.rank || index + 1;

          return (
            <Link
              key={article.id || index}
              href={`/detailed-news/${article.id}`}
              className="flex items-start space-x-3 group cursor-pointer transition-colors"
            >
              <span className="text-xl font-extrabold text-red-700 dark:text-red-500 leading-none min-w-[20px] pt-0.5">
                {toBanglaNumber(rankNumber)}
              </span>

              <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 group-hover:text-red-700 dark:group-hover:text-red-400 leading-snug transition-colors line-clamp-3">
                {article.title}
              </h3>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
