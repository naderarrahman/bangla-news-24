
import NavLink from "./NavLink";
export interface Category {
  slug: string;
  title: string;
  topicId: string;
  url: string;
  scrapable: boolean;
}


export default async function NavLinks() {
  const res = await fetch("https://news-api-v2.vercel.app/api/categories", {
    next: { revalidate: 3600 },
  });

  const data = await res.json();
  const nav: Category[] = data.data || [];
  const filteredNav = nav.filter((n) => n.scrapable);

  return (
    <nav className="w-full border-t border-b border-gray-200 bg-white dark:bg-gray-900 dark:border-gray-800">
      <div className="container mx-auto px-4">
        <ul className="flex items-center justify-start md:justify-center gap-5 md:gap-8 py-2.5 overflow-x-auto whitespace-nowrap scrollbar-none text-sm font-medium">
          
          <li>
            <NavLink href="/">হোম</NavLink>
          </li>

          {filteredNav.map((n) => (
            <li key={n.slug}>
              <NavLink href={`/category/${n.slug}`}>
                {n.title}
              </NavLink>
            </li>
          ))}

        </ul>
      </div>
    </nav>
  );
}
