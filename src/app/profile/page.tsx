'use client'

import { authClient } from "@/lib/auth-client"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"
import toast from "react-hot-toast"

export default function ProfilePage() {
  const router = useRouter()
  const { data: session, isPending, error } = authClient.useSession()
  const [showEdit, setShowEdit] = useState(false)
  const [loading, setLoading] = useState(false)

  if (isPending) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center">
        <div className="flex items-center gap-3 text-[#990000]">
          <span className="loading loading-spinner loading-md"></span>
          <span className="font-semibold text-sm">প্রোফাইল লোড হচ্ছে...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center px-4">
        <div className="alert alert-error max-w-md bg-red-50 text-red-700 border border-red-200 rounded-xl">
          <span>ত্রুটি: {error.message}</span>
        </div>
      </div>
    )
  }

  const user = session?.user

  // Handle Name Update
  const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const nameVal = (formData.get("name") as string)?.trim()

    if (!nameVal) {
      toast.error("দয়া করে আপনার নাম প্রদান করুন")
      setLoading(false)
      return
    }

    try {
      const { error: updateError } = await authClient.updateUser({
        name: nameVal,
      })

      if (updateError) {
        toast.error(updateError.message || "প্রোফাইল আপডেট করতে সমস্যা হয়েছে")
        setLoading(false)
        return
      }

      toast.success("প্রোফাইল সফলভাবে আপডেট করা হয়েছে!")
      setShowEdit(false)
      router.refresh()
    } catch {
      toast.error("একটি ত্রুটি ঘটেছে। আবার চেষ্টা করুন।")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-[#990000] p-6 text-white text-center relative">
          <div className="w-20 h-20 rounded-full bg-white text-[#990000] mx-auto flex items-center justify-center font-bold text-3xl shadow-md border-4 border-white overflow-hidden relative">
            {user?.image ? (
              <Image
                src={user.image}
                alt={user.name || "User"}
                fill
                className="object-cover"
                unoptimized
              />
            ) : (
              <span>{user?.name ? user.name.charAt(0).toUpperCase() : "G"}</span>
            )}
          </div>
          <h2 className="text-xl font-bold mt-3 tracking-wide">
            {user?.name || "গেস্ট ইউজার"}
          </h2>
          <p className="text-xs text-red-100">
            {user?.email || "কোনো ইমেইল যুক্ত নেই"}
          </p>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-100">
              <span className="text-[11px] text-gray-400 font-medium block">ইউজারের নাম</span>
              <span className="font-semibold text-gray-800 text-sm mt-0.5 block">
                {user?.name || "N/A"}
              </span>
            </div>

            <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-100">
              <span className="text-[11px] text-gray-400 font-medium block">ইমেইল এড্রেস</span>
              <span className="font-semibold text-gray-800 text-sm mt-0.5 truncate block">
                {user?.email || "N/A"}
              </span>
            </div>

            <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-100">
              <span className="text-[11px] text-gray-400 font-medium block">ইমেইল ভেরিফিকেশন</span>
              {user?.emailVerified ? (
                <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 text-xs font-semibold px-2 py-0.5 rounded-full border border-green-200 mt-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                  Verified
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 text-xs font-semibold px-2 py-0.5 rounded-full border border-amber-200 mt-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                  Unverified
                </span>
              )}
            </div>

            <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-100">
              <span className="text-[11px] text-gray-400 font-medium block">লগইন টাইপ</span>
              <span className="font-semibold text-gray-800 text-sm mt-0.5 block">
                {user ? (user.image ? "Social Account" : "Email & Password") : "Not Authenticated"}
              </span>
            </div>
          </div>

          <div className="p-4 bg-red-50/50 rounded-xl border border-red-100 text-xs text-gray-600 space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-500">ইউজার আইডি (ID):</span>
              <span className="font-mono text-[11px] text-gray-700 bg-white px-2 py-0.5 rounded border border-gray-200 truncate max-w-[200px]">
                {user?.id || "N/A"}
              </span>
            </div>
            <div className="flex justify-between items-center pt-1 border-t border-red-100/60">
              <span className="font-medium text-gray-500">অ্যাকাউন্ট তৈরির সময়:</span>
              <span className="font-medium text-gray-700">
                {user?.createdAt ? new Date(user.createdAt).toLocaleDateString("bn-BD", {
                  year: "numeric",
                  month: "long",
                  day: "numeric"
                }) : "N/A"}
              </span>
            </div>
          </div>

          {user && (
            <>
              <button
                onClick={() => setShowEdit(!showEdit)}
                className="w-full flex items-center justify-center gap-2 border border-gray-300 hover:border-[#990000] text-gray-700 hover:text-[#990000] font-semibold text-sm py-2.5 px-4 rounded-xl transition-all shadow-sm active:scale-98"
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
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                  />
                </svg>
                {showEdit ? "সম্পাদনা বন্ধ করুন" : "নাম পরিবর্তন করুন"}
              </button>

              {showEdit && (
                <form onSubmit={handleUpdateProfile} className="space-y-4 pt-4 border-t border-gray-100">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold text-gray-700 text-xs">নতুন নাম</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      defaultValue={user.name || ""}
                      placeholder="আপনার নাম লিখুন"
                      required
                      className="input input-bordered w-full bg-white text-gray-900 placeholder:text-gray-400 focus:border-[#990000] focus:outline-none text-sm"
                    />
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn bg-[#990000] hover:bg-[#800000] text-white flex-1 border-none disabled:bg-gray-400 text-xs sm:text-sm"
                    >
                      {loading ? "আপডেট হচ্ছে..." : "সংরক্ষণ করুন"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowEdit(false)}
                      className="btn btn-ghost text-gray-600 hover:bg-gray-100 border border-gray-200 text-xs sm:text-sm"
                    >
                      বাতিল
                    </button>
                  </div>
                </form>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}