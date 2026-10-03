import Image from "next/image";
import { Article } from "@/app/page";

export default function MainNews({ News }: { News: Article[] }) {
  if (!News || News.length === 0) return null;

  const [firstNews, ...othersNews] = News;

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-white dark:bg-gray-800 p-4 rounded-md shadow-sm border border-gray-100 dark:border-gray-700">
      {/*First Featured News */}
      <div className="md:col-span-7 flex flex-col justify-between">
        <div>
          <div className="relative w-full h-64 md:h-72 overflow-hidden rounded-sm">
            <Image
              src={firstNews.imageUrl}
              alt={firstNews.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover hover:scale-105 transition-transform duration-300"
              priority
            />
          </div>
          <div className="mt-3">
            <span className="text-xs font-semibold text-red-700 dark:text-red-500 uppercase tracking-wide">
              {firstNews.category || "প্রধান খবর"}
            </span>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-1 leading-snug hover:text-red-700 cursor-pointer transition-colors">
              {firstNews.title}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 line-clamp-3 leading-relaxed">
              {firstNews.description}
            </p>
          </div>
        </div>
      </div>

      {/* (Right List) */}
      <div className="md:col-span-5 flex flex-col justify-between border-t md:border-t-0 md:border-l border-gray-200 dark:border-gray-700 pt-4 md:pt-0 md:pl-6">
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {othersNews.slice(0, 4).map((on, idx) => (
            <div key={on.id} className={`${idx === 0 ? "pb-3" : "py-3"}`}>
              <span className="text-xs font-semibold text-red-700 dark:text-red-500 block mb-1">
                {on.category || "প্রধান খবর"}
              </span>
              <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 leading-snug hover:text-red-700 cursor-pointer transition-colors">
                {on.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
