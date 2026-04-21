"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";

// 1. Mock Data - AI pattern se bachne ke liye thoda irregular rakha hai
export const ARTIST_COLLECTION = 
[
  { 
    id: "01", name: "Abanindranath Tagore", genre: "Oriental Art", dob: "(1871-1951)", 
    image: "https://www.aakritiartgallery.com/uploads/2023/04/08/thumb/7b50ade12fc96cd4cdf31131326747da-270x270.jpg",
    about: "Abanindranath Tagore was the principal artist and creator of the Indian Society of Oriental Art. He was also the first major exponent of Swadeshi values in Indian art. He founded the influential Bengal school of art, which led to the development of modern Indian painting. He was also a noted writer, particularly for children. Popularly known as 'Aban Thakur', his books Rajkahini, Buro Angla, Nalak, and Khirer Putul were landmarks in Bengali language children's literature and art."
  },
  { 
    id: "02", name: "HARSHIT", genre: "Sufi/Pop", dob: "12 March 1983", 
    image: "https://picsum.photos/id/12/800/1000",
    about: "HARSHIT  playback singer, songwriter, and actor. He has recorded numerous chart-topping songs and is known for his vocal belting technique."
  },
  { 
    id: "03", name: "hello", genre: "Indie", dob: "11 March 1995", 
    image: "https://picsum.photos/id/13/800/1000",
    about: "Anuv Jain is an Indian singer-songwriter and composer known for his acoustic and soulful music, particularly the hit single 'Baarishein'."
  },
  { 
    id: "04", name: "Badshah", genre: "Hip-Hop", dob: "19 November 1985", 
    image: "https://picsum.photos/id/14/800/1000",
    about: "Aditya Prateek Singh Sisodia, known by his stage name Badshah, is an Indian rapper and singer known for his Hindi, Punjabi, and Haryanvi songs."
  },
  { 
    id: "05", name: "Benny Dayal", genre: "Funk", dob: "13 May 1984", 
    image: "https://picsum.photos/id/15/800/1000",
    about: "Benny Dayal is an Indian playback singer. He is a prominent singer in Hindi, Malayalam, Telugu, and Tamil cinema, known for high-energy dance tracks."
  },
  { 
    id: "06", name: "B Praak", genre: "Soulful", dob: "7 February 1986", 
    image: "https://picsum.photos/id/16/800/1000",
    about: "Pratik Bachan, known as B Praak, is an Indian singer and music director associated with Punjabi and Hindi music, famous for 'Mann Bharrya'."
  },
  { 
    id: "07", name: "Clinton Cerejo", genre: "Fusion", dob: "1977", 
    image: "https://picsum.photos/id/17/800/1000",
    about: "Clinton Cerejo is an Indian composer and singer. His work spans over various genres and he is highly respected for his fusion music in Coke Studio."
  },
  { 
    id: "08", name: "Diljit Dosanjh", genre: "Punjabi", dob: "6 January 1984", 
    image: "https://picsum.photos/id/18/800/1000",
    about: "Diljit Dosanjh is a global icon, singer, and actor. He has a massive following for his Punjabi music and successful Bollywood career."
  },
  { 
    id: "09", name: "Divine", genre: "Gully Rap", dob: "2 October 1990", 
    image: "https://picsum.photos/id/19/800/1000",
    about: "Vivian Fernandes, known as Divine, is an Indian rapper from Mumbai. He is credited with the rise of the 'Gully Rap' movement in India."
  },
  { 
    id: "10", name: "Emiway Bantai", genre: "Hip-Hop", dob: "13 November 1995", 
    image: "https://picsum.photos/id/20/800/1000",
    about: "Emiway Bantai is an independent Indian rapper and singer. He is one of the most successful independent artists in the Indian hip-hop scene."
  },
  { 
    id: "11", name: "Farhan Akhtar", genre: "Rock", dob: "9 January 1974", 
    image: "https://picsum.photos/id/21/800/1000",
    about: "Farhan Akhtar is a multi-talented actor, director, and singer. He is known for his gravelly voice and leading the rock band 'Farhan Live'."
  },
  { 
    id: "12", name: "Gajendra Verma", genre: "Pop", dob: "20 April 1990", 
    image: "https://picsum.photos/id/22/800/1000",
    about: "Gajendra Verma is an Indian singer and composer who gained fame with the viral song 'Emptiness' and continues to produce hits in the pop genre."
  },
  { 
    id: "13", name: "Hariharan", genre: "Ghazal", dob: "3 April 1955", 
    image: "https://picsum.photos/id/23/800/1000",
    about: "Hariharan is a legendary Indian playback, bhajan and ghazal singer. He is a Padma Shri awardee and a two-time National Award winner."
  },
  { 
    id: "14", name: "Ishaan Khatter", genre: "Performer", dob: "1 November 1995", 
    image: "https://picsum.photos/id/24/800/1000",
    about: "Ishaan Khatter is an actor and brilliant dancer. He is known for his energetic performances and work in critically acclaimed films."
  },
  { 
    id: "15", name: "Jubin Nautiyal", genre: "Romantic", dob: "14 June 1989", 
    image: "https://picsum.photos/id/25/800/1000",
    about: "Jubin Nautiyal is an Indian playback singer known for his command over romantic songs. He has won several 'Male Vocalist of the Year' awards."
  },
  { 
    id: "16", name: "Kailash Kher", genre: "Sufi", dob: "7 July 1973", 
    image: "https://picsum.photos/id/26/800/1000",
    about: "Kailash Kher is an Indian playback singer and music composer with a unique voice style influenced by Indian folk and Sufi music."
  },
  { 
    id: "17", name: "Lucky Ali", genre: "Indie-Pop", dob: "19 September 1958", 
    image: "https://picsum.photos/id/27/800/1000",
    about: "Lucky Ali is a singer-songwriter known for his distinct voice and soulful melodies that defined the 90s indie-pop era in India."
  },
  { 
    id: "18", name: "Mohit Chauhan", genre: "Alternative", dob: "11 March 1966", 
    image: "https://picsum.photos/id/28/800/1000",
    about: "Mohit Chauhan is an Indian playback singer, most known for his work in 'Rockstar' and his early days with the band Silk Route."
  },
  { 
    id: "19", name: "Neeti Mohan", genre: "Jazz", dob: "18 November 1979", 
    image: "https://picsum.photos/id/29/800/1000",
    about: "Neeti Mohan is a versatile playback singer who made her debut with 'Student of the Year' and has since sung in multiple languages."
  },
  { 
    id: "20", name: "Osho Jain", genre: "Acoustic", dob: "1994", 
    image: "https://picsum.photos/id/31/800/1000",
    about: "Osho Jain is an indie artist known for his relatable lyrics and acoustic compositions that resonate with the youth."
  },
  { 
    id: "21", name: "Papon", genre: "Assamese Folk", dob: "24 November 1975", 
    image: "https://picsum.photos/id/32/800/1000",
    about: "Angaraag Mahanta, known as Papon, is an Indian singer from Assam. He is known for his work in Bollywood and his band Papon and The East India Company."
  },
  { 
    id: "22", name: "Quratulain Balouch", genre: "Folk Rock", dob: "4 March 1988", 
    image: "https://picsum.photos/id/33/800/1000",
    about: "Quratulain Balouch is a Pakistani-American singer-songwriter. She is known for her powerful voice and folk-rock style."
  },
  { 
    id: "23", name: "Raftaar", genre: "Desi Hip-Hop", dob: "16 November 1988", 
    image: "https://picsum.photos/id/34/800/1000",
    about: "Raftaar is an Indian rapper, lyricist, and dancer. He is a prominent figure in the Indian underground hip-hop scene and mainstream music."
  },
  { 
    id: "24", name: "Sunidhi Chauhan", genre: "Versatile", dob: "14 August 1983", 
    image: "https://picsum.photos/id/35/800/1000",
    about: "Sunidhi Chauhan is one of the most celebrated Indian playback singers, known for her powerful vocals and incredible range."
  },
  { 
    id: "25", name: "Tanishk Bagchi", genre: "EDM", dob: "22 November 1980", 
    image: "https://picsum.photos/id/36/800/1000",
    about: "Tanishk Bagchi is an Indian music composer and singer known for his massive Bollywood remixes and original club hits."
  },
  { 
    id: "26", name: "Udit Narayan", genre: "Classic", dob: "1 December 1955", 
    image: "https://picsum.photos/id/37/800/1000",
    about: "Udit Narayan is a veteran Indian playback singer who has won three National Film Awards and five Filmfare Awards."
  },
  { 
    id: "27", name: "Vishal Dadlani", genre: "Electro-Rock", dob: "28 June 1973", 
    image: "https://picsum.photos/id/38/800/1000",
    about: "Vishal Dadlani is a singer and one half of the duo Vishal-Shekhar. He is also the lead vocalist of the band Pentagram."
  },
  { 
    id: "28", name: "Wajid Khan", genre: "Bollywood", dob: "1977-2020", 
    image: "https://picsum.photos/id/39/800/1000",
    about: "Wajid Khan was a music director and playback singer. He was part of the Sajid-Wajid duo, famous for numerous Salman Khan film scores."
  },
  { 
    id: "29", name: "Yo Yo Honey Singh", genre: "Urban-Pop", dob: "15 March 1983", 
    image: "https://picsum.photos/id/41/800/1000",
    about: "Hirdesh Singh, known as Yo Yo Honey Singh, is a trendsetter in the Indian music industry, popularizing rap and pop fusion."
  },
  { 
    id: "30", name: "Zakir Khan", genre: "Storytelling", dob: "20 August 1987", 
    image: "https://picsum.photos/id/42/800/1000",
    about: "Zakir Khan is a stand-up comedian and writer. He became a household name with his special 'Haq Se Single' and his 'Sakht Launda' persona."
  }
];
export default function ArtistDirectory() {
  const [filterChar, setFilterChar] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [activePage, setActivePage] = useState(1);
  const limit = 9; // Ek page par 6 artists

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  // 2. CORE FILTER LOGIC: Purane names hatane ke liye
  const filteredList = useMemo(() => {
   
      let result = ARTIST_COLLECTION;

      if(filterChar !== "ALL"){
        result = result.filter(item =>
          item.name.trim().toUpperCase().startsWith(filterChar)
        )
      }

      if (searchQuery.trim() !== "") {
    result = result.filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
    
    // Phir hamesha A-Z sort rakho
    return result.sort((a, b) => a.name.localeCompare(b.name));
  }, [filterChar , searchQuery]);

  // 3. PAGINATION MATH
  const totalPages = Math.ceil(filteredList.length / limit);
  const displayItems = filteredList.slice((activePage - 1) * limit, activePage * limit);

  // Filter badalne par page 1 par reset karo
  useEffect(() => {
    setActivePage(1);
  }, [filterChar]);

  return (
    <main className="min-h-screen bg-white text-white px-6 py-12 md:px-16 relative z-20 p-32">
      {/* SEARCH BAR */}
      
      {/* Header Section */}
      <header className="mb-16 flex w-full items-center justify-center">
        <h1 className="text-7xl font-black tracking-tighter uppercase italic leading-none text-[#E84C4C] ">
          Explore  <span className="text-[#E84C4C]">Artists</span>
        </h1>
        <p className="mt-4 ml-4 text-zinc-500 font-medium tracking-[0.3em] text-xs uppercase">
          Sorted by Identity & ART's
        </p>
      </header>

     <div className="mb-10 w-full">
  <div className="relative group">
    <input 
      type="text"
      placeholder="Search Artist Name..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="w-12 bg-zinc-900 border border-white/10 px-6 py-4 text-white focus:outline-none focus:border-[#E84C4C] transition-all font-mono  tracking-widest text-sm"
    />
    {/* Animated underline effect */}
    <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#E84C4C] group-focus-within:w-full transition-all duration-500" />
  </div>
  {searchQuery && (
    <p className="mt-2 text-[10px] text-zinc-500 uppercase tracking-tighter">
      Showing results for: <span className="text-white">{searchQuery}</span>
    </p>
  )}
</div>

      {/* A-Z ALPHABET BAR */}
      <nav className="flex flex-wrap gap-3 mb-12 pb-6 border-b border-white/5 justify-start">
        <button 
          onClick={() => setFilterChar("ALL")}
          className={`text-sm font-bold px-4 py-2 transition-all ${filterChar === "ALL" ? "bg-white text-black scale-105" : "text-zinc-500 hover:text-white"}`}
        >
          ALL
        </button>
        {alphabet.map(char => (
          <button
            key={char}
            onClick={() => setFilterChar(char)}
            className={`text-sm font-bold w-10 h-10 flex items-center justify-center transition-all ${filterChar === char ? "bg-[#E84C4C] text-white rotate-12 scale-125" : "text-zinc-600 hover:text-white hover:bg-white/10"}`}
          >
            {char}
          </button>
        ))}
      </nav>

      {/* ARTISTS GRID */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
       {displayItems.length > 0 ? (
          displayItems.map((artist) => (
          <Link 
           href={`/artist/profile/${artist.name.toLowerCase().replace(/\s+/g, "-")}`} 
           key={artist.id} 
           className="group block relative"
           >
              {/* Image with Brutalist Border */}
              <div className="relative aspect-[4/5] overflow-hidden bg-zinc-900 border border-white/10">
                <img 
                  src={artist.image} 
                  alt={artist.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                
                {/* Floating "View" Tag */}
                <div className="absolute bottom-4 right-4 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="bg-white text-black text-[10px] font-black px-3 py-1 uppercase">Profile</span>
                </div>
              </div>

              {/* Artist Info */}
              <div className="mt-6">
                <h3 className="text-2xl font-black uppercase tracking-tighter group-hover:text-[#E84C4C] transition-colors">
                  {artist.name}
                </h3>
                <div className="flex items-center gap-3 mt-1">
                  <span className="h-[1px] w-6 bg-zinc-700" />
                  <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest">{artist.genre}</p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full py-32 text-center">
            <p className="text-4xl font-black text-zinc-800 uppercase tracking-widest">No Matches Found for "{filterChar}"</p>
          </div>
        )}
      </section>

      {/* PAGINATION CONTROLS */}
      {totalPages > 1 && (
        <footer className="mt-24 flex flex-col items-center gap-6">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setActivePage(p => Math.max(1, p - 1))}
              disabled={activePage === 1}
              className="group relative p-4 border border-white/20 disabled:opacity-10"
            >
              <div className="absolute inset-0 bg-white translate-x-1 translate-y-1 -z-10 opacity-0 group-hover:opacity-100 transition-all" />
              <span className="font-black text-xs uppercase">Prev</span>
            </button>

            <div className="px-8 font-mono text-lg tracking-widest">
              {activePage.toString().padStart(2, '0')} <span className="text-zinc-600">/</span> {totalPages.toString().padStart(2, '0')}
            </div>

            <button 
              onClick={() => setActivePage(p => Math.min(totalPages, p + 1))}
              disabled={activePage === totalPages}
              className="group relative p-4 border border-white/20 disabled:opacity-10"
            >
              <div className="absolute inset-0 bg-white translate-x-1 translate-y-1 -z-10 opacity-0 group-hover:opacity-100 transition-all" />
              <span className="font-black text-xs uppercase">Next</span>
            </button>
          </div>
        </footer>
      )}

    </main>
  );
}