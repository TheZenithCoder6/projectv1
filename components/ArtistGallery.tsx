"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link"; // Link import kiya

type Product = {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string | null;
  image_url: string | null;
  stock: number;
  artist_name?: string; 
  category?: string;    
};

export default function ProductGallery({ initialProducts = [] }: { initialProducts: Product[] }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const manualCategories = ["Metal", "Terracotta", "Photography", "GlassArt", "Premium","Other"];

  const filteredProducts = useMemo(() => {
    return initialProducts.filter((product) => {
      const matchesCategory = 
        selectedCategory === "All" || 
        product.category?.toLowerCase() === selectedCategory.toLowerCase();
      
      const matchesArtist = 
        product.artist_name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
        product.name.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesCategory && matchesArtist;
    });
  }, [selectedCategory, searchTerm, initialProducts]);

  const clearFilters = () => {
    setSelectedCategory("All");
    setSearchTerm("");
  };

  return (
    <div className="p-6 bg-white min-h-screen relative z-20 p-12 mt-12">
      {/* --- Filter UI Section --- */}
      <div className="mb-10 space-y-6 bg-gray-50 p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div className="space-y-3">
          <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">Select Category</p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory("All")}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === "All" ? "bg-black text-white shadow-lg" : "bg-white border text-gray-600 hover:bg-gray-100"
              }`}
            >
              All ({initialProducts.length})
            </button>
            {manualCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === cat ? "bg-blue-600 text-white shadow-lg" : "bg-white border text-gray-600 hover:bg-gray-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="relative w-full md:w-96">
            <input
              type="text"
              placeholder="Search by Artist name or Art..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-4 pr-10 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none shadow-inner"
            />
          </div>
          
          {(selectedCategory !== "All" || searchTerm !== "") && (
            <button 
              onClick={clearFilters}
              className="text-red-500 font-bold hover:text-red-700 transition-colors flex items-center gap-1"
            >
              <span className="text-lg">×</span> Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* --- Product Grid --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => {
            const imageSrc = product.image_url ?? (product.image ? `https://nanopixel.vercel.app${product.image}` : "/no-image.png");

            return (
              /* Har card ko Link mein wrap kiya */
              <Link key={product.id} href={`/products/${product.id}`}>
                <div className="border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 bg-white flex flex-col group h-full cursor-pointer">
                  <div className="relative w-full h-48 mb-4 overflow-hidden rounded-lg">
                    <Image 
                      src={imageSrc} 
                      alt={product.name} 
                      fill 
                      className="object-cover group-hover:scale-110 transition-transform duration-500" 
                    />
                  </div>

                  <div className="flex flex-col flex-grow">
                    <h2 className="text-lg font-bold text-gray-800 line-clamp-1">{product.name}</h2>
                    <p className="text-xs text-blue-500 font-bold mb-2 uppercase tracking-tight">
                      {product.artist_name || "Artist"} • {product.category || "General"}
                    </p>
                    <p className="text-sm text-gray-500 line-clamp-2 h-10 mb-4">{product.description}</p>
                    
                    <div className="mt-auto pt-4 border-t flex justify-between items-center">
                      <span className="text-xl font-bold text-gray-900">₹{product.price}</span>
                      <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${
                        product.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {product.stock > 0 ? `In Stock` : 'Out of Stock'}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })
        ) : (
          <div className="col-span-full text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
            <p className="text-gray-400 text-lg italic">No products found for this category or search.</p>
          </div>
        )}
      </div>
    </div>
  );
}