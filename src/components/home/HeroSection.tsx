import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-12">
        <div className="lg:w-1/2 space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Empowering Agriculture with Intelligent Connectivity
          </h1>
          <p className="text-lg md:text-xl opacity-90">
            FarmConnect brings farmers, retailers, and transporters together on a single platform for transparent transactions, real-time stock visibility, and optimized logistics.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              href="/marketplace" 
              className="bg-white text-primary-700 hover:bg-gray-100 px-6 py-3 rounded-full font-medium text-lg inline-flex items-center justify-center"
            >
              Explore Marketplace
            </Link>
            <Link 
              href="/register" 
              className="bg-transparent border-2 border-white hover:bg-white/10 px-6 py-3 rounded-full font-medium text-lg inline-flex items-center justify-center"
            >
              Join FarmConnect
            </Link>
          </div>
        </div>
        <div className="lg:w-1/2 relative">
          <div className="relative h-[400px] w-full">
            <Image 
              src="/images/hero-image.jpg" 
              alt="Farmers and retailers connecting through FarmConnect" 
              fill
              className="object-cover rounded-lg shadow-xl"
              priority
            />
          </div>
        </div>
      </div>
      
      {/* Stats Section */}
      <div className="container mx-auto px-4 mt-16">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <p className="text-3xl font-bold">1000+</p>
            <p className="text-sm opacity-80">Farmers</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold">500+</p>
            <p className="text-sm opacity-80">Retailers</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold">200+</p>
            <p className="text-sm opacity-80">Transporters</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold">50+</p>
            <p className="text-sm opacity-80">Regions</p>
          </div>
        </div>
      </div>
    </section>
  );
} 