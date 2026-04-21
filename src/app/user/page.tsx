"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function UserPage() {
  const [user, setUser] = useState<any>(null);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      setUser({ name: "Authenticated User" });
      // ✅ Cart items local storage se uthao
      const savedCart = JSON.parse(localStorage.getItem("userCart") || "[]");
      setCartItems(savedCart);
    }
  }, [router]);

  const removeFromCart = (id: number) => {
    const updated = cartItems.filter(item => item.id !== id);
    setCartItems(updated);
    localStorage.setItem("userCart", JSON.stringify(updated));
  };

  if (!user) return <p className="p-10 font-bold uppercase italic">Loading Profile...</p>;

  return (
    <div className="min-h-screen bg-white p-6 md:p-12 relative z-20 mt-16">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="border-4 border-black p-8 shadow-[15px_15px_0px_0px_rgba(0,0,0,1)] bg-white mb-12">
          <h1 className="text-5xl font-black uppercase italic mb-2">User Dashboard</h1>
          <p className="text-xl font-bold">Welcome back to the gallery. 🕶️</p>
        </div>

        {/* --- CART SECTION --- */}
        <div className="mt-12">
          <h2 className="text-3xl font-black uppercase mb-8 border-b-4 border-black inline-block">
            Your Selection ({cartItems.length})
          </h2>

          {cartItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {cartItems.map((item) => (
                <div key={item.id} className="border-2 border-black p-4 flex gap-6 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all">
                  <img 
                    src={item.image_url || `https://nanopixel.vercel.app${item.image}`} 
                    alt={item.name} 
                    className="w-32 h-32 object-cover border-2 border-black" 
                  />
                  <div className="flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-bold uppercase">{item.name}</h3>
                      <p className="text-sm text-gray-600 italic">By {item.artist_name}</p>
                      <p className="text-lg font-black mt-2">₹ {item.price}</p>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 font-bold uppercase text-xs hover:underline mt-4 text-left"
                    >
                      [ Remove Item ]
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="border-2 border-dashed border-black p-20 text-center">
              <p className="font-bold text-gray-400 uppercase tracking-widest mb-4">Your cart is empty</p>
              <Link href="/products" className="bg-black text-white px-6 py-3 font-black uppercase text-sm">
                Explore Artworks
              </Link>
            </div>
          )}
        </div>

        {/* Logout at bottom */}
        <button 
          onClick={() => { localStorage.clear(); router.push("/login"); }}
          className="mt-20 bg-red-500 text-white px-8 py-3 font-black uppercase border-2 border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]"
        >
          Logout Session
        </button>
      </div>
    </div>
  );
}