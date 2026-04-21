"use client";
// PATH: src/app/login/page.tsx

import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { loginUser } from "@/src/lib/api";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaFacebookF, FaGooglePlusG, FaLinkedinIn } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function LoginPage() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  // ✅ Already logged in hai toh redirect karo
  useEffect(() => {
    // Admin session check
    if (session?.user) {
      router.push("/admin");
      return;
    }
    // Normal user token check
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/user");
    }
  }, [session, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // ✅ STEP 1: Admin check — NextAuth → Django admin panel
    const adminRes = await signIn("credentials", {
      email: identifier,
      password: password,
      redirect: false,
    });

    if (adminRes?.ok && !adminRes?.error) {
      alert("Welcome Admin! 🕶️");
      router.push("/admin");
      setLoading(false);
      return;
    }

    // ✅ STEP 2: Normal user — JWT via api.ts
    try {
      const { access, refresh } = await loginUser({ username: identifier, password });
      localStorage.setItem("token", access);
      localStorage.setItem("refresh_token", refresh);
      alert("Login Successful! 🔥");
      router.push("/user");
      setLoading(false);
      return;
    } catch (err) {
      // invalid credentials
    }

    alert("Invalid credentials! ✋");
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f6f5f7] p-4 relative z-20 font-poppins">
      <div className="relative mb-[-15px] z-30">
        <div className="w-28 h-28 bg-[#ffd3b6] rounded-full border-4 border-black relative overflow-hidden shadow-lg">
          <div className="absolute top-0 w-full h-7 bg-[#2d2d2d]" />
          <div className="flex justify-center gap-5 mt-10">
            <AnimatePresence mode="wait">
              {isPasswordFocused ? (
                <motion.div key="closed" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex justify-center gap-5 w-full">
                  <div className="w-5 h-1 bg-black rounded-full mt-2" />
                  <div className="w-5 h-1 bg-black rounded-full mt-2" />
                </motion.div>
              ) : (
                <motion.div key="open" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex justify-center gap-5 w-full">
                  <div className="w-4 h-4 bg-black rounded-full" />
                  <div className="w-4 h-4 bg-black rounded-full" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className="w-6 h-3 border-b-2 border-black rounded-full mx-auto mt-3" />
        </div>
        <motion.div
          initial={{ y: 10 }}
          animate={{ y: isPasswordFocused ? -70 : 1 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="absolute inset-x-0 flex justify-between px-2 pointer-events-none"
        >
          <div className="w-8 h-10 bg-[#ffd3b6] border-2 border-black rounded-t-full" />
          <div className="w-8 h-10 bg-[#ffd3b6] border-2 border-black rounded-t-full" />
        </motion.div>
      </div>

      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 pt-12 text-center border-t-4 border-[#E84C4C] relative z-20">
        <h1 className="text-3xl font-black italic uppercase text-[#E84C4C] mb-6 tracking-tighter">Log In</h1>
        <div className="flex justify-center gap-3 mb-6">
          <SocialIcon icon={<FaFacebookF />} />
          <SocialIcon icon={<FaGooglePlusG />} />
          <SocialIcon icon={<FaLinkedinIn />} />
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="EMAIL OR USERNAME"
            className="bg-[#eee] p-3 rounded-lg outline-none focus:ring-2 focus:ring-[#E84C4C] font-bold text-sm"
            onChange={(e) => setIdentifier(e.target.value)}
            onFocus={() => setIsPasswordFocused(false)}
            required
          />
          <input
            type="password"
            placeholder="PASSWORD"
            className="bg-[#eee] p-3 rounded-lg outline-none focus:ring-2 focus:ring-[#E84C4C] font-bold text-sm"
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setIsPasswordFocused(true)}
            onBlur={() => setIsPasswordFocused(false)}
            required
          />
          <button
            disabled={loading}
            className="bg-[#E84C4C] text-white p-3 rounded-full font-black uppercase tracking-widest hover:scale-105 transition-all active:scale-95 disabled:opacity-50 mt-2 shadow-lg shadow-[#e84c4c44]"
          >
            {loading ? "Checking..." : "Sign In"}
          </button>
        </form>
        <p className="mt-8 text-sm text-gray-500 font-medium">
          Naye ho?{" "}
          <Link href="/signup" className="text-[#E84C4C] font-black underline decoration-2 underline-offset-4">Signup Karo</Link>
        </p>
      </div>
    </div>
  );
}

const SocialIcon = ({ icon }: { icon: React.ReactNode }) => (
  <div className="inline-flex items-center justify-center w-10 h-10 border border-gray-200 rounded-full text-gray-600 hover:bg-[#E84C4C] hover:text-white cursor-pointer transition-all shadow-sm">
    {icon}
  </div>
);