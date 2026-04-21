"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getProducts } from "@/src/lib/api";

export default function CategoryListingPage() {
  const params = useParams();
  const categoryName = params?.name; // URL se [name] uthayega (e.g., 'metal')
  
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryData = async () => {
      setLoading(true);
      try {
        const allProducts = await getProducts();
        
        // Filter logic: Check if product category matches URL param
        const filtered = allProducts?.filter(
          (p: any) => p.category?.toLowerCase() === String(categoryName).toLowerCase()
        );
        
        setProducts(filtered || []);
      } catch (error) {
        console.error("Error fetching category products:", error);
      } finally {
        setLoading(false);
      }
    };

    if (categoryName) {
      fetchCategoryData();
    }
  }, [categoryName]);

  if (loading) return <div className="p-20 text-center text-xl font-light tracking-widest uppercase italic ">Loading {categoryName} Artworks...</div>;

  if (products.length === 0) return (
    <div className="p-20 text-center relative z-20 w-full min-h-screen bg-white">
      <h1 className="text-2xl font-bold text-red-500 uppercase  ">No {categoryName} Artworks Found!</h1>
      <Link href="/products" className="text-blue-500 underline mt-4 inline-block">Explore All Artworks</Link>
    </div>
  );

  return (
    <div className="w-full mx-auto p-6 md:p-12 bg-white min-h-screen mt-10 relative z-30">
      {/* Page Header */}
      <div className="mb-12 border-b pb-8">
        <Link href="/products" className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-black transition">
          ← Back to Shop
        </Link>
        <h1 className="text-5xl font-light text-gray-900 capitalize mt-4">
          {categoryName} <span className="text-gray-400 text-2xl font-thin italic">Collection</span>
        </h1>
        <p className="text-gray-400 mt-2 text-sm">{products.length} Items found in this category</p>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
        {products.map((item: any) => {
          // Image Fallback Logic
          const imageSrc = item.image_url ?? (item.image ? `https://nanopixel.vercel.app${item.image}` : "/no-image.png");
          
          return (
            <Link key={item.id} href={`/products/${item.id}`} className="group block">
              {/* Image Container */}
              <div className="relative aspect-[3/4] overflow-hidden bg-gray-50 border border-gray-100 shadow-sm">
                <img 
                  src={imageSrc} 
                  alt={item.name}
                  className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
              </div>

              {/* Info Container */}
              <div className="mt-6 space-y-1">
                <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold">
                  Ref No: {item.id}
                </p>
                <h3 className="text-xl font-light text-gray-800 group-hover:text-blue-600 transition-colors uppercase tracking-tight">
                  {item.name}
                </h3>
                <p className="text-sm text-gray-500 italic">— {item.artist_name || "Unknown Artist"}</p>
                
                <div className="pt-2 flex items-center justify-between border-t border-gray-100 mt-4">
                  <span className="text-lg font-semibold text-gray-900">₹ {item.price}</span>
                  <span className="text-xs font-bold uppercase text-blue-500 group-hover:underline">View Detail →</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}