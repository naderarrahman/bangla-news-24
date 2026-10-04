import Image from "next/image";
import { Article } from "@/app/page";
import Link from "next/link";

export default function NewsCard({ article }: { article: Article }) {
  const formattedDate = article.firstPublished
    ? new Date(article.firstPublished).toLocaleDateString("bn-BD", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <Link href={`/detailed-news/${article.id}`}>

    <div className="bg-white dark:bg-gray-800 rounded-md shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow">
      <div>
        {/* News Image */}
        <div className="relative w-full h-44 overflow-hidden bg-gray-100">
          {article.imageUrl && (
            <Image
              src={article.imageUrl}
              alt={article.title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
          )}
        </div>

        {/* Content Area */}
        <div className="p-3">
          <span className="text-xs font-semibold text-red-700 dark:text-red-500 block mb-1">
            {article.category}
          </span>
          <h3 className="text-base font-bold text-gray-900 dark:text-white leading-snug line-clamp-2 hover:text-red-700 cursor-pointer transition-colors">
            {article.title}
          </h3>
          {article.description && (
            <p className="text-xs text-gray-600 dark:text-gray-300 mt-2 line-clamp-2 leading-relaxed">
              {article.description}
            </p>
          )}
        </div>
      </div>

      {formattedDate && (
        <div className="px-3 pb-3 pt-1">
          <span className="text-[11px] text-gray-400 font-medium">
            {formattedDate}
          </span>
        </div>
      )}
    </div>

    </Link>
  );
}