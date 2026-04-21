"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

type CartModalProps = {
  isOpen: boolean;
  onClose: () => void;
  product: any;
};

export default function CartModal({ isOpen, onClose, product }: CartModalProps) {
  const router = useRouter();

  if (!isOpen || !product) return null;

  // Checkout par jaane se pehle data save karne ka function
  const handleCheckout = () => {
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image_url: product.image_url || (product.image ? `https://nanopixel.vercel.app${product.image}` : "/no-image.png"),
    };

    // LocalStorage mein save karo
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
    
    // Duplicate check: Agar product pehle se nahi hai toh add karo
    const isAlreadyIn = existingCart.find((item: any) => item.id === cartItem.id);
    if (!isAlreadyIn) {
      localStorage.setItem("cart", JSON.stringify([...existingCart, cartItem]));
    }

    // Ab checkout page par bhejo
    router.push("/checkout");
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-lg rounded-sm shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-medium text-gray-800 tracking-tight">Cart</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-black text-2xl">×</button>
        </div>

        {/* Product Info Row */}
        <div className="p-6 flex gap-6 items-start">
          <div className="relative w-32 h-20 border shrink-0">
            <Image 
              src={product.image_url || "/no-image.png"} 
              alt={product.name} 
              fill 
              className="object-cover" 
            />
          </div>
          <div className="flex flex-col space-y-1">
            <h3 className="text-lg text-gray-800 font-normal">
              {product.name} Ref No: {product.id}
            </h3>
            <p className="text-lg font-medium">. ₹ {product.price}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-6 flex items-center justify-center gap-6 border-t mt-4">
          <button 
            onClick={onClose}
            className="border border-black px-10 py-2 text-sm font-normal hover:bg-gray-50 transition"
          >
            Continue Shopping
          </button>
          
          {/* Link ki jagah button with function use kar rahe hain taaki data save ho sake */}
          <button 
            onClick={handleCheckout}
            className="text-sm font-normal text-gray-800 hover:underline cursor-pointer"
          >
            Process to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}