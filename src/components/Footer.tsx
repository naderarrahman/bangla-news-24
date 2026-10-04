import Link from "next/link";
import { FaFacebook, FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const categories = [
    { name: "হোম", href: "/" },
    { name: "রাজনীতি", href: "/category/politics" },
    { name: "বিশ্ব", href: "/category/world" },
    { name: "অর্থনীতি", href: "/category/economy" },
    { name: "স্বাস্থ্য", href: "/category/health" },
    { name: "খেলা", href: "/category/sports" },
    { name: "প্রযুক্তি", href: "/category/technology" },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300 border-t-4 border-red-700">
      <div className="container mx-auto px-4 py-10 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <Link href="/" className="inline-block">
              <span className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                Bangla <span className="text-red-600">News 24</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed pr-4">
              সত্য ও বস্তুনিষ্ঠ সংবাদের বিশ্বস্ত ঠিকানা। দেশ-বিদেশের শীর্ষ সংবাদ, রাজনীতি, প্রযুক্তি ও খেলার খবর পেতে আমাদের সাথেই থাকুন।
            </p>
            
            {/* Social Links using react-icons */}
            <div className="pt-2">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-3">
                যোগাযোগ ও সোশাল মিডিয়া
              </span>
              <div className="flex items-center space-x-3">
                {/* Mail */}
                <a
                  href="mailto:naderarrahman@gmail.com"
                  title="Email Us"
                  className="p-2.5 bg-gray-800 hover:bg-red-700 text-gray-300 hover:text-white rounded-full transition-colors"
                >
                  <FaEnvelope className="w-4 h-4" />
                </a>

                {/* GitHub */}
                <a
                  href="https://github.com/naderarrahman"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="GitHub"
                  className="p-2.5 bg-gray-800 hover:bg-red-700 text-gray-300 hover:text-white rounded-full transition-colors"
                >
                  <FaGithub className="w-4 h-4" />
                </a>

                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/naderarrahman/"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="LinkedIn"
                  className="p-2.5 bg-gray-800 hover:bg-red-700 text-gray-300 hover:text-white rounded-full transition-colors"
                >
                  <FaLinkedin className="w-4 h-4" />
                </a>

                {/* Facebook */}
                <a
                  href="https://www.facebook.com/naderarrahman"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Facebook"
                  className="p-2.5 bg-gray-800 hover:bg-red-700 text-gray-300 hover:text-white rounded-full transition-colors"
                >
                  <FaFacebook className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Nav Categories */}
          <div className="md:col-span-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider border-l-2 border-red-700 pl-2 mb-4">
              ক্যাটাগরি
            </h3>
            <ul className="grid grid-cols-2 gap-2 text-sm">
              {categories.map((cat, idx) => (
                <li key={idx}>
                  <Link href={cat.href} className="hover:text-red-500 transition-colors">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Info */}
          <div className="md:col-span-3 space-y-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider border-l-2 border-red-700 pl-2 mb-4">
              তথ্য
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="hover:text-red-500 transition-colors">
                  আমাদের সম্পর্কে
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-red-500 transition-colors">
                  গোপনীয়তা নীতি
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-red-500 transition-colors">
                  বিজ্ঞাপন
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-gray-800 text-xs text-gray-500 flex flex-col md:flex-row justify-between items-center gap-2">
          <p>© {currentYear} Bangla News 24. সর্বস্বত্ব সংরক্ষিত।</p>
          <p>
            Developed by{" "}
            <a
              href="https://github.com/naderarrahman"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-red-500 transition-colors underline"
            >
              Nader Ar Rahman
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}