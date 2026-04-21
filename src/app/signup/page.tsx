"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/src/lib/api";
import Link from "next/link";
import { FaFacebookF, FaGooglePlusG, FaLinkedinIn } from "react-icons/fa";

// ---------- Mascot ----------
function Mascot({ isHiding }: { isHiding: boolean }) {
  return (
    <div className="flex flex-col items-center select-none mb-2">
      <div
        style={{
          transition: "transform 0.4s cubic-bezier(.34,1.56,.64,1)",
          transform: isHiding ? "translateY(6px)" : "translateY(0px)",
        }}
      >
        <svg
          width="90"
          height="90"
          viewBox="0 0 90 90"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Body / face */}
          <circle cx="45" cy="50" r="32" fill="#FDDCB5" />

          {/* Ears */}
          <ellipse cx="16" cy="48" rx="7" ry="9" fill="#FDDCB5" />
          <ellipse cx="74" cy="48" rx="7" ry="9" fill="#FDDCB5" />
          <ellipse cx="16" cy="48" rx="4" ry="5.5" fill="#F4A9A8" />
          <ellipse cx="74" cy="48" rx="4" ry="5.5" fill="#F4A9A8" />

          {/* Hair */}
          <ellipse cx="45" cy="22" rx="28" ry="14" fill="#5C3317" />
          <ellipse cx="45" cy="26" rx="22" ry="10" fill="#FDDCB5" />

          {/* Eyebrows */}
          <path d="M30 37 Q35 33 40 37" stroke="#5C3317" strokeWidth="2" strokeLinecap="round" fill="none" />
          <path d="M50 37 Q55 33 60 37" stroke="#5C3317" strokeWidth="2" strokeLinecap="round" fill="none" />

          {/* Eyes */}
          {isHiding ? (
            <>
              <path d="M28 46 Q35 52 42 46" stroke="#5C3317" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              <path d="M48 46 Q55 52 62 46" stroke="#5C3317" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              <ellipse cx="30" cy="55" rx="7" ry="4" fill="#F4A9A8" opacity="0.6" />
              <ellipse cx="60" cy="55" rx="7" ry="4" fill="#F4A9A8" opacity="0.6" />
            </>
          ) : (
            <>
              <circle cx="35" cy="46" r="7" fill="white" />
              <circle cx="55" cy="46" r="7" fill="white" />
              <circle cx="36" cy="47" r="4" fill="#5C3317" />
              <circle cx="56" cy="47" r="4" fill="#5C3317" />
              <circle cx="38" cy="45" r="1.5" fill="white" />
              <circle cx="58" cy="45" r="1.5" fill="white" />
            </>
          )}

          {/* Nose */}
          <ellipse cx="45" cy="56" rx="3" ry="2" fill="#E8A87C" />

          {/* Smile */}
          {isHiding ? (
            <path d="M36 65 Q45 60 54 65" stroke="#C0725A" strokeWidth="2" strokeLinecap="round" fill="none" />
          ) : (
            <path d="M36 64 Q45 72 54 64" stroke="#C0725A" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          )}

          {/* Hands over eyes when hiding */}
          {isHiding && (
            <>
              <ellipse cx="26" cy="46" rx="11" ry="8" fill="#FDDCB5" opacity="0.95" />
              <ellipse cx="18" cy="42" rx="4" ry="3" fill="#FDDCB5" />
              <ellipse cx="22" cy="39" rx="4" ry="3" fill="#FDDCB5" />
              <ellipse cx="27" cy="38" rx="4" ry="3" fill="#FDDCB5" />
              <ellipse cx="32" cy="39" rx="4" ry="3" fill="#FDDCB5" />

              <ellipse cx="64" cy="46" rx="11" ry="8" fill="#FDDCB5" opacity="0.95" />
              <ellipse cx="72" cy="42" rx="4" ry="3" fill="#FDDCB5" />
              <ellipse cx="68" cy="39" rx="4" ry="3" fill="#FDDCB5" />
              <ellipse cx="63" cy="38" rx="4" ry="3" fill="#FDDCB5" />
              <ellipse cx="58" cy="39" rx="4" ry="3" fill="#FDDCB5" />
            </>
          )}
        </svg>
      </div>

      {/* Speech bubble */}
      <div className="relative mt-1 px-3 py-1 bg-white border-2 border-[#E84C4C] rounded-full text-xs font-bold text-[#E84C4C] shadow-sm">
        {isHiding ? "🙈 I won't peek!" : "👋 Welcome! Sign up below!"}
        <span
          className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0"
          style={{
            borderLeft: "6px solid transparent",
            borderRight: "6px solid transparent",
            borderBottom: "8px solid #E84C4C",
          }}
        />
      </div>
    </div>
  );
}

// ---------- Main Page ----------
export default function SignupPage() {
  const [data, setData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await registerUser(data);
      alert("Account ban gaya ✅ Login karo");
      router.push("/login");
    } catch (error: any) {
      alert(error.message || "Signup Failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f6f5f7] p-4 font-poppins relative z-20">

      {/* Card Container */}
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-gray-100">

        <form onSubmit={handleSignup} className="flex flex-col items-center justify-center p-10 text-center">

          {/* 🎉 Mascot */}
          <Mascot isHiding={isPasswordFocused} />

          <h2 className="text-3xl font-black uppercase italic mb-2 text-[#E84C4C]">
            Create Account
          </h2>

          {/* Social Icons */}
          <div className="flex my-4 gap-3">
            <SocialIcon icon={<FaFacebookF />} />
            <SocialIcon icon={<FaGooglePlusG />} />
            <SocialIcon icon={<FaLinkedinIn />} />
          </div>

          <span className="text-xs text-gray-500 mb-4 font-bold uppercase tracking-tighter">
            or use your email for registration
          </span>

          <div className="flex flex-col gap-3 w-full">
            <input
              type="text"
              placeholder="NAME"
              required
              className="bg-[#eee] p-3 rounded-lg outline-none focus:ring-2 focus:ring-[#E84C4C] font-bold uppercase text-sm w-full"
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />

            <input
              type="email"
              placeholder="EMAIL"
              required
              className="bg-[#eee] p-3 rounded-lg outline-none focus:ring-2 focus:ring-[#E84C4C] font-bold uppercase text-sm w-full"
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />

            <input
              type="password"
              placeholder="PASSWORD"
              required
              className="bg-[#eee] p-3 rounded-lg outline-none focus:ring-2 focus:ring-[#E84C4C] font-bold uppercase text-sm w-full"
              onFocus={() => setIsPasswordFocused(true)}
              onBlur={() => setIsPasswordFocused(false)}
              onChange={(e) => setData({ ...data, password: e.target.value })}
            />

            <button
              disabled={loading}
              className="bg-[#E84C4C] text-white p-3 rounded-full font-black uppercase tracking-widest hover:scale-105 transition-all active:scale-95 disabled:opacity-50 mt-4 shadow-md"
            >
              {loading ? "JOINING..." : "Join the Club"}
            </button>
          </div>

          <p className="mt-8 text-sm text-gray-500 font-medium">
            Already have an account?{" "}
            <Link href="/login" className="text-[#E84C4C] font-extrabold underline decoration-2 underline-offset-4">
              Sign In
            </Link>
          </p>

        </form>
      </div>
    </div>
  );
}

const SocialIcon = ({ icon }: { icon: React.ReactNode }) => (
  <div className="inline-flex items-center justify-center w-10 h-10 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-100 cursor-pointer transition-colors shadow-sm">
    {icon}
  </div>
);