import Image from "next/image";
import { client } from "@/sanity/client";
import { HomepageImages } from "@/types/homepageImages"
import { urlFor } from "@/utils/urlFor";

const POSTS_QUERY = `*[
  _type == "homepageImages"
][0]`;
const options = { next: { revalidate: 30 } };

export default async function Home() {
  const {desktopImages , mobileImages} = await client.fetch<HomepageImages>(POSTS_QUERY, {}, options);
  const mobileImage = mobileImages[Math.floor(Math.random() * mobileImages.length)]
  const desktopImage = desktopImages[Math.floor(Math.random() * desktopImages.length)]

  const mobileImgUrl = urlFor(mobileImage)?.url() ?? '/images/main.png'
  const desktopImgUrl = urlFor(desktopImage)?.url() ?? '/images/desktopMain.png'

  return (
    <>
    <div className="relative w-full h-[80vh] lg:hidden overflow-hidden">
      <Image fetchPriority="high" alt='Une charmante vue parisienne' src={mobileImgUrl} fill 
        style={{objectFit:'cover', objectPosition:'center'}}/>
    </div>
    <div className="relative w-full h-[94vh] hidden lg:block overflow-hidden">
      <Image fetchPriority="high" alt='Une charmante vue parisienne' src={desktopImgUrl} width={3000} height={3000}
        style={{objectFit:'contain', width:'100%', height:'auto',}}/>
    </div>
    </>
  );
}

