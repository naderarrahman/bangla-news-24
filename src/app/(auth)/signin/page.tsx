"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignInPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries()) as {
      email?: string;
      password?: string;
    };

    if (!data.email || !data.password) {
      setError("দয়া করে সব ফিল্ড পূরণ করুন");
      return;
    }

    setLoading(true);

    try {
      const { error: apiError } = await authClient.signIn.email({
        email: data.email,
        password: data.password,
        rememberMe: true,
        callbackURL: "/",
      });

      if (apiError) {
        setError(apiError.message || "ইমেইল বা পাসওয়ার্ড ভুল হয়েছে");
        setLoading(false);
        return;
      }

      router.push("/");
      router.refresh();
    } catch (err) {
      setError("একটি ত্রুটি ঘটেছে। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-xl p-8">
        
        <div className="text-center mb-6">
          <h2 className="text-2xl font-extrabold text-[#990000] tracking-tight">
            সাইন ইন
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            আপনার অ্যাকাউন্টে প্রবেশ করুন
          </p>
        </div>

        {error && (
          <div className="alert alert-error text-xs py-2 px-3 mb-4 text-white bg-red-600 rounded-lg">
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSignIn} className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold text-gray-700">ইমেইল</span>
            </label>
            <input 
              type="email" 
              name="email"
              required
              placeholder="example@gmail.com" 
              className="input input-bordered w-full bg-white text-gray-900 placeholder:text-gray-400 focus:border-[#990000] focus:outline-none text-sm"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold text-gray-700">পাসওয়ার্ড</span>
            </label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                name="password"
                required
                placeholder="••••••••" 
                className="input input-bordered w-full bg-white text-gray-900 placeholder:text-gray-400 focus:border-[#990000] focus:outline-none text-sm pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none text-sm"
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="btn bg-[#990000] hover:bg-[#800000] text-white w-full mt-2 border-none disabled:bg-gray-400"
          >
            {loading ? "অপেক্ষা করুন..." : "সাইন ইন করুন"}
          </button>
        </form>

        <p className="text-center text-xs text-gray-600 mt-6">
          অ্যাকাউন্ট নেই?{" "}
          <Link href="/signup" className="text-[#990000] font-semibold hover:underline">
            সাইন আপ করুন
          </Link>
        </p>

      </div>
    </div>
  );
}