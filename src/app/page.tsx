import Image from "next/image";

export default async function Home() {
  return (
    <>
    <div className="relative w-full h-[80vh] lg:hidden">
      <Image fetchPriority="high" alt='Une charmante vue parisienne' src={'/images/main.png'} fill/>
    </div>
    <div className="relative w-full h-full hidden lg:block">
      <Image fetchPriority="high" alt='Une charmante vue parisienne' src={'/images/desktopMain.png'} fill />
    </div>
    </>
  );
}

