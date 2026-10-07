"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function SignInPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<string | null>(null);

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries()) as {
      email?: string;
      password?: string;
    };

    if (!data.email || !data.password) {
      toast.error("দয়া করে সব ফিল্ড পূরণ করুন");
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
        toast.error(apiError.message || "ইমেইল বা পাসওয়ার্ড ভুল হয়েছে");
        setLoading(false);
        return;
      }

      toast.success("সাইন ইন সফল হয়েছে!");
      router.push("/");
      router.refresh();
    } catch (err) {
      toast.error("একটি ত্রুটি ঘটেছে। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignIn = async (provider: "google" | "github") => {
    setSocialLoading(provider);
    try {
      await authClient.signIn.social({
        provider,
        callbackURL: "/",
      });
    } catch (err) {
      toast.error("সোশ্যাল সাইন ইন ব্যর্থ হয়েছে।");
      setSocialLoading(null);
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

        {/* Social Auth Buttons */}
        <div className="space-y-3 mb-6">
          {/* Google Sign In Button */}
          <button
            type="button"
            onClick={() => handleSocialSignIn("google")}
            disabled={!!socialLoading || loading}
            className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-2.5 px-4 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition duration-150 disabled:opacity-50"
          >
            {socialLoading === "google" ? (
              <span className="loading loading-spinner loading-xs"></span>
            ) : (
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
            )}
            <span>Google দিয়ে সাইন ইন করুন</span>
          </button>

          {/* GitHub Sign In Button */}
          <button
            type="button"
            onClick={() => handleSocialSignIn("github")}
            disabled={!!socialLoading || loading}
            className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-2.5 px-4 text-sm font-medium text-gray-800 bg-white hover:bg-gray-50 transition duration-150 disabled:opacity-50"
          >
            {socialLoading === "github" ? (
              <span className="loading loading-spinner loading-xs"></span>
            ) : (
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            )}
            <span>GitHub দিয়ে সাইন ইন করুন</span>
          </button>
        </div>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-gray-400 font-medium">অথবা ইমেইল দিয়ে</span>
          </div>
        </div>

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
            disabled={loading || !!socialLoading}
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