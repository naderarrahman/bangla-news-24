import Image from "next/image";

interface BodyText {
  type: "text";
  text: string;
}

interface BodySubheading {
  type: "subheading";
  text: string;
}

interface BodyImage {
  type: "image";
  url: string;
  width?: number;
  height?: number;
  caption?: string | null;
  altText?: string | null;
}

type BodyBlock = BodyText | BodySubheading | BodyImage;

interface Topic {
  id: string;
  name: string;
}

interface NewsArticle {
  id: string;
  title: string;
  description?: unknown;
  firstPublished?: string;
  category?: string;
  tags?: string[];
  topics?: Topic[];
  body?: BodyBlock[];
}

interface PageProps {
  params: Promise<{
    newsId: string;
  }>;
}

function extractDescription(desc: unknown): string | null {
  if (typeof desc === "string") return desc;

  if (typeof desc === "object" && desc !== null) {
    try {
      const blocks = (desc as { blocks?: Array<{ model?: { blocks?: Array<{ model?: { text?: string } }> } }> }).blocks;
      const text = blocks?.[0]?.model?.blocks?.[0]?.model?.text;
      if (text) return text;
    } catch {
      return null;
    }
  }
  return null;
}

export default async function NewsDetailedPage({ params }: PageProps) {
  const { newsId } = await params;

  const res = await fetch(
    `https://news-api-v2.vercel.app/api/article/${newsId}`,
    {
      next: { revalidate: 3600 },
    }
  );

  const responseData = await res.json();
  const newsDetailed: NewsArticle = responseData.data || responseData;

  const leadDescription = extractDescription(newsDetailed.description);

  const formattedDate = newsDetailed.firstPublished
    ? new Date(newsDetailed.firstPublished).toLocaleDateString("bn-BD", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;

  const tagList =
    newsDetailed.tags ||
    newsDetailed.topics?.map((topic) => topic.name) ||
    [];

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <main className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-6 md:p-10 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
          
          {newsDetailed.category && (
            <span className="text-xs font-semibold text-red-700 dark:text-red-500 uppercase tracking-wide block mb-2">
              {newsDetailed.category}
            </span>
          )}

          <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-gray-900 dark:text-white leading-tight mb-4">
            {newsDetailed.title}
          </h1>

          {leadDescription && (
            <p className="text-base md:text-lg font-medium text-gray-700 dark:text-gray-300 leading-relaxed mb-4 border-l-4 border-red-700 pl-4 py-1 bg-gray-50 dark:bg-gray-700/50 rounded-r">
              {leadDescription}
            </p>
          )}

          {formattedDate && (
            <div className="text-xs text-gray-500 dark:text-gray-400 border-t border-b border-gray-100 dark:border-gray-700 py-2 mb-6">
              <span>{formattedDate}</span>
            </div>
          )}

          <div className="space-y-6 text-gray-800 dark:text-gray-200 text-base md:text-lg leading-relaxed">
            {newsDetailed.body?.map((block, index) => {
              
              if (block.type === "subheading") {
                return (
                  <h2
                    key={index}
                    className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-3"
                  >
                    {block.text}
                  </h2>
                );
              }

              if (block.type === "image" && block.url) {
                return (
                  <figure key={index} className="my-6">
                    <div className="relative w-full h-[280px] sm:h-[400px] md:h-[480px] overflow-hidden rounded bg-gray-100">
                      <Image
                        src={block.url}
                        alt={block.altText || block.caption || newsDetailed.title}
                        fill
                        sizes="(max-width: 896px) 100vw, 896px"
                        className="object-cover"
                      />
                    </div>
                    {block.caption && (
                      <figcaption className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-2 text-left bg-gray-50 dark:bg-gray-700/30 p-2 border-l-2 border-gray-300 dark:border-gray-600">
                        {block.caption}
                      </figcaption>
                    )}
                  </figure>
                );
              }

              if (block.type === "text") {
                return (
                  <p key={index} className="leading-relaxed text-justify whitespace-pre-line">
                    {block.text}
                  </p>
                );
              }

              return null;
            })}
          </div>

          {tagList.length > 0 && (
            <div className="mt-10 pt-6 border-t border-gray-100 dark:border-gray-700">
              <div className="flex flex-wrap gap-2">
                {tagList.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs md:text-sm font-medium rounded-full cursor-default select-none"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}