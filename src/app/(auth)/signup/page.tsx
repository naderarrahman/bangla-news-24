"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function SignUpPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [fieldErrors, setFieldErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const validateField = (name: string, value: string) => {
    let errorMsg = "";

    if (name === "name") {
      if (!value.trim()) {
        errorMsg = "আপনার নাম লিখুন";
      }
    }

    if (name === "email") {
      const trimmedEmail = value.trim();
      if (!trimmedEmail) {
        errorMsg = "ইমেইল এড্রেস প্রদান করুন";
      } else if (!emailRegex.test(trimmedEmail)) {
        errorMsg = "সঠিক ইমেইল ফরম্যাট দিন (যেমন: example@gmail.com)";
      } else if (
        trimmedEmail.includes("gmal.com") ||
        trimmedEmail.includes("gmai.com") ||
        trimmedEmail.includes("gamil.com")
      ) {
        errorMsg = "ইমেইল বানানে ভুল হতে পারে! আপনি কি '@gmail.com' বোঝাতে চেয়েছেন?";
      }
    }

    if (name === "password") {
      if (!value) {
        errorMsg = "পাসওয়ার্ড প্রদান করুন";
      } else if (value.length < 8) {
        errorMsg = "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে";
      }
    }

    setFieldErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const nameVal = formData.name.trim();
    const emailVal = formData.email.trim();
    const passwordVal = formData.password;

    if (!nameVal) {
      setFieldErrors((prev) => ({ ...prev, name: "আপনার নাম লিখুন" }));
      toast.error("আপনার নাম লিখুন");
      return;
    }

    if (!emailVal || !emailRegex.test(emailVal)) {
      setFieldErrors((prev) => ({
        ...prev,
        email: "সঠিক ইমেইল ফরম্যাট দিন (যেমন: example@gmail.com)",
      }));
      toast.error("সঠিক ইমেইল ফরম্যাট দিন");
      return;
    }

    if (passwordVal.length < 8) {
      setFieldErrors((prev) => ({
        ...prev,
        password: "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে",
      }));
      toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
      return;
    }

    setLoading(true);

    try {
      const { error: apiError } = await authClient.signUp.email({
        name: nameVal,
        email: emailVal,
        password: passwordVal,
        callbackURL: "/",
      });

      if (apiError) {
        toast.error(apiError.message || "সাইন আপ করতে ব্যর্থ হয়েছে। আবার চেষ্টা করুন।");
        setLoading(false);
        return;
      }

      toast.success("সাইন আপ সফল হয়েছে!");
      router.push("/");
      router.refresh();
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("একটি অপ্রত্যাশিত ত্রুটি ঘটেছে");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch {
      toast.error("Google এর মাধ্যমে সাইন আপ করতে ব্যর্থ হয়েছে");
    }
  };

  const handleGithubSignUp = async () => {
    try {
      await authClient.signIn.social({
        provider: "github",
        callbackURL: "/",
      });
    } catch {
      toast.error("GitHub এর মাধ্যমে সাইন আপ করতে ব্যর্থ হয়েছে");
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-xl p-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-extrabold text-[#990000] tracking-tight">
            সাইন আপ
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            বাংলা নিউজ ২৪ এ আপনার অ্যাকাউন্ট তৈরি করুন
          </p>
        </div>

        {/* Social Auth Buttons */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button
            type="button"
            onClick={handleGoogleSignUp}
            className="flex items-center justify-center gap-2 border border-gray-300 hover:border-gray-400 bg-white hover:bg-gray-50 text-gray-700 font-medium text-xs sm:text-sm py-2.5 px-3 rounded-xl transition-all shadow-sm active:scale-95"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
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
            <span>Google</span>
          </button>

          <button
            type="button"
            onClick={handleGithubSignUp}
            className="flex items-center justify-center gap-2 border border-gray-300 hover:border-gray-400 bg-[#24292e] hover:bg-[#1b1f23] text-white font-medium text-xs sm:text-sm py-2.5 px-3 rounded-xl transition-all shadow-sm active:scale-95"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            <span>GitHub</span>
          </button>
        </div>

        {/* Divider */}
        <div className="relative flex items-center justify-center my-4">
          <div className="border-t border-gray-200 w-full"></div>
          <span className="bg-white px-3 text-xs text-gray-400 absolute">অথবা</span>
        </div>

        <form onSubmit={handleSignUp} className="space-y-4">
          {/* Name Field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold text-gray-700">নাম</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="আপনার পুরো নাম"
              className={`input input-bordered w-full bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none text-sm ${
                fieldErrors.name
                  ? "border-red-500 focus:border-red-500"
                  : "focus:border-[#990000]"
              }`}
            />
            {fieldErrors.name && (
              <p className="text-[11px] text-red-500 mt-1">{fieldErrors.name}</p>
            )}
          </div>

          {/* Email Field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold text-gray-700">ইমেইল</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="example@gmail.com"
              className={`input input-bordered w-full bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none text-sm ${
                fieldErrors.email
                  ? "border-red-500 focus:border-red-500"
                  : "focus:border-[#990000]"
              }`}
            />
            {fieldErrors.email ? (
              <p className="text-[11px] text-red-500 mt-1">{fieldErrors.email}</p>
            ) : (
              <p className="text-[10px] text-gray-400 mt-1">
                যেমন: example@gmail.com
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold text-gray-700">পাসওয়ার্ড</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={8}
                placeholder="কমপক্ষে ৮ অক্ষরের পাসওয়ার্ড"
                className={`input input-bordered w-full bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none text-sm pr-10 ${
                  fieldErrors.password
                    ? "border-red-500 focus:border-red-500"
                    : "focus:border-[#990000]"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none text-sm"
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                )}
              </button>
            </div>
            {fieldErrors.password ? (
              <p className="text-[11px] text-red-500 mt-1">{fieldErrors.password}</p>
            ) : (
              <p className="text-[10px] text-gray-500 mt-1">
                পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn bg-[#990000] hover:bg-[#800000] text-white w-full mt-2 border-none disabled:bg-gray-400"
          >
            {loading ? "অপেক্ষা করুন..." : "সাইন আপ করুন"}
          </button>
        </form>

        <p className="text-center text-xs text-gray-600 mt-6">
          ইতিমধ্যে অ্যাকাউন্ট আছে?{" "}
          <Link href="/signin" className="text-[#990000] font-semibold hover:underline">
            সাইন ইন করুন
          </Link>
        </p>
      </div>
    </div>
  );
}