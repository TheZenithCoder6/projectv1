"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState<any[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Item Delete karne ka function
  const removeItem = (id: string) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const subtotal = cartItems.reduce((acc, item) => 
    acc + parseFloat(String(item.price).replace(/,/g, "")), 0
  );

  if (cartItems.length === 0) {
    return (
      <div className="p-20 text-center mt-20 relative z-20  bg-white min-h-screen">
        <h2 className="text-2xl font-light text-gray-400">Your cart is empty.</h2>
        <a href="/products" className="text-blue-500 underline mt-4 inline-block">Go back to Gallery</a>
      </div>
    );
  }

  return (
    <div className="w-full mt-16 mx-auto p-6 md:p-12 bg-white min-h-screen relative z-20">
      {/* Table Header */}
      <div className="grid grid-cols-12 border-b pb-4 text-sm font-light text-gray-500 uppercase tracking-widest px-4">
        <div className="col-span-1">#</div>
        <div className="col-span-8 text-center">Item Description</div>
        <div className="col-span-3 text-right pr-12">Price</div>
      </div>

      {/* Cart Items List */}
      <div className="mt-4 space-y-4">
        {cartItems.map((item, index) => (
          <div key={item.id} className="grid grid-cols-12 items-center bg-gray-50 p-6 rounded-sm border border-gray-100">
            <div className="col-span-1 font-light text-gray-400">{index + 1}</div>
            
            <div className="col-span-8 flex items-center gap-8 px-10">
              <div className="relative w-32 h-20 border bg-white shrink-0 overflow-hidden">
                <Image 
                  src={item.image_url || "/no-image.png"} 
                  alt={item.name} 
                  fill 
                  className="object-cover" 
                />
              </div>
              <div className="flex flex-col">
                <h3 className="text-lg text-gray-800 font-normal">{item.name}</h3>
                <p className="text-sm text-gray-500 font-light italic">Ref No : {item.id}</p>
              </div>
            </div>

            {/* Price + Delete Button */}
            <div className="col-span-3 flex items-center justify-end gap-6">
              <span className="text-lg font-normal text-gray-700 whitespace-nowrap">₹ {item.price}</span>
              <button 
                onClick={() => removeItem(item.id)}
                className="bg-[#1c1c1c] text-white p-3 rounded-full hover:bg-red-600 transition-all shadow-md active:scale-90"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Cart Totals Section */}
      <div className="mt-16 flex flex-col md:flex-row justify-end">
        <div className="w-full md:w-96 space-y-6">
          <h2 className="text-2xl font-normal text-gray-800 mb-4">Cart Totals</h2>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center text-lg border-b pb-2">
              <span className="font-light text-gray-600">Subtotal</span>
              <span className="font-normal text-gray-800">₹ {subtotal.toLocaleString('en-IN', {minimumFractionDigits: 2})}</span>
            </div>
            <div className="flex justify-between items-center text-xl font-medium border-b-2 border-gray-100 pb-2">
              <span>Total</span>
              <span>₹ {subtotal.toLocaleString('en-IN', {minimumFractionDigits: 2})}</span>
            </div>
          </div>

          <p className="text-sm text-gray-500 italic leading-relaxed">
            Note: Shipping will be calculated manually and you will contacted by our team with further details.
          </p>

          <button className="w-full bg-[#1c1c1c] text-white py-4 rounded-full text-sm font-bold uppercase tracking-widest hover:shadow-2xl transition-all active:scale-95">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}