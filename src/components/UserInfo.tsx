"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image"; // <--- Import Next.js Image
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function UserInfo() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/");
    router.refresh();
  };

  if (isPending) {
    return (
      <div className="flex items-center gap-2">
        <div className="w-9 h-9 rounded-full bg-gray-200 animate-pulse"></div>
        <div className="hidden sm:block w-20 h-4 bg-gray-200 rounded animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      {user ? (
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar border border-gray-200 hover:border-[#990000] transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-[#990000] text-white flex items-center justify-center font-bold text-base shadow-sm overflow-hidden relative">
              {user.image ? (
                <Image
                  src={user.image}
                  alt={user.name || "User"}
                  fill
                  className="object-cover rounded-full"
                  unoptimized // External avatar image hole unoptimized attribute help kore
                />
              ) : (
                <span>{user.name ? user.name.charAt(0).toUpperCase() : "U"}</span>
              )}
            </div>
          </div>

          <ul
            tabIndex={0}
            className="dropdown-content menu menu-sm z-[1] mt-3 p-3 shadow-xl bg-white rounded-2xl w-60 border border-gray-100"
          >
            <li className="px-2 py-1 mb-2 border-b border-gray-100">
              <p className="font-bold text-gray-800 text-sm truncate p-0">
                {user.name}
              </p>
              <p className="text-xs text-gray-500 truncate p-0 mt-0.5">
                {user.email}
              </p>
            </li>

            <li>
              <button
                onClick={handleSignOut}
                className="text-red-600 hover:bg-red-50 hover:text-red-700 font-medium rounded-lg py-2 transition-colors mt-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.8}
                  stroke="currentColor"
                  className="w-4 h-4 mr-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                  />
                </svg>
                সাইন আউট
              </button>
            </li>
          </ul>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <Link
            href="/signin"
            className="text-gray-700 hover:text-[#990000] hover:bg-gray-100 font-semibold text-sm px-3.5 py-1.5 rounded-lg transition-colors"
          >
            সাইন ইন
          </Link>

          <Link
            href="/signup"
            className="bg-[#990000] hover:bg-[#800000] text-white font-semibold text-sm px-4 py-1.5 rounded-lg transition-all shadow-sm active:scale-95"
          >
            সাইন আপ
          </Link>
        </div>
      )}
    </div>
  );
}