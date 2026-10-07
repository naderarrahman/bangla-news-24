"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function UserInfo() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const handleSignOut = async () => {
    try {
      await authClient.signOut();
      toast.success("সফলভাবে সাইন আউট হয়েছে!");
      router.push("/");
      router.refresh();
    } catch {
      toast.error("সাইন আউট করতে সমস্যা হয়েছে।");
    }
  };

  if (isPending) {
    return (
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gray-200 animate-pulse"></div>
        <div className="hidden sm:block w-20 h-4 bg-gray-200 rounded animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1.5 sm:gap-3">
      {user ? (
        <div className="dropdown dropdown-end relative">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar border border-gray-200 hover:border-[#990000] transition-colors p-0.5"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#990000] text-white flex items-center justify-center font-bold text-sm sm:text-base shadow-sm overflow-hidden relative">
              {user.image ? (
                <Image
                  src={user.image}
                  alt={user.name || "User"}
                  fill
                  className="object-cover rounded-full"
                  unoptimized
                />
              ) : (
                <span>{user.name ? user.name.charAt(0).toUpperCase() : "U"}</span>
              )}
            </div>
          </div>

          <ul
            tabIndex={0}
            className="dropdown-content menu menu-sm z-[50] mt-3 p-3 shadow-xl bg-white rounded-2xl w-60 sm:w-64 border border-gray-100 right-0"
          >
            {/* Profile Navigation Button */}
            <li className="mb-1">
              <Link
                href="/profile"
                className="flex items-center gap-2 py-2 px-3 hover:bg-gray-100 rounded-lg text-gray-700 font-medium transition-colors text-xs sm:text-sm"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.8}
                  stroke="currentColor"
                  className="w-4 h-4 text-[#990000]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                  />
                </svg>
                প্রোফাইল দেখুন
              </Link>
            </li>

            <li className="px-2 py-2 mb-2 border-y border-gray-100">
              <p className="font-bold text-gray-800 text-xs sm:text-sm truncate p-0">
                {user.name}
              </p>
              <p className="text-[11px] sm:text-xs text-gray-500 truncate p-0 mt-0.5">
                {user.email}
              </p>

              {/* Email Verification Status */}
              <div className="flex items-center gap-1.5 mt-2 p-0">
                <span className="text-[10px] sm:text-[11px] text-gray-500 font-medium">
                  Email Verified:
                </span>
                {user.emailVerified ? (
                  <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-green-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                    Yes
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-amber-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                    No
                  </span>
                )}
              </div>
            </li>

            <li>
              <button
                onClick={handleSignOut}
                className="text-red-600 hover:bg-red-50 hover:text-red-700 font-medium rounded-lg py-2 transition-colors text-xs sm:text-sm flex items-center gap-1.5"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.8}
                  stroke="currentColor"
                  className="w-4 h-4"
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
        <div className="flex items-center gap-1.5 sm:gap-2">
          <Link
            href="/signin"
            className="text-gray-700 hover:text-[#990000] hover:bg-gray-100 font-semibold text-xs sm:text-sm px-2.5 sm:px-3.5 py-1.5 rounded-lg transition-colors whitespace-nowrap"
          >
            সাইন ইন
          </Link>

          <Link
            href="/signup"
            className="bg-[#990000] hover:bg-[#800000] text-white font-semibold text-xs sm:text-sm px-3 sm:px-4 py-1.5 rounded-lg transition-all shadow-sm active:scale-95 whitespace-nowrap"
          >
            সাইন আপ
          </Link>
        </div>
      )}
    </div>
  );
}