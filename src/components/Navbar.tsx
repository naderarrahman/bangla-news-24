import Image from "next/image";
import NavLinks from "./NavLinks/NavLinks";
import UserInfo from "./UserInfo";

export default function Navbar() {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <>
    <header className="w-full border-b border-gray-200 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        
        <div className="flex items-center gap-3">
          <Image 
            src="/logo.webp" 
            alt="Bangla News 24 Logo" 
            width={40} 
            height={40} 
            className="rounded-lg object-contain"
          />

          <div className="flex flex-col">
            <h1 className="text-xl md:text-2xl font-bold text-red-800 tracking-tight leading-tight">
              Bangla News 24
            </h1>
            <span className="text-xs text-gray-500 font-medium">
              {date}
            </span>
          </div>
        </div>

        <UserInfo />

      </div>
    </header>
    <NavLinks />
    </>
  );
}