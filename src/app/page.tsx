import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col md:flex-row flex-wrap items-center justify-center min-h-screen bg-gray-100 gap-4">
      <Image src="/logo.png" alt="logo" width={300} height={300} className="lg:w-1/4" />
      <h1 className="w-1/2 text-3xl md:text-5xl lg:text-6xl xl:text-8xl font-bold leading-normal text-center md:text-left">Bienvenido a Rotten&apos;tomatoes</h1>
      
    </div>
  );
}
