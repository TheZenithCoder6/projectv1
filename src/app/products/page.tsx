import { getProducts } from "@/src/lib/api";
import ArtistGallery from "@/components/ArtistGallery";
import Link from "next/link";

export default async function Page() {
  // Aapki fetchAPI use karke saare products mangwaye
  const products = await getProducts();

  return (
    <main>
      {/* Data client component ko pass kar diya */}
      <ArtistGallery initialProducts={products || []} />
    </main>
  );
}


