// PATH: src/app/admin/page.tsx
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import AdminForm from "@/components/AdminForm";
import { authOptions } from "@/src/app/api/auth/[...nextauth]/route";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  // ✅ Sirf check karo session hai ya nahi — koi hardcoded email nahi
  // Jo bhi Django admin credentials se login hoga woh aa jayega
  if (!session || !session.user?.email) {
    notFound();
  }

  return (
    <div className="min-h-screen w-full bg-white relative mt-0 relative z-40">
      <div>
        <AdminForm />
      </div>
      <div className="flex items-center gap-2 p-4">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        <p className="text-[10px] font-mono uppercase tracking-widest">
          Authenticated as: {session.user?.email}
        </p>
      </div>
    </div>
  );
}