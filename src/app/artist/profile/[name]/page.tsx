"use client";

import { ARTIST_COLLECTION } from "../../page"; 
import Link from "next/link";
import { useParams } from "next/navigation";

export default function ArtistProfile() {
  const params = useParams();
  
  // Use React.use() or just ensure params exists
  if (!params || !params.name) return null;

  const nameSlug = params.name as string; 

  const artist = ARTIST_COLLECTION.find((a) => {
    // Exact same logic as your link generation
    const s = a.name.toLowerCase().trim().replace(/\s+/g, "-");
    return s === nameSlug.toLowerCase().trim();
  });

  // Agar artist nahi mila
  if (!artist) {
    return (
      <div className="min-h-screen bg-white text-black flex flex-col items-center justify-center  text-cente r">
        <h1 className="text-4xl font-black uppercase italic text-black">Artist Not Found</h1>
        <p className="text-zinc-500 mt-4 uppercase tracking-widest">
          No artist matches: "{nameSlug}"
        </p>
        <Link href="/artist" className="mt-8 border-b border-white pb-1 italic hover:text-[#E84C4C] transition-all">
          Go Back to Roster
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black p-6 md:p-20 relative z-20 ">
      <Link href="/artist" className="inline-block mb-10 text-sm font-bold uppercase tracking-widest border-b border-white pb-1 hover:text-[#E84C4C] mt-12 transition-all">
        ← Back to Roster
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
        <div className="relative group">
          <div className="absolute inset-0 bg-[#E84C4C] translate-x-4 translate-y-4 -z-10" />
          <div className="border-4 border-white overflow-hidden bg-zinc-900">
            <img 
              src={artist.image} 
              alt={artist.name} 
              className="w-full h-[72vh] object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <h1 className="text-6xl md:text-7xl font-black uppercase tracking-tighter leading-none italic">
              {artist.name}
            </h1>
            <p className="text-[#E84C4C] text-xl font-bold mt-2 uppercase tracking-widest">
              {artist.genre}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 border-y border-white/10 py-10">
            <div>
              <span className="text-zinc-500 text-xs font-black uppercase tracking-[0.3em]">Date of Birth</span>
              <p className="text-2xl font-bold mt-1">{artist.dob}</p>
            </div>
            
            <div>
              <span className="text-black text-xs font-black uppercase tracking-[0.3em]">Biography</span>
              <p className="text-lg text-black leading-relaxed mt-4 font-medium">
                {artist.about}
              </p>
            </div>
          </div>

          <div className="flex gap-4">
          <Link href={`/artist/profile/${params.name}/work`}>
           <button className="bg-white text-black px-8 py-4 font-black uppercase hover:bg-[#E84C4C] hover:text-white transition-all">
           VIEW WORK
          </button>
          </Link>
            <button className="border-2 border-white px-8 py-4 font-black uppercase hover:bg-[#E84C4C] hover:text-black transition-all">
              Follow
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}