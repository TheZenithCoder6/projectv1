"use client";
import { useState, useEffect } from "react";
import SideMagnifier from "@/components/SideMagnifier";
import Lightbox from "@/components/Lightbox";
import Link from "next/link";
import { useParams } from "next/navigation"; // URL se ID lene ke liye
import { getProducts } from "@/src/lib/api";
import CartModal from "@/components/CartModal";

export default function ProductDetailPage() {
  const params = useParams(); // Yeh URL se :id nikaal lega
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const fetchProductData = async () => {
      setLoading(true);
      const allProducts = await getProducts();
      
      // URL ki ID ko data ki ID se match karo
      const foundProduct = allProducts?.find(
        (p: any) => String(p.id) === String(params.id)
      );
      
      setProduct(foundProduct);
      setLoading(false);
    };

    if (params.id) {
      fetchProductData();
    }
  }, [params.id]);

  if (loading) return <div className="p-20 text-center w-full min-h-screen">Loading Artwork...</div>;
  if (!product) return <div className="p-20 text-center text-red-500 font-bold">Artwork Not Found!</div>;

  // Image URL handle karein
  const imageSrc = product.image_url ?? (product.image ? `https://nanopixel.vercel.app${product.image}` : "/no-image.png");


  const handleAddToCart = () => {
  // 1. Pehle se saved items nikalo
  const existingCart = JSON.parse(localStorage.getItem("userCart") || "[]");
  
  // 2. Check karo item pehle se toh nahi hai
  const isItemInCart = existingCart.find((item: any) => item.id === product.id);
  
  if (!isItemInCart) {
    const updatedCart = [...existingCart, product];
    localStorage.setItem("userCart", JSON.stringify(updatedCart));
    alert("Artwork added to your collection! 🛒");
  }
  
  setIsCartOpen(true);
};

  return (
    <div className=" mx-auto p-4 md:p-12 bg-white min-h-screen relative z-20 mt-6">
        <div className="max-w-7xl mx-auto p-4 md:p-12 bg-white min-h-screen relative z-20 ">
      {/* Back Button */}
      <Link href="/products" className="text-blue-500 text-xs mb-8 inline-block uppercase font-bold tracking-widest hover:underline">
        ← Back
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* Left: Dynamic Image with Magnifier */}
        <div className="relative z-50">
           <SideMagnifier 
            src={imageSrc} 
            alt={product.name} 
            onImageClick={() => setIsLightboxOpen(true)} 
          />
        </div>

        {/* Right: Dynamic Info */}
        <div className="flex flex-col space-y-4">
          <h1 className="text-4xl font-light text-gray-800">
            {product.artist_name || "Unknown Artist"}
          </h1>
          <p className="text-gray-500 text-sm italic">Ref No : {product.id}</p>
          
          <div className="pt-4">
            <h2 className="text-xl text-gray-700 font-normal">{product.name}</h2>
            <p className="mt-2">
               <span className="text-blue-500 underline cursor-pointer">{product.category || "Acrylic"}</span> on <span className="text-blue-500 underline cursor-pointer">Canvas</span>
            </p>
          </div>

          <div className="text-gray-600 text-[15px] space-y-1">
  {/* Inch Size */}
           <p>{product.size_inch || "48.00 X 72.00 Inch"}</p>
  
  {/* CM Size */}
             <p>{product.size_cm || "121.92 X 182.88 Cm"}</p>
  
  {/* Medium/Location */}
                 <p>{product.medium || "Gallery"}</p>
  
  {/* Style/Category */}
                    <p className="pt-2">{product.style || "Figurative"}</p>
                  </div>

          <div className="pt-6">
            <p className="text-3xl font-medium">₹ {product.price}</p>
            {/* Dollar calculation based on live price */}
            <p className="text-xl text-gray-600">
               $ {(Number(product.price.toString().replace(/,/g, '')) / 83).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
            </p>
          </div>

          {/* Buttons Group */}
          <div className="flex items-center gap-3 pt-8">
   <button 
  onClick={handleAddToCart}
  className="border border-black px-6 py-3 text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-gray-50 transition"
>
  <span className="text-lg">🛒</span> Add to Cart
</button>

{/* Modal Component ko niche render karo */}
<CartModal
  isOpen={isCartOpen} 
  onClose={() => setIsCartOpen(false)} 
  product={product} 
/>
            <button className="border border-black px-6 py-3 text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-gray-50 transition-colors">
              <span className="text-lg">♡</span> Add to Wishlist
            </button>
            <a 
              href={`https://wa.me/91XXXXXXXXXX?text=I am interested in ${product.name} (Ref: ${product.id})`}
              target="_blank"
              className="border border-green-500 p-2 rounded cursor-pointer hover:bg-green-50"
            >
              <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" className="w-6 h-6" alt="WA" />
            </a>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div className="mt-24 border-t pt-10">
        <h3 className="text-2xl font-light border-b-2 border-black inline-block pb-1 mb-8">Description</h3>
        <p className="text-sm text-gray-700 leading-relaxed italic">
          {product.description || `This beautiful piece by ${product.artist_name} is a testament to figurative art.`}
        </p>
      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <Lightbox src={imageSrc} onClose={() => setIsLightboxOpen(false)} />
      )}
    </div>
    </div>
  );
}