import Image from "next/image";
import { getProducts } from "@/src/lib/api";

export default async function ArtistWorkPage({ 
  params 
}: { 
  params: Promise<{ name: string }> // Type ko Promise banaya
}) {
  // 1. Params ko await karein (Next.js 15+ requirement)
  const resolvedParams = await params;
  const name = resolvedParams.name;

  if (!name) return <div>Artist name not found</div>;

  const allProducts = await getProducts();

  // 2. Filter logic with safety checks
  const artistWorks = allProducts.filter((product: any) => {
    const artistSlug = name.toLowerCase();
    
    // Safety check: Agar product ya name missing ho
    if (!product || !product.name) return false;

    // Alag-alag fields mein check karein (jo bhi aapke data mein available ho)
    const matchesArtistName = product.artist_name?.toLowerCase().includes(artistSlug);
    const matchesInTitle = product.name?.toLowerCase().includes(artistSlug);
    const matchesDescription = product.description?.toLowerCase().includes(artistSlug);

    return matchesArtistName || matchesInTitle || matchesDescription;
  });

  return (
  <div className="relative z-20 bg-white mt-24">
      <div className="p-8 max-w-7xl mx-auto bg-white min-h-screen">
      <div className="mb-10 border-b pb-6">
         <h1 className="text-4xl font-black uppercase italic">{name}'s Work</h1>
         <p className="text-gray-500">Showing {artistWorks.length} results</p>
      </div>
A
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {artistWorks.length > 0 ? (
          artistWorks.map((product: any) => (
            <div key={product.id} className="border p-4 rounded-xl shadow-sm hover:shadow-lg transition-all bg-white group">
              <div className="relative w-full h-52 mb-4 overflow-hidden rounded-lg">
               <img 
  src={product.image_url || `${product.image}`} 
  alt="test" 
  style={{ width: '100%', height: '200px', objectFit: 'cover' }} 
/>

              </div>
              <h3 className="font-bold text-gray-800">{product.name}</h3>
              <p className="text-[#E84C4C] font-black mt-1">₹{product.price}</p>
            </div>
          ))
        ) : (
            
          <div className="col-span-full py-20 text-center bg-gray-50 rounded-2xl">
            <p className="text-gray-400 text-lg italic">
              Humein "{name}" ke liye koi arts nahi mile. 
              <br />
              <span className="text-sm">Tip: Check karein ki product ke title mein "{name}" likha hai ya nahi.</span>
            </p>
          </div>
        )}
      </div>
    </div>
  </div>
  );
}